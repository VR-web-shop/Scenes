import pkg from 'amqplib';
import Product from '../..//src/models/Product.js';
import ProductEntity from '../../src/models/ProductEntity.js';
import SceneProduct from '../models/SceneProduct.js';
import Scene from '../models/Scene.js';

const url = process.env.MESSAGE_BROKER_URL;
const queues = [];
let conn = null;
let ch = null;

const addListener = (queueName, callback) => {
    if (queues.includes(queueName)) {
        throw new Error(`Queue ${queueName} is already being listened to.`);
    }

    queues.push(queueName);
    ch.assertQueue(queueName, { durable: false });
    ch.consume(queueName, (msg) => {
        const text = msg.content.toString();
        const json = JSON.parse(text);
        callback(json);
    }, { noAck: true });
};

export const removeListener = (queueName) => {
    ch.cancel(queueName);
};

export const sendMessage = (queueName, msg) => {
    ch.assertQueue(queueName, { durable: false });
    ch.sendToQueue(queueName, Buffer.from(msg));
};

export const connect = async () => {
    conn = await pkg.connect(url);
    ch = await conn.createChannel();

    /**
     * When a new product is created, the scenes's application
     * receives a message to create a new product entity.
     */
    addListener('scenes_new_product', async (msg) => {
        const product = await Product.create(msg);
        const scenes = await Scene.findAll();
        for (const scene of scenes) {
            await SceneProduct.create({ product_uuid: product.uuid, scene_uuid: scene.uuid });
        }
    })

    /**
     * When a new product entity is created, the scenes's application 
     * receives a message to create a new product entity.
     */
    addListener('scenes_new_product_entity', async (msg) => {
        await ProductEntity.create(msg);
    })

    /**
     * When a customer reserves, releases, or do anything else to a product entity,
     * the scenes's application receives a message to update the product entity's state.
     */
    addListener('scenes_update_product_entity', async (msg) => {
        const uuid = msg.uuid;
        const entity = await ProductEntity.findOne({ where: { uuid } });
        await entity.update({
            product_entity_state_name: msg.product_entity_state_name
        });
    })
}

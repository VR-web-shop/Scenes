import pkg from 'amqplib';
import Service from '../services/Service.js';

const { ProductService, ProductEntityService } = Service;

(async () => {
    const url = process.env.MESSAGE_BROKER_URL;
    const conn = await pkg.connect(url);
    const ch = await conn.createChannel();
    const queues = [];

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

    const removeListener = (queueName) => {
        ch.cancel(queueName);
    };

    const sendMessage = (queueName, msg) => {
        ch.assertQueue(queueName, { durable: false });
        ch.sendToQueue(queueName, Buffer.from(msg));
    };

    addListener('new_product', ProductService.create.bind(ProductService))
    addListener('discard_product', ProductService.destroy.bind(ProductService))
    addListener('new_product_entity', ProductEntityService.create.bind(ProductEntityService))
    addListener('update_product_entity', ProductEntityService.update.bind(ProductEntityService))
    addListener('discard_product_entity', ProductEntityService.destroy.bind(ProductEntityService))
})()

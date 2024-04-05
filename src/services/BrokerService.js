import Product from '../..//src/models/Product.js';
import ProductEntity from '../../src/models/ProductEntity.js';
import SceneProduct from '../models/SceneProduct.js';
import Scene from '../models/Scene.js';
import WebsocketService from '../services/WebsocketService.js';

const TYPES = {
    SCENES_NEW_PRODUCT: 'scenes_new_product',
    SCENES_UPDATE_PRODUCT: 'scenes_update_product',
    SCENES_DELETE_PRODUCT: 'scenes_delete_product',
    SCENES_NEW_PRODUCT_ENTITY: 'scenes_new_product_entity',
    SCENES_UPDATE_PRODUCT_ENTITY: 'scenes_update_product_entity',
    SCENES_DELETE_PRODUCT_ENTITY: 'scenes_delete_product_entity',
}

const config = [
    { type: TYPES.SCENES_NEW_PRODUCT, callback: onNewProduct },
    { type: TYPES.SCENES_UPDATE_PRODUCT, callback: onUpdateProduct },
    { type: TYPES.SCENES_DELETE_PRODUCT, callback: onDeleteProduct },
    { type: TYPES.SCENES_NEW_PRODUCT_ENTITY, callback: onNewProductEntity },
    { type: TYPES.SCENES_UPDATE_PRODUCT_ENTITY, callback: onUpdateProductEntity },
    { type: TYPES.SCENES_DELETE_PRODUCT_ENTITY, callback: onDeleteProductEntity },
]

/**
 * @function onNewProduct
 * @description When a new product is created, the scenes's application
 * receives a message to create a new product entity.
 * @param {Object} msg The message to create a new product.
 * @returns {Promise<void>}
 */
async function onNewProduct(msg) {
    const product = await Product.create(msg);
    const scenes = await Scene.findAll();
    for (const scene of scenes) {
        await SceneProduct.create({ product_uuid: product.uuid, scene_uuid: scene.uuid });
    }

    const scene = await Scene.findOne({ where: { active: true } });
    const sceneProduct = await SceneProduct.findOne({ where: { product_uuid: product.uuid, scene_uuid: scene.uuid } });
    sceneProduct.Product = product.dataValues;
    WebsocketService.newSceneProduct(sceneProduct.dataValues);
}

/**
 * @function onUpdateProduct
 * @description When a product is updated, the scenes's application
 * receives a message to update the product entity.
 * @param {Object} msg The message to update a product.
 * @returns {Promise<void>}
 */
async function onUpdateProduct(msg) {
    const uuid = msg.uuid;
    const product = await Product.findOne({ where: { uuid } });
    await product.update(msg);

    /**
     * A product update may be related to the product's price, name or image.
     * So we need to update the product in the scene's application.
     */
    const scene = await Scene.findOne({ where: { active: true } });
    const sceneProduct = await SceneProduct.findOne({ where: { product_uuid: product.uuid, scene_uuid: scene.uuid } });
    WebsocketService.updateSceneProduct(sceneProduct.dataValues);
}

/**
 * @function onDeleteProduct
 * @description When a product is deleted, the scenes's application
 * receives a message to delete the product entity.
 * @param {Object} msg The message to delete a product.
 * @returns {Promise<void>}
 */
async function onDeleteProduct(msg) {
    const uuid = msg.uuid;
    const product = await Product.findOne({ where: { uuid } });
    await product.destroy();
    await ProductEntity.destroy({ where: { product_uuid: product.uuid } });
    
    /**
     * If a product is deleted, we need to delete the product 
     * from the scene's application.
     */
    const scene = await Scene.findOne({ where: { active: true } });
    const sceneProduct = await SceneProduct.findOne({ where: { 
        product_uuid: product.uuid, 
        scene_uuid: scene.uuid
    }});
    await sceneProduct.destroy();
    sceneProduct.Product = product.dataValues;
    WebsocketService.deleteSceneProduct(sceneProduct.dataValues);
}

/**
 * @function onNewProductEntity
 * @description When a new product entity is created, the scenes's application 
 * receives a message to create a new product entity.
 * @param {Object} msg The message to create a new product entity.
 * @returns {Promise<void>}
 */
async function onNewProductEntity(msg) {
    await ProductEntity.create(msg);

    WebsocketService.newProductEntity(msg);
}

/**
 * @function onUpdateProductEntity
 * @description When a customer reserves, releases, or do anything else to a product entity,
 * the scenes's application receives a message to update the product entity's state.
 * @param {Object} msg The message to update a product entity.
 * @returns {Promise<void>}
 */
async function onUpdateProductEntity(msg) {
    const uuid = msg.uuid;
    const entity = await ProductEntity.findOne({ where: { uuid } });
    await entity.update({
        product_entity_state_name: msg.product_entity_state_name
    });

    WebsocketService.updateProductEntity(entity);
}

/**
 * @function onDeleteProductEntity
 * @description When a product entity is deleted, the scenes's application receives a message
 * to delete the product entity.
 * @param {Object} msg The message to delete a product entity.
 * @returns {Promise<void>}
 */
async function onDeleteProductEntity(msg) {
    const uuid = msg.uuid;
    const entity = await ProductEntity.findOne({ where: { uuid } });
    // The entity use the tombstone pattern to delete the entity
    // so we just update it first to ensure the state is sync.
    await entity.update({
        product_entity_state_name: msg.product_entity_state_name
    });

    await entity.destroy();

    WebsocketService.deleteProductEntity(entity);
}

export default {
    config
}

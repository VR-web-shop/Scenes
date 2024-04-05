import Product from "../models/Product.js";
import ProductEntity from "../models/ProductEntity.js";
import Vector3D from "../models/Vector3D.js";
import Mesh from "../models/Mesh.js";
import { sendToClient } from "../config/WebsocketConfig.js";

const TYPES = {
    SCENES_NEW_SCENE_PRODUCT: 'scenes_new_scene_product',
    SCENES_UPDATE_SCENE_PRODUCT: 'scenes_update_scene_product',
    SCENES_DELETE_SCENE_PRODUCT: 'scenes_delete_scene_product',
    SCENES_NEW_PRODUCT_ENTITY: 'scenes_new_product_entity',
    SCENES_UPDATE_PRODUCT_ENTITY: 'scenes_update_product_entity',
    SCENES_DELETE_PRODUCT_ENTITY: 'scenes_delete_product_entity',
}

/**
 * @function newSceneProduct
 * @description Send a message to the client to create a new scene product.
 * @param {Object} sceneProduct The scene product to be created.
 * @returns {Promise<void>}
 */
async function newSceneProduct(sceneProduct) {
    const product_uuid = sceneProduct.product_uuid;
    const product = await Product.findOne({ where: { uuid: product_uuid } });
    const mesh = await Mesh.findOne({ where: { uuid: sceneProduct.mesh_uuid } });
    const position = await Vector3D.findOne({ where: { uuid: sceneProduct.position_uuid } });
    const rotation = await Vector3D.findOne({ where: { uuid: sceneProduct.rotation_uuid } });
    const scale = await Vector3D.findOne({ where: { uuid: sceneProduct.scale_uuid } });
    const uiOffsetPosition = await Vector3D.findOne({ where: { uuid: sceneProduct.ui_offset_position_uuid } });
    const uiOffsetRotation = await Vector3D.findOne({ where: { uuid: sceneProduct.ui_offset_rotation_uuid } });
    const uiScale = await Vector3D.findOne({ where: { uuid: sceneProduct.ui_scale_uuid } });
    if (mesh) sceneProduct.Mesh = mesh.dataValues;
    sceneProduct.Product = product.dataValues;
    sceneProduct.Position = position.dataValues;
    sceneProduct.Rotation = rotation.dataValues;
    sceneProduct.Scale = scale.dataValues;
    sceneProduct.UIOffsetPosition = uiOffsetPosition.dataValues;
    sceneProduct.UIOffsetRotation = uiOffsetRotation.dataValues;
    sceneProduct.UIScale = uiScale.dataValues;
    
    sendToClient({type: TYPES.SCENES_NEW_SCENE_PRODUCT, payload: sceneProduct});
}

/**
 * @function updateSceneProduct
 * @description Send a message to the client to update a scene product.
 * @param {Object} sceneProduct The scene product to be updated.
 * @returns {Promise<void>}
 */
async function updateSceneProduct(sceneProduct) {
    const product_uuid = sceneProduct.product_uuid;
    const product = await Product.findOne({ where: { uuid: product_uuid } });
    const mesh = await Mesh.findOne({ where: { uuid: sceneProduct.mesh_uuid } });
    if (mesh) sceneProduct.Mesh = mesh.dataValues;
    sceneProduct.Product = product.dataValues;

    sendToClient({type: TYPES.SCENES_UPDATE_SCENE_PRODUCT, payload: sceneProduct});
}

/**
 * @function deleteSceneProduct
 * @description Send a message to the client to delete a scene product.
 * @param {Object} sceneProduct The scene product to be deleted.
 * @returns {Promise<void>}
 */
async function deleteSceneProduct(sceneProduct) {
    sendToClient({type: TYPES.SCENES_DELETE_SCENE_PRODUCT, payload: sceneProduct});
}

/**
 * @function newProductEntity
 * @description Send a message to the client to create a new product entity.
 * @param {Object} productEntity The product entity to be created.
 * @returns {Promise<void>}
 */
async function newProductEntity(productEntity) {
    sendToClient({type: TYPES.SCENES_NEW_PRODUCT_ENTITY, payload: productEntity});
}

/**
 * @function updateProductEntity
 * @description Send a message to the client to update a product entity.
 * @param {Object} productEntity The product entity to be updated.
 * @returns {Promise<void>}
 */
async function updateProductEntity(productEntity) {
    sendToClient({type: TYPES.SCENES_UPDATE_PRODUCT_ENTITY, payload: productEntity});
}

/**
 * @function deleteProductEntity
 * @description Send a message to the client to delete a product entity.
 * @param {Object} productEntity The product entity to be deleted.
 * @returns {Promise<void>}
 */
async function deleteProductEntity(productEntity) {
    sendToClient({type: TYPES.SCENES_DELETE_PRODUCT_ENTITY, payload: productEntity});
}

export default {
    newSceneProduct,
    updateSceneProduct,
    deleteSceneProduct,
    newProductEntity,
    updateProductEntity,
    deleteProductEntity,
}

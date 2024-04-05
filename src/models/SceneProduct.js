import { DataTypes } from 'sequelize';
import Database from './Database.js';
import Mesh from './Mesh.js';
import Vector3D from './Vector3D.js';
import Product from './Product.js';
import SceneProductState, { SCENE_PRODUCT_STATE } from './SceneProductState.js';

const SceneProduct = Database.define("SceneProduct", {
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
}, {
    hooks: {
        beforeCreate: async (sceneProduct) => {
            if (!sceneProduct.position_uuid) {
                const position = await Vector3D.create({ x: 0, y: 0, z: 0 });
                sceneProduct.position_uuid = position.dataValues.uuid;
            }
            if (!sceneProduct.rotation_uuid) {
                const rotation = await Vector3D.create({ x: 0, y: 0, z: 0 });
                sceneProduct.rotation_uuid = rotation.dataValues.uuid;
            }
            if (!sceneProduct.scale_uuid) {
                const scale = await Vector3D.create({ x: 1, y: 1, z: 1 });
                sceneProduct.scale_uuid = scale.dataValues.uuid;
            }
            if (!sceneProduct.mesh_uuid) {
                sceneProduct.state_name = SCENE_PRODUCT_STATE.MESH_REQUIRED;
            }
            if (!sceneProduct.ui_offset_position_uuid) {
                const uiOffsetPosition = await Vector3D.create({ x: 0, y: 0, z: 0 });
                sceneProduct.ui_offset_position_uuid = uiOffsetPosition.dataValues.uuid;
            }
            if (!sceneProduct.ui_offset_rotation_uuid) {
                const uiOffsetRotation = await Vector3D.create({ x: 0, y: 0, z: 0 });
                sceneProduct.ui_offset_rotation_uuid = uiOffsetRotation.dataValues.uuid;
            }
            if (!sceneProduct.ui_scale_uuid) {
                const uiScale = await Vector3D.create({ x: 1, y: 1, z: 1 });
                sceneProduct.ui_scale_uuid = uiScale.dataValues.uuid;
            }
        },
        beforeUpdate: (sceneProduct) => {
            if (!sceneProduct.mesh_uuid) {
                sceneProduct.state_name = SCENE_PRODUCT_STATE.MESH_REQUIRED;
            } 
            else if (sceneProduct.state_name !== SCENE_PRODUCT_STATE.READY_FOR_SALE) {
                sceneProduct.state_name = SCENE_PRODUCT_STATE.READY_FOR_SALE;
            }
        }
    },
    paranoid: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

SceneProduct.belongsTo(Vector3D, { foreignKey: 'position_uuid', targetKey: 'uuid', as: 'Position' });
SceneProduct.belongsTo(Vector3D, { foreignKey: 'rotation_uuid', targetKey: 'uuid', as: 'Rotation' });
SceneProduct.belongsTo(Vector3D, { foreignKey: 'scale_uuid', targetKey: 'uuid', as: 'Scale' });
SceneProduct.belongsTo(Vector3D, { foreignKey: 'ui_offset_position_uuid', targetKey: 'uuid', as: 'UIOffsetPosition' });
SceneProduct.belongsTo(Vector3D, { foreignKey: 'ui_offset_rotation_uuid', targetKey: 'uuid', as: 'UIOffsetRotation' });
SceneProduct.belongsTo(Vector3D, { foreignKey: 'ui_scale_uuid', targetKey: 'uuid', as: 'UIScale' });
SceneProduct.belongsTo(Mesh, { foreignKey: 'mesh_uuid', targetKey: 'uuid', as: 'Mesh' });
SceneProduct.belongsTo(Product, { foreignKey: 'product_uuid', targetKey: 'uuid', as: 'Product' });
SceneProduct.belongsTo(SceneProductState, { foreignKey: 'state_name', targetKey: 'name', as: 'State' });

Mesh.hasMany(SceneProduct);
Vector3D.hasMany(SceneProduct);
Product.hasMany(SceneProduct);
SceneProductState.hasMany(SceneProduct);

export default SceneProduct;

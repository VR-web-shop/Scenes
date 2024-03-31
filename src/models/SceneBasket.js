import { DataTypes } from 'sequelize';
import Database from './Database.js';
import Vector3D from './Vector3D.js';
import Mesh from './Mesh.js';
import SceneBasketState, { SCENE_BASKET_STATE } from './SceneBasketState.js';

const SceneBasket = Database.define("SceneBasket", {
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
}, {
    hooks: {
        beforeCreate: async (sceneBasket) => {
            if (!sceneBasket.position_uuid) {
                const position = await Vector3D.create({ x: 0, y: 0, z: 0 });
                sceneBasket.position_uuid = position.dataValues.uuid;
            }
            if (!sceneBasket.rotation_uuid) {
                const rotation = await Vector3D.create({ x: 0, y: 0, z: 0 });
                sceneBasket.rotation_uuid = rotation.dataValues.uuid;
            }
            if (!sceneBasket.scale_uuid) {
                const scale = await Vector3D.create({ x: 1, y: 1, z: 1 });
                sceneBasket.scale_uuid = scale.dataValues.uuid;
            }
            if (!sceneBasket.object_offset_uuid) {
                const objectOffset = await Vector3D.create({ x: 0, y: 0, z: 0 });
                sceneBasket.object_offset_uuid = objectOffset.dataValues.uuid;
            }
            if (!sceneBasket.placeholder_offset_uuid) {
                const placeholderOffset = await Vector3D.create({ x: 0, y: 0, z: 0 });
                sceneBasket.placeholder_offset_uuid = placeholderOffset.dataValues.uuid;
            }
            if (!sceneBasket.pocket_offset_uuid) {
                const pocketOffset = await Vector3D.create({ x: 0, y: 0, z: 0 });
                sceneBasket.pocket_offset_uuid = pocketOffset.dataValues.uuid;
            }
            if (!sceneBasket.insert_area_offset_uuid) {
                const insertAreaOffset = await Vector3D.create({ x: 0, y: 0, z: 0 });
                sceneBasket.insert_area_offset_uuid = insertAreaOffset.dataValues.uuid;
            }
            if (!sceneBasket.insert_area_size_uuid) {
                const insertAreaSize = await Vector3D.create({ x: 1, y: 1, z: 1 });
                sceneBasket.insert_area_size_uuid = insertAreaSize.dataValues.uuid;
            }
            if (!sceneBasket.object_uuid || !sceneBasket.placeholder_uuid || !sceneBasket.pocket_uuid) {
                sceneBasket.state_name = SCENE_BASKET_STATE.MESH_REQUIRED;
            }
        },
        beforeUpdate: (sceneBasket) => {
            if (!sceneBasket.object_uuid || !sceneBasket.placeholder_uuid || !sceneBasket.pocket_uuid) {
                sceneBasket.state_name = SCENE_BASKET_STATE.MESH_REQUIRED;
            } 
            else if (sceneBasket.state_name !== SCENE_BASKET_STATE.READY_FOR_PRODUCTS) {
                sceneBasket.state_name = SCENE_BASKET_STATE.READY_FOR_PRODUCTS;
            }
        }
    },
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

SceneBasket.belongsTo(Vector3D, { foreignKey: 'position_uuid', targetKey: 'uuid', as: 'Position' });
SceneBasket.belongsTo(Vector3D, { foreignKey: 'rotation_uuid', targetKey: 'uuid', as: 'Rotation' });
SceneBasket.belongsTo(Vector3D, { foreignKey: 'scale_uuid', targetKey: 'uuid', as: 'Scale' });
SceneBasket.belongsTo(Vector3D, { foreignKey: 'object_offset_uuid', targetKey: 'uuid', as: 'ObjectOffset' });
SceneBasket.belongsTo(Vector3D, { foreignKey: 'placeholder_offset_uuid', targetKey: 'uuid', as: 'PlaceholderOffset' }); 
SceneBasket.belongsTo(Vector3D, { foreignKey: 'pocket_offset_uuid', targetKey: 'uuid', as: 'PocketOffset' });
SceneBasket.belongsTo(Vector3D, { foreignKey: 'insert_area_offset_uuid', targetKey: 'uuid', as: 'InsertAreaOffset' }); 
SceneBasket.belongsTo(Vector3D, { foreignKey: 'insert_area_size_uuid', targetKey: 'uuid', as: 'InsertAreaSize' }); 
SceneBasket.belongsTo(Mesh, { foreignKey: 'object_uuid', targetKey: 'uuid', as: 'Object' });
SceneBasket.belongsTo(Mesh, { foreignKey: 'placeholder_uuid', targetKey: 'uuid', as: 'Placeholder' });
SceneBasket.belongsTo(Mesh, { foreignKey: 'pocket_uuid', targetKey: 'uuid', as: 'Pocket' });
SceneBasket.belongsTo(SceneBasketState, { foreignKey: 'state_name', targetKey: 'name', as: 'State' });

Vector3D.hasMany(SceneBasket);
Mesh.hasMany(SceneBasket);
SceneBasketState.hasMany(SceneBasket);

export default SceneBasket;

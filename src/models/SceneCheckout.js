import { DataTypes } from 'sequelize';
import Database from './Database.js';
import Vector3D from './Vector3D.js';
import Mesh from './Mesh.js';

const SceneCheckout = Database.define("SceneCheckout", {
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    hooks: {
        beforeCreate: async (sceneCheckout) => {
            if (!sceneCheckout.position_uuid) {
                const position = await Vector3D.create({ x: 0, y: 0, z: 0 });
                sceneCheckout.position_uuid = position.dataValues.uuid;
            }
            if (!sceneCheckout.rotation_uuid) {
                const rotation = await Vector3D.create({ x: 0, y: 0, z: 0 });
                sceneCheckout.rotation_uuid = rotation.dataValues.uuid;
            }
            if (!sceneCheckout.scale_uuid) {
                const scale = await Vector3D.create({ x: 1, y: 1, z: 1 });
                sceneCheckout.scale_uuid = scale.dataValues.uuid;
            }
            if (!sceneCheckout.surface_offset_uuid) {
                const surfaceOffset = await Vector3D.create({ x: 0, y: 0, z: 0 });
                sceneCheckout.surface_offset_uuid = surfaceOffset.dataValues.uuid;
            }
            if (!sceneCheckout.surface_size_uuid) {
                const surfaceSize = await Vector3D.create({ x: 1, y: 1, z: 1 });
                sceneCheckout.surface_size_uuid = surfaceSize.dataValues.uuid;
            }
            if (!sceneCheckout.ui_offset_position_uuid) {
                const uiOffset = await Vector3D.create({ x: 0, y: 0, z: 0 });
                sceneCheckout.ui_offset_position_uuid = uiOffset.dataValues.uuid;
            }
            if (!sceneCheckout.ui_offset_rotation_uuid) {
                const uiRotation = await Vector3D.create({ x: 0, y: 0, z: 0 });
                sceneCheckout.ui_offset_rotation_uuid = uiRotation.dataValues.uuid;
            }
            if (!sceneCheckout.ui_scale_uuid) {
                const uiScale = await Vector3D.create({ x: 1, y: 1, z: 1 });
                sceneCheckout.ui_scale_uuid = uiScale.dataValues.uuid;
            }
        }
    },
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

SceneCheckout.belongsTo(Vector3D, { foreignKey: 'position_uuid', targetKey: 'uuid', as: 'Position' });
SceneCheckout.belongsTo(Vector3D, { foreignKey: 'rotation_uuid', targetKey: 'uuid', as: 'Rotation' });
SceneCheckout.belongsTo(Vector3D, { foreignKey: 'scale_uuid', targetKey: 'uuid', as: 'Scale' });
SceneCheckout.belongsTo(Vector3D, { foreignKey: 'surface_offset_uuid', targetKey: 'uuid', as: 'SurfaceOffset' });
SceneCheckout.belongsTo(Vector3D, { foreignKey: 'surface_size_uuid', targetKey: 'uuid', as: 'SurfaceSize' });
SceneCheckout.belongsTo(Vector3D, { foreignKey: 'ui_offset_position_uuid', targetKey: 'uuid', as: 'UIOffsetPosition' });
SceneCheckout.belongsTo(Vector3D, { foreignKey: 'ui_offset_rotation_uuid', targetKey: 'uuid', as: 'UIOffsetRotation' });
SceneCheckout.belongsTo(Vector3D, { foreignKey: 'ui_scale_uuid', targetKey: 'uuid', as: 'UIScale' });
SceneCheckout.belongsTo(Mesh, { foreignKey: 'mesh_uuid', targetKey: 'uuid', as: 'Mesh' });

Vector3D.hasMany(SceneCheckout);
Mesh.hasMany(SceneCheckout);

export default SceneCheckout;

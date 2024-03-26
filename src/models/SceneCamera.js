import { DataTypes } from 'sequelize';
import Database from './Database.js';
import Vector3D from './Vector3D.js';

const SceneCamera = Database.define("SceneCamera", {
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
}, {
    hooks: {
        beforeCreate: async (sceneCamera) => {
            if (!sceneCamera.position_uuid) {
                const position = await Vector3D.create({ x: 0, y: 0, z: 0 });
                sceneCamera.position_uuid = position.dataValues.uuid;
            }
            if (!sceneCamera.rotation_uuid) {
                const rotation = await Vector3D.create({ x: 0, y: 0, z: 0 });
                sceneCamera.rotation_uuid = rotation.dataValues.uuid;
            }
        }
    },
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

SceneCamera.belongsTo(Vector3D, { foreignKey: 'position_uuid', targetKey: 'uuid', as: 'Position' });
SceneCamera.belongsTo(Vector3D, { foreignKey: 'rotation_uuid', targetKey: 'uuid', as: 'Rotation' });

Vector3D.hasMany(SceneCamera);

export default SceneCamera;

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
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

SceneCamera.belongsTo(Vector3D, { foreignKey: 'position_uuid', targetKey: 'uuid' });
SceneCamera.belongsTo(Vector3D, { foreignKey: 'rotation_uuid', targetKey: 'uuid' });

Vector3D.hasMany(SceneCamera);

export default SceneCamera;

import { DataTypes } from 'sequelize';
import Database from './Database.js';
import Mesh from './Mesh.js';
import Vector3D from './Vector3D.js';

const SceneFloor = Database.define("SceneFloor", {
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

SceneFloor.belongsTo(Vector3D, { foreignKey: 'position_uuid', targetKey: 'uuid' });
SceneFloor.belongsTo(Vector3D, { foreignKey: 'rotation_uuid', targetKey: 'uuid' });
SceneFloor.belongsTo(Vector3D, { foreignKey: 'scale_uuid', targetKey: 'uuid' });
SceneFloor.belongsTo(Mesh, { foreignKey: 'mesh_uuid', targetKey: 'uuid' });

Mesh.hasMany(SceneFloor);
Vector3D.hasMany(SceneFloor);

export default SceneFloor;

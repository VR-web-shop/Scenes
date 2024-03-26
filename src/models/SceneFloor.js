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
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    hooks: {
        beforeCreate: async (sceneFloor) => {
            if (!sceneFloor.position_uuid) {
                const position = await Vector3D.create({ x: 0, y: 0, z: 0 });
                sceneFloor.position_uuid = position.dataValues.uuid;
            }
            if (!sceneFloor.rotation_uuid) {
                const rotation = await Vector3D.create({ x: 0, y: 0, z: 0 });
                sceneFloor.rotation_uuid = rotation.dataValues.uuid;
            }
            if (!sceneFloor.scale_uuid) {
                const scale = await Vector3D.create({ x: 0, y: 0, z: 0 });
                sceneFloor.scale_uuid = scale.dataValues.uuid;
            }
        }
    },
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

SceneFloor.belongsTo(Vector3D, { foreignKey: 'position_uuid', targetKey: 'uuid', as: 'Position' });
SceneFloor.belongsTo(Vector3D, { foreignKey: 'rotation_uuid', targetKey: 'uuid', as: 'Rotation' });
SceneFloor.belongsTo(Vector3D, { foreignKey: 'scale_uuid', targetKey: 'uuid', as: 'Scale' });
SceneFloor.belongsTo(Mesh, { foreignKey: 'mesh_uuid', targetKey: 'uuid', as: 'Mesh' });

Mesh.hasMany(SceneFloor);
Vector3D.hasMany(SceneFloor);

export default SceneFloor;

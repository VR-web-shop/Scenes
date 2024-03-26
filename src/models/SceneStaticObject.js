import { DataTypes } from 'sequelize';
import Database from './Database.js';
import Vector3D from './Vector3D.js';
import Mesh from './Mesh.js';

const SceneStaticObject = Database.define("SceneStaticObject", {
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
        beforeCreate: async (sceneStaticObject) => {
            if (!sceneStaticObject.position_uuid) {
                const position = await Vector3D.create({ x: 0, y: 0, z: 0 });
                sceneStaticObject.position_uuid = position.dataValues.uuid;
            }
            if (!sceneStaticObject.rotation_uuid) {
                const rotation = await Vector3D.create({ x: 0, y: 0, z: 0 });
                sceneStaticObject.rotation_uuid = rotation.dataValues.uuid;
            }
            if (!sceneStaticObject.scale_uuid) {
                const scale = await Vector3D.create({ x: 0, y: 0, z: 0 });
                sceneStaticObject.scale_uuid = scale.dataValues.uuid;
            }
        }
    },
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

SceneStaticObject.belongsTo(Vector3D, { foreignKey: 'position_uuid', targetKey: 'uuid', as: 'Position' });
SceneStaticObject.belongsTo(Vector3D, { foreignKey: 'rotation_uuid', targetKey: 'uuid', as: 'Rotation' });
SceneStaticObject.belongsTo(Vector3D, { foreignKey: 'scale_uuid', targetKey: 'uuid', as: 'Scale' });
SceneStaticObject.belongsTo(Mesh, { foreignKey: 'mesh_uuid', targetKey: 'uuid', as: 'Mesh' });

Vector3D.hasMany(SceneStaticObject);
Mesh.hasMany(SceneStaticObject);

export default SceneStaticObject;

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
        beforeCreate: (sceneStaticObject) => {
            if (!sceneStaticObject.position_uuid) {
                sceneStaticObject.position_uuid = Vector3D.create({x: 0, y: 0, z: 0}).uuid;
            }

            if (!sceneStaticObject.rotation_uuid) {
                sceneStaticObject.rotation_uuid = Vector3D.create({x: 0, y: 0, z: 0}).uuid;
            }

            if (!sceneStaticObject.scale_uuid) {
                sceneStaticObject.scale_uuid = Vector3D.create({x: 0, y: 0, z: 0}).uuid;
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

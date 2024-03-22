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
}, {
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

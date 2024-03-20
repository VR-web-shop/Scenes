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
}, {
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

SceneCheckout.belongsTo(Vector3D, { foreignKey: 'position_uuid', targetKey: 'uuid' });
SceneCheckout.belongsTo(Vector3D, { foreignKey: 'rotation_uuid', targetKey: 'uuid' });
SceneCheckout.belongsTo(Vector3D, { foreignKey: 'scale_uuid', targetKey: 'uuid' });
SceneCheckout.belongsTo(Vector3D, { foreignKey: 'surface_offset_uuid', targetKey: 'uuid' });
SceneCheckout.belongsTo(Vector3D, { foreignKey: 'surface_size_uuid', targetKey: 'uuid' });
SceneCheckout.belongsTo(Vector3D, { foreignKey: 'ui_offset_uuid', targetKey: 'uuid' });
SceneCheckout.belongsTo(Vector3D, { foreignKey: 'ui_rotation_uuid', targetKey: 'uuid' });
SceneCheckout.belongsTo(Mesh, { foreignKey: 'mesh_uuid', targetKey: 'uuid' });

Vector3D.hasMany(SceneCheckout);
Mesh.hasMany(SceneCheckout);

export default SceneCheckout;

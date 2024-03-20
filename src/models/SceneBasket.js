import { DataTypes } from 'sequelize';
import Database from './Database.js';
import Vector3D from './Vector3D.js';
import Mesh from './Mesh.js';

const SceneBasket = Database.define("SceneBasket", {
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

SceneBasket.belongsTo(Vector3D, { foreignKey: 'position_uuid', targetKey: 'uuid' });
SceneBasket.belongsTo(Vector3D, { foreignKey: 'rotation_uuid', targetKey: 'uuid' });
SceneBasket.belongsTo(Vector3D, { foreignKey: 'scale_uuid', targetKey: 'uuid' });
SceneBasket.belongsTo(Vector3D, { foreignKey: 'object_offset_uuid', targetKey: 'uuid' });
SceneBasket.belongsTo(Vector3D, { foreignKey: 'placeholder_offset_uuid', targetKey: 'uuid' });    
SceneBasket.belongsTo(Mesh, { foreignKey: 'object_uuid', targetKey: 'uuid' });
SceneBasket.belongsTo(Mesh, { foreignKey: 'placeholder_uuid', targetKey: 'uuid' });

Vector3D.hasMany(SceneBasket);
Mesh.hasMany(SceneBasket);

export default SceneBasket;

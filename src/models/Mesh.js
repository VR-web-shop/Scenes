import { DataTypes } from 'sequelize';
import Database from './Database.js';
import MeshMaterial from './MeshMaterial.js';

const Mesh = Database.define("Mesh", {
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
    source: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

Mesh.hasMany(MeshMaterial);

MeshMaterial.belongsTo(Mesh, { foreignKey: 'mesh_uuid', targetKey: 'uuid' });

export default Mesh;

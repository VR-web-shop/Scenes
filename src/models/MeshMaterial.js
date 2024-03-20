import { DataTypes } from 'sequelize';
import Database from './Database.js';
import Material from './Material.js';

const MeshMaterial = Database.define("MeshMaterial", {
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    submesh_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

MeshMaterial.belongsTo(Material, { foreignKey: 'material_uuid', targetKey: 'uuid' });

Material.hasMany(MeshMaterial);

export default MeshMaterial;

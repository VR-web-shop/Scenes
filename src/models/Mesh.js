import { DataTypes } from 'sequelize';
import Database from './Database.js';
import MeshMaterial from './MeshMaterial.js';
import Material from './Material.js';

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

Material.belongsToMany(Mesh, { through: MeshMaterial, foreignKey: 'material_uuid', as: 'Mesh' });
MeshMaterial.belongsTo(Material, { foreignKey: 'material_uuid' });

Mesh.belongsToMany(Material, { through: MeshMaterial, foreignKey: 'mesh_uuid', as: 'Material' });
MeshMaterial.belongsTo(Mesh, { foreignKey: 'mesh_uuid' });

Mesh.hasMany(MeshMaterial);

export default Mesh;

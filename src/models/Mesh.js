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
    hooks: {
        beforeDestroy: async (mesh) => {
            await MeshMaterial.destroy({ where: { mesh_uuid: mesh.uuid } });
        }
    },
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

MeshMaterial.belongsTo(Material, { foreignKey: 'material_uuid' });
MeshMaterial.belongsTo(Mesh, { foreignKey: 'mesh_uuid' });

Material.belongsToMany(Mesh, { through: MeshMaterial, foreignKey: 'material_uuid', as: 'Mesh' });
Mesh.belongsToMany(Material, { through: MeshMaterial, foreignKey: 'mesh_uuid', as: 'Material' });

Mesh.hasMany(MeshMaterial);

export default Mesh;

import { DataTypes } from 'sequelize';
import Database from './Database.js';
import MaterialType from './MaterialType.js';
import MaterialTexture from './MaterialTexture.js';
import Texture from './Texture.js';

const Material = Database.define("Material", {
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
        beforeDestroy: async (material) => {
            await MaterialTexture.destroy({ where: { material_uuid: material.uuid } });
        }
    },
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

Material.belongsTo(MaterialType, { foreignKey: 'material_type_name', targetKey: 'name' });
MaterialType.hasMany(Material);

Material.belongsToMany(Texture, { through: MaterialTexture, foreignKey: 'material_uuid', as: 'Texture' });
MaterialTexture.belongsTo(Material, { foreignKey: 'material_uuid' });

Texture.belongsToMany(Material, { through: MaterialTexture, foreignKey: 'texture_uuid', as: 'Material' });
MaterialTexture.belongsTo(Texture, { foreignKey: 'texture_uuid' });

export default Material;

import { DataTypes } from 'sequelize';
import Database from './Database.js';
import Texture from './Texture.js';
import Material from './Material.js';

const MaterialTexture = Database.define("MaterialTexture", {
    uuid: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
}, {
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

Texture.belongsToMany(Material, {
    through: MaterialTexture,
    foreignKey: 'texture_uuid'
});

Material.belongsToMany(Texture, {
    through: MaterialTexture,
    foreignKey: 'material_uuid'
});

export default MaterialTexture;

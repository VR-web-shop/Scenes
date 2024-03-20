import { DataTypes } from 'sequelize';
import Database from './Database.js';
import TextureType from './TextureType.js';

const Texture = Database.define("Texture", {
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

Texture.belongsTo(TextureType, { foreignKey: 'texture_type_name', targetKey: 'name' });
TextureType.hasMany(Texture);

export default Texture;

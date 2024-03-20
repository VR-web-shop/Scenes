import { DataTypes } from 'sequelize';
import Database from './Database.js';

export const TEXTURE_TYPE = {
    Map: 'map',
    NormalMap: 'normalMap',
}

const TextureType = Database.define("TextureType", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
}, {
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

export default TextureType;

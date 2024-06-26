import { DataTypes } from 'sequelize';
import Database from './Database.js';

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

export default MaterialTexture;

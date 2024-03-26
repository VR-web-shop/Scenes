import { DataTypes } from 'sequelize';
import Database from './Database.js';

const SceneBackground = Database.define("SceneBackground", {
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    hex: {
        type: DataTypes.STRING,
        defaultValue: '#ffffff',
        allowNull: false
    },
}, {
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});


export default SceneBackground;

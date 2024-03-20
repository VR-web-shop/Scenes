import { DataTypes } from 'sequelize';
import Database from './Database.js';

const SceneBackground = Database.define("SceneBackground", {
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    red: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    green: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    blue: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
}, {
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});


export default SceneBackground;

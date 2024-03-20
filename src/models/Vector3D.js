import { DataTypes } from 'sequelize';
import Database from './Database.js';

const Vector3D = Database.define("Vector3D", {
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    x: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    y: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    z: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
}, {
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

export default Vector3D;

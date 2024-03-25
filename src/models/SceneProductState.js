import { DataTypes } from 'sequelize';
import Database from './Database.js';

export const SCENE_PRODUCT_STATE = {
    MESH_REQUIRED: 'MeshRequired',
    READY_FOR_SALE: 'ReadyForSale',
}

const SceneProductState = Database.define("SceneProductState", {
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

export default SceneProductState;

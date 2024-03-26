import { DataTypes } from 'sequelize';
import Database from './Database.js';

export const SCENE_BASKET_STATE = {
    MESH_REQUIRED: 'MeshRequired',
    READY_FOR_PRODUCTS: 'ReadyForProducts',
}

const SceneBasketState = Database.define("SceneBasketState", {
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

export default SceneBasketState;

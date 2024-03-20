import { DataTypes } from 'sequelize';
import Database from './Database.js';

export const LIGHT_TYPE = {
    DirectionalLight: 'DirectionalLight',
    AmbientLight: 'AmbientLight',
    PointLight: 'PointLight',
    SpotLight: 'SpotLight',   
}

const SceneLightType = Database.define("SceneLightType", {
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

export default SceneLightType;

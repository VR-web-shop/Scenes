import { DataTypes } from 'sequelize';
import Database from './Database.js';

export const MATERIAL_TYPE = {
    MeshStandardMaterial: 'MeshStandardMaterial',
    MeshBasicMaterial: 'MeshBasicMaterial',
    MeshLambertMaterial: 'MeshLambertMaterial',
    MeshPhongMaterial: 'MeshPhongMaterial',
    MeshToonMaterial: 'MeshToonMaterial',
    MeshPhysicalMaterial: 'MeshPhysicalMaterial',    
}

const MaterialType = Database.define("MaterialType", {
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

export default MaterialType;

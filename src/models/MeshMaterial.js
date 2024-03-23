import { DataTypes } from 'sequelize';
import Database from './Database.js';

const MeshMaterial = Database.define("MeshMaterial", {
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    submesh_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

export default MeshMaterial;

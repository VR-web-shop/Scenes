import { DataTypes } from 'sequelize';
import Database from './Database.js';
import MaterialType from './MaterialType.js';

const Material = Database.define("Material", {
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

Material.belongsTo(MaterialType, { foreignKey: 'material_type_name', targetKey: 'name' });

MaterialType.hasMany(Material);

export default Material;

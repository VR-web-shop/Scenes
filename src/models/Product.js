import { DataTypes } from 'sequelize';
import Database from './Database.js';
import Mesh from './Mesh.js';
import Vector3D from './Vector3D.js';
import ProductEntity from './ProductEntity.js';

const Product = Database.define("Product", {
    uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    paranoid: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

ProductEntity.belongsTo(Product, { foreignKey: 'product_uuid', targetKey: 'uuid' });
Product.belongsTo(Vector3D, { foreignKey: 'position_uuid', targetKey: 'uuid' });
Product.belongsTo(Vector3D, { foreignKey: 'rotation_uuid', targetKey: 'uuid' });
Product.belongsTo(Vector3D, { foreignKey: 'scale_uuid', targetKey: 'uuid' });
Product.belongsTo(Mesh, { foreignKey: 'mesh_uuid', targetKey: 'uuid' });

Product.hasMany(ProductEntity);
Mesh.hasMany(Product);
Vector3D.hasMany(Product);

export default Product;

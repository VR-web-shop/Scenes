import { DataTypes } from 'sequelize';
import Database from './Database.js';
import Mesh from './Mesh.js';
import Vector3D from './Vector3D.js';
import Product from './Product.js';

const SceneProduct = Database.define("SceneProduct", {
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
}, {
    hooks: {
        beforeCreate: (sceneProduct) => {
            if (!sceneProduct.position_uuid) {
                sceneProduct.position_uuid = Vector3D.create({x: 0, y: 0, z: 0}).uuid;
            }

            if (!sceneProduct.rotation_uuid) {
                sceneProduct.rotation_uuid = Vector3D.create({x: 0, y: 0, z: 0}).uuid;
            }

            if (!sceneProduct.scale_uuid) {
                sceneProduct.scale_uuid = Vector3D.create({x: 0, y: 0, z: 0}).uuid;
            }
        }
    },
    paranoid: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

SceneProduct.belongsTo(Vector3D, { foreignKey: 'position_uuid', targetKey: 'uuid', as: 'Position' });
SceneProduct.belongsTo(Vector3D, { foreignKey: 'rotation_uuid', targetKey: 'uuid', as: 'Rotation' });
SceneProduct.belongsTo(Vector3D, { foreignKey: 'scale_uuid', targetKey: 'uuid', as: 'Scale' });
SceneProduct.belongsTo(Mesh, { foreignKey: 'mesh_uuid', targetKey: 'uuid', as: 'Mesh' });
SceneProduct.belongsTo(Product, { foreignKey: 'product_uuid', targetKey: 'uuid', as: 'Product' });

Mesh.hasMany(SceneProduct);
Vector3D.hasMany(SceneProduct);
Product.hasMany(SceneProduct);

export default SceneProduct;

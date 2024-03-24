import { DataTypes } from 'sequelize';
import Database from './Database.js';
import Vector3D from './Vector3D.js';
import Mesh from './Mesh.js';

const SceneBasket = Database.define("SceneBasket", {
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
}, {
    hooks: {
        beforeCreate: (sceneBasket) => {
            if (!sceneBasket.position_uuid) {
                sceneBasket.position_uuid = Vector3D.create({x: 0, y: 0, z: 0}).uuid;
            }

            if (!sceneBasket.rotation_uuid) {
                sceneBasket.rotation_uuid = Vector3D.create({x: 0, y: 0, z: 0}).uuid;
            }

            if (!sceneBasket.scale_uuid) {
                sceneBasket.scale_uuid = Vector3D.create({x: 0, y: 0, z: 0}).uuid;
            }

            if (!sceneBasket.object_offset_uuid) {
                sceneBasket.object_offset_uuid = Vector3D.create({x: 0, y: 0, z: 0}).uuid;
            }

            if (!sceneBasket.placeholder_offset_uuid) {
                sceneBasket.placeholder_offset_uuid = Vector3D.create({x: 0, y: 0, z: 0}).uuid;
            }
        }
    },
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

SceneBasket.belongsTo(Vector3D, { foreignKey: 'position_uuid', targetKey: 'uuid', as: 'Position' });
SceneBasket.belongsTo(Vector3D, { foreignKey: 'rotation_uuid', targetKey: 'uuid', as: 'Rotation' });
SceneBasket.belongsTo(Vector3D, { foreignKey: 'scale_uuid', targetKey: 'uuid', as: 'Scale' });
SceneBasket.belongsTo(Vector3D, { foreignKey: 'object_offset_uuid', targetKey: 'uuid', as: 'ObjectOffset' });
SceneBasket.belongsTo(Vector3D, { foreignKey: 'placeholder_offset_uuid', targetKey: 'uuid', as: 'PlaceholderOffset' }); 
SceneBasket.belongsTo(Mesh, { foreignKey: 'object_uuid', targetKey: 'uuid', as: 'Object' });
SceneBasket.belongsTo(Mesh, { foreignKey: 'placeholder_uuid', targetKey: 'uuid', as: 'Placeholder' });

Vector3D.hasMany(SceneBasket);
Mesh.hasMany(SceneBasket);

export default SceneBasket;

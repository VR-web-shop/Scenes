import { DataTypes } from 'sequelize';
import Database from './Database.js';
import Vector3D from './Vector3D.js';
import Mesh from './Mesh.js';

const SceneCheckout = Database.define("SceneCheckout", {
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
    hooks: {
        beforeCreate: (sceneCheckout) => {
            if (!sceneCheckout.position_uuid) {
                sceneCheckout.position_uuid = Vector3D.create({x: 0, y: 0, z: 0}).uuid;
            }

            if (!sceneCheckout.rotation_uuid) {
                sceneCheckout.rotation_uuid = Vector3D.create({x: 0, y: 0, z: 0}).uuid;
            }

            if (!sceneCheckout.scale_uuid) {
                sceneCheckout.scale_uuid = Vector3D.create({x: 0, y: 0, z: 0}).uuid;
            }
        }
    },
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

SceneCheckout.belongsTo(Vector3D, { foreignKey: 'position_uuid', targetKey: 'uuid', as: 'Position' });
SceneCheckout.belongsTo(Vector3D, { foreignKey: 'rotation_uuid', targetKey: 'uuid', as: 'Rotation' });
SceneCheckout.belongsTo(Vector3D, { foreignKey: 'scale_uuid', targetKey: 'uuid', as: 'Scale' });
SceneCheckout.belongsTo(Vector3D, { foreignKey: 'surface_offset_uuid', targetKey: 'uuid', as: 'SurfaceOffset' });
SceneCheckout.belongsTo(Vector3D, { foreignKey: 'surface_size_uuid', targetKey: 'uuid', as: 'SurfaceSize' });
SceneCheckout.belongsTo(Vector3D, { foreignKey: 'ui_offset_uuid', targetKey: 'uuid', as: 'UIOffset' });
SceneCheckout.belongsTo(Vector3D, { foreignKey: 'ui_rotation_uuid', targetKey: 'uuid', as: 'UIRotation' });
SceneCheckout.belongsTo(Mesh, { foreignKey: 'mesh_uuid', targetKey: 'uuid', as: 'Mesh' });

Vector3D.hasMany(SceneCheckout);
Mesh.hasMany(SceneCheckout);

export default SceneCheckout;

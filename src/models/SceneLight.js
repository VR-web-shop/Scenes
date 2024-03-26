import { DataTypes } from 'sequelize';
import Database from './Database.js';
import Vector3D from './Vector3D.js';
import SceneLightType from './SceneLightType.js';

const SceneLight = Database.define("SceneLight", {
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
    intensity: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    hexColor: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '#ffffff'
    },
}, {
    hooks: {
        beforeCreate: async (sceneLight) => {
            if (!sceneLight.position_uuid) {
                const position = await Vector3D.create({ x: 0, y: 0, z: 0 });
                sceneLight.position_uuid = position.dataValues.uuid;
            }
            if (!sceneLight.rotation_uuid) {
                const rotation = await Vector3D.create({ x: 0, y: 0, z: 0 });
                sceneLight.rotation_uuid = rotation.dataValues.uuid;
            }
        }
    },
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

SceneLight.belongsTo(Vector3D, { foreignKey: 'position_uuid', targetKey: 'uuid', as: 'Position' });
SceneLight.belongsTo(Vector3D, { foreignKey: 'rotation_uuid', targetKey: 'uuid', as: 'Rotation' });
SceneLight.belongsTo(SceneLightType, { foreignKey: 'scene_light_type_name', targetKey: 'name', as: 'Type' });

Vector3D.hasMany(SceneLight);
SceneLightType.hasMany(SceneLight);

export default SceneLight;

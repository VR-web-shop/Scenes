import { DataTypes } from 'sequelize';
import Database from './Database.js';
import Vector3D from './Vector3D.js';

const SceneCharacter = Database.define("SceneCharacter", {
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
}, {
    hooks: {
        beforeCreate: async (sceneCharacter) => {
            if (!sceneCharacter.position_uuid) {
                const position = await Vector3D.create({ x: 0, y: 0, z: 0 });
                sceneCharacter.position_uuid = position.dataValues.uuid;
            }
            if (!sceneCharacter.rotation_uuid) {
                const rotation = await Vector3D.create({ x: 0, y: 0, z: 0 });
                sceneCharacter.rotation_uuid = rotation.dataValues.uuid;
            }
        }
    },
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

SceneCharacter.belongsTo(Vector3D, { foreignKey: 'position_uuid', targetKey: 'uuid', as: 'Position' });
SceneCharacter.belongsTo(Vector3D, { foreignKey: 'rotation_uuid', targetKey: 'uuid', as: 'Rotation' });

Vector3D.hasMany(SceneCharacter);

export default SceneCharacter;

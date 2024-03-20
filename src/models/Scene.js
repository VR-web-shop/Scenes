import { DataTypes } from 'sequelize';
import Database from './Database.js';

import SceneBasket from './SceneBasket.js';
import SceneCheckout from './SceneCheckout.js';
import SceneFloor from './SceneFloor.js';
import SceneProduct from './ProductEntity.js';
import SceneStaticObject from './SceneStaticObject.js';
import SceneLight from './SceneLight.js';
import SceneCamera from './SceneCamera.js';
import SceneBackground from './SceneBackground.js';

const Scene = Database.define("Scene", {
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

Scene.hasOne(SceneBasket);
Scene.hasOne(SceneCamera);
Scene.hasOne(SceneBackground);
Scene.hasMany(SceneCheckout);
Scene.hasMany(SceneFloor);
Scene.hasMany(SceneProduct);
Scene.hasMany(SceneStaticObject);
Scene.hasMany(SceneLight);

SceneBasket.belongsTo(Scene, { foreignKey: 'scene_uuid', targetKey: 'uuid' });
SceneCheckout.belongsTo(Scene, { foreignKey: 'scene_uuid', targetKey: 'uuid' });
SceneFloor.belongsTo(Scene, { foreignKey: 'scene_uuid', targetKey: 'uuid' });
SceneProduct.belongsTo(Scene, { foreignKey: 'scene_uuid', targetKey: 'uuid' });
SceneStaticObject.belongsTo(Scene, { foreignKey: 'scene_uuid', targetKey: 'uuid' });
SceneLight.belongsTo(Scene, { foreignKey: 'scene_uuid', targetKey: 'uuid' });
SceneCamera.belongsTo(Scene, { foreignKey: 'scene_uuid', targetKey: 'uuid' });
SceneBackground.belongsTo(Scene, { foreignKey: 'scene_uuid', targetKey: 'uuid' });

export default Scene;

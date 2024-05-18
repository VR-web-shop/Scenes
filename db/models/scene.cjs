'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Scene extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Scene.hasMany(models.SceneDescription, {
        foreignKey: 'scene_client_side_uuid',
      });
      models.Scene.hasMany(models.SceneRemoved, {
        foreignKey: 'scene_client_side_uuid',
      });

      models.Scene.hasMany(models.SceneBackgroundDescription, {
        foreignKey: 'scene_client_side_uuid',
      });
      models.Scene.hasMany(models.SceneCameraDescription, {
        foreignKey: 'scene_client_side_uuid',
      });
      models.Scene.hasMany(models.SceneCharacterDescription, {
        foreignKey: 'scene_client_side_uuid',
      });
      models.Scene.hasMany(models.SceneBasketDescription, {
        foreignKey: 'scene_client_side_uuid',
      });
      models.Scene.hasMany(models.SceneCheckoutDescription, {
        foreignKey: 'scene_client_side_uuid',
      });
      models.Scene.hasMany(models.SceneFloorDescription, {
        foreignKey: 'scene_client_side_uuid',
      });
      models.Scene.hasMany(models.SceneLightDescription, {
        foreignKey: 'scene_client_side_uuid',
      });
      models.Scene.hasMany(models.SceneProductDescription, {
        foreignKey: 'scene_client_side_uuid',
      });
      models.Scene.hasMany(models.SceneStaticObjectDescription, {
        foreignKey: 'scene_client_side_uuid',
      });
    }
  }
  Scene.init({
    client_side_uuid: {
      type: DataTypes.STRING,
      field: 'client_side_uuid',
      primaryKey: true
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'created_at',
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'updated_at',
    },
  }, {
    sequelize,
    modelName: 'Scene',
  });
  return Scene;
};
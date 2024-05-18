'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SceneCamera extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.SceneCamera.hasMany(models.SceneCameraDescription, {
        foreignKey: 'scene_camera_client_side_uuid',
      });
      models.SceneCamera.hasMany(models.SceneCameraRemoved, {
        foreignKey: 'scene_camera_client_side_uuid',
      });
    }
  }
  SceneCamera.init({
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
    modelName: 'SceneCamera',
  });
  return SceneCamera;
};
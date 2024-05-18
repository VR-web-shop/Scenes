'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SceneLight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.SceneLight.hasMany(models.SceneLightDescription, {
        foreignKey: 'scene_light_client_side_uuid',
      });
      models.SceneLight.hasMany(models.SceneLightRemoved, {
        foreignKey: 'scene_light_client_side_uuid',
      });
    }
  }
  SceneLight.init({
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
    modelName: 'SceneLight',
  });
  return SceneLight;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SceneLightDescription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.SceneLightDescription.belongsTo(models.SceneLight, {
        foreignKey: 'scene_light_client_side_uuid',
      });
      models.SceneLightDescription.belongsTo(models.Scene, {
        foreignKey: 'scene_client_side_uuid',
      });
      models.SceneLightDescription.belongsTo(models.Vector3d, {
        foreignKey: 'position_client_side_uuid',
      });
      models.SceneLightDescription.belongsTo(models.Vector3d, {
        foreignKey: 'rotation_client_side_uuid',
      });
      models.SceneLightDescription.belongsTo(models.SceneLightType, {
        foreignKey: 'scene_light_type_name',
      });
    }
  }
  SceneLightDescription.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
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
    scene_light_client_side_uuid: {
      type: DataTypes.STRING,
      field: 'scene_light_client_side_uuid',
    },
    scene_client_side_uuid: {
      type: DataTypes.STRING,
      field: 'scene_client_side_uuid',
    },
    position_client_side_uuid: {
      type: DataTypes.STRING,
      field: 'position_client_side_uuid',
    },
    rotation_client_side_uuid: {
      type: DataTypes.STRING,
      field: 'rotation_client_side_uuid',
    },
    scene_light_type_name: {
      type: DataTypes.STRING,
      field: 'scene_light_type_name',
    },
    intensity: {
      type: DataTypes.FLOAT,
      field: 'intensity',
    },
    hexColor: {
      type: DataTypes.STRING,
      field: 'hex_color',
    },
    name: {
      type: DataTypes.STRING,
      field: 'name',
    },
  }, {
    sequelize,
    modelName: 'SceneLightDescription',
  });
  return SceneLightDescription;
};
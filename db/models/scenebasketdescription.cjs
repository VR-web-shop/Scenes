'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SceneBasketDescription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SceneBasketDescription.init({
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
    scene_basket_client_side_uuid: {
      type: DataTypes.STRING,
      field: 'scene_basket_client_side_uuid',
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
    scale_client_side_uuid: {
      type: DataTypes.STRING,
      field: 'scale_client_side_uuid',
    },
    object_offset_client_side_uuid: {
      type: DataTypes.STRING,
      field: 'object_offset_client_side_uuid',
    },
    insert_area_offset_client_side_uuid: {
      type: DataTypes.STRING,
      field: 'insert_area_offset_client_side_uuid',
    },
    insert_area_size_client_side_uuid: {
      type: DataTypes.STRING,
      field: 'insert_area_size_client_side_uuid',
    },
    object_client_side_uuid: {
      type: DataTypes.STRING,
      field: 'object_client_side_uuid',
    },
    placeholder_client_side_uuid: {
      type: DataTypes.STRING,
      field: 'placeholder_client_side_uuid',
    },
    pocket_client_side_uuid: {
      type: DataTypes.STRING,
      field: 'pocket_client_side_uuid',
    },
    basket_state_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'SceneBasketDescription',
  });
  return SceneBasketDescription;
};
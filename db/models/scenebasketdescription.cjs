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
      models.SceneBasketDescription.belongsTo(models.SceneBasket, {
        foreignKey: 'scene_background_client_side_uuid',
      });
      models.SceneBasketDescription.belongsTo(models.Scene, {
        foreignKey: 'scene_client_side_uuid',
      });
      models.SceneBasketDescription.belongsTo(models.Vector3d, {
        foreignKey: 'position_client_side_uuid',
      });
      models.SceneBasketDescription.belongsTo(models.Vector3d, {
        foreignKey: 'rotation_client_side_uuid',
      });
      models.SceneBasketDescription.belongsTo(models.Vector3d, {
        foreignKey: 'scale_client_side_uuid',
      });
      models.SceneBasketDescription.belongsTo(models.Vector3d, {
        foreignKey: 'object_offset_client_side_uuid',
      });
      models.SceneBasketDescription.belongsTo(models.Vector3d, {
        foreignKey: 'insert_area_offset_client_side_uuid',
      });
      models.SceneBasketDescription.belongsTo(models.Vector3d, {
        foreignKey: 'insert_area_size_client_side_uuid',
      });
      models.SceneBasketDescription.belongsTo(models.Vector3d, {
        foreignKey: 'placeholder_offset_client_side_uuid',
      });
      models.SceneBasketDescription.belongsTo(models.Vector3d, {
        foreignKey: 'pocket_offset_client_side_uuid',
      });
      models.SceneBasketDescription.belongsTo(models.Mesh, {
        foreignKey: 'object_client_side_uuid',
      });
      models.SceneBasketDescription.belongsTo(models.Mesh, {
        foreignKey: 'placeholder_client_side_uuid',
      });
      models.SceneBasketDescription.belongsTo(models.Mesh, {
        foreignKey: 'pocket_client_side_uuid',
      });
      models.SceneBasketDescription.belongsTo(models.SceneBasketState, {
        foreignKey: 'basket_state_name',
      });
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
    placeholder_offset_client_side_uuid: {
      type: DataTypes.STRING,
      field: 'placeholder_offset_client_side_uuid',
    },
    pocket_offset_client_side_uuid: {
      type: DataTypes.STRING,
      field: 'pocket_offset_client_side_uuid',
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
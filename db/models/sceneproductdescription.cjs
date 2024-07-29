'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SceneProductDescription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.SceneProductDescription.belongsTo(models.SceneProduct, {
        foreignKey: 'scene_product_client_side_uuid',
      });
      models.SceneProductDescription.belongsTo(models.Scene, {
        foreignKey: 'scene_client_side_uuid',
      });
      models.SceneProductDescription.belongsTo(models.Vector3d, {
        foreignKey: 'position_client_side_uuid',
      });
      models.SceneProductDescription.belongsTo(models.Vector3d, {
        foreignKey: 'rotation_client_side_uuid',
      });
      models.SceneProductDescription.belongsTo(models.Vector3d, {
        foreignKey: 'scale_client_side_uuid',
      });
      models.SceneProductDescription.belongsTo(models.Vector3d, {
        foreignKey: 'ui_offset_position_client_side_uuid',
      });
      models.SceneProductDescription.belongsTo(models.Vector3d, {
        foreignKey: 'ui_offset_rotation_client_side_uuid',
      });
      models.SceneProductDescription.belongsTo(models.Vector3d, {
        foreignKey: 'ui_scale_client_side_uuid',
      });
      models.SceneProductDescription.belongsTo(models.Mesh, {
        foreignKey: 'mesh_client_side_uuid',
      });
      models.SceneProductDescription.belongsTo(models.Product, {
        foreignKey: 'product_client_side_uuid',
      });
      models.SceneProductDescription.belongsTo(models.SceneProductState, {
        foreignKey: 'scene_product_state_name',
      });
    }
  }
  SceneProductDescription.init({
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
    scene_product_client_side_uuid: {
      type: DataTypes.STRING,
      field: 'scene_product_client_side_uuid',
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
    ui_offset_position_client_side_uuid: {
      type: DataTypes.STRING,
      field: 'ui_offset_position_client_side_uuid',
    },
    ui_offset_rotation_client_side_uuid: {
      type: DataTypes.STRING,
      field: 'ui_offset_rotation_client_side_uuid',
    },
    ui_scale_client_side_uuid: {
      type: DataTypes.STRING,
      field: 'ui_scale_client_side_uuid',
    },
    mesh_client_side_uuid: {
      allowNull: true,
      type: DataTypes.STRING,
      field: 'mesh_client_side_uuid',
    },
    product_client_side_uuid: {
      type: DataTypes.STRING,
      field: 'product_client_side_uuid',
    },
    scene_product_state_name: {
      type: DataTypes.STRING,
      field: 'scene_product_state_name',
    },
  }, {
    sequelize,
    modelName: 'SceneProductDescription',
  });
  return SceneProductDescription;
};
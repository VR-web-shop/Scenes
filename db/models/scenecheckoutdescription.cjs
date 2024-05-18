'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SceneCheckoutDescription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.SceneCheckoutDescription.belongsTo(models.SceneCheckout, {
        foreignKey: 'scene_checkout_client_side_uuid',
      });
      models.SceneCheckoutDescription.belongsTo(models.Scene, {
        foreignKey: 'scene_client_side_uuid',
      });
      models.SceneCheckoutDescription.belongsTo(models.Vector3d, {
        foreignKey: 'position_client_side_uuid',
      });
      models.SceneCheckoutDescription.belongsTo(models.Vector3d, {
        foreignKey: 'rotation_client_side_uuid',
      });
      models.SceneCheckoutDescription.belongsTo(models.Vector3d, {
        foreignKey: 'scale_client_side_uuid',
      });
      models.SceneCheckoutDescription.belongsTo(models.Vector3d, {
        foreignKey: 'surface_offset_client_side_uuid',
      });
      models.SceneCheckoutDescription.belongsTo(models.Vector3d, {
        foreignKey: 'surface_size_client_side_uuid',
      });
      models.SceneCheckoutDescription.belongsTo(models.Vector3d, {
        foreignKey: 'ui_offset_position_client_side_uuid',
      });
      models.SceneCheckoutDescription.belongsTo(models.Vector3d, {
        foreignKey: 'ui_offset_rotation_client_side_uuid',
      });
      models.SceneCheckoutDescription.belongsTo(models.Vector3d, {
        foreignKey: 'ui_scale_client_side_uuid',
      });
      models.SceneCheckoutDescription.belongsTo(models.Mesh, {
        foreignKey: 'mesh_client_side_uuid',
      });
    }
  }
  SceneCheckoutDescription.init({
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
    scene_checkout_client_side_uuid: {
      type: DataTypes.STRING,
      field: 'scene_checkout_client_side_uuid',
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
    surface_offset_client_side_uuid: {
      type: DataTypes.STRING,
      field: 'surface_offset_client_side_uuid',
    },
    surface_size_client_side_uuid: {
      type: DataTypes.STRING,
      field: 'surface_size_client_side_uuid',
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
      type: DataTypes.STRING,
      field: 'mesh_client_side_uuid',
    },
    name:  {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'SceneCheckoutDescription',
  });
  return SceneCheckoutDescription;
};
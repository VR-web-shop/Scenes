'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SceneFloorDescription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.SceneFloorDescription.belongsTo(models.SceneFloor, {
        foreignKey: 'scene_floor_client_side_uuid',
      });
      models.SceneFloorDescription.belongsTo(models.Scene, {
        foreignKey: 'scene_client_side_uuid',
      });
      models.SceneFloorDescription.belongsTo(models.Vector3d, {
        foreignKey: 'position_client_side_uuid',
      });
      models.SceneFloorDescription.belongsTo(models.Vector3d, {
        foreignKey: 'rotation_client_side_uuid',
      });
      models.SceneFloorDescription.belongsTo(models.Vector3d, {
        foreignKey: 'scale_client_side_uuid',
      });
      models.SceneFloorDescription.belongsTo(models.Mesh, {
        foreignKey: 'mesh_client_side_uuid',
      });
    }
  }
  SceneFloorDescription.init({
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
    scene_floor_client_side_uuid: {
      type: DataTypes.STRING,
      field: 'scene_floor_client_side_uuid',
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
    mesh_client_side_uuid: {
      type: DataTypes.STRING,
      field: 'mesh_client_side_uuid',
    },
    name: {
      type: DataTypes.STRING,
      field: 'name',
    },
  }, {
    sequelize,
    modelName: 'SceneFloorDescription',
  });
  return SceneFloorDescription;
};
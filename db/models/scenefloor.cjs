'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SceneFloor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.SceneFloor.hasMany(models.SceneFloorDescription, {
        foreignKey: 'scene_floor_client_side_uuid',
      });
      models.SceneFloor.hasMany(models.SceneFloorRemoved, {
        foreignKey: 'scene_floor_client_side_uuid',
      });
    }
  }
  SceneFloor.init({
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
    modelName: 'SceneFloor',
  });
  return SceneFloor;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SceneProductRemoved extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.SceneProductRemoved.belongsTo(models.SceneProduct, {
        foreignKey: 'scene_product_client_side_uuid',
      });
    }
  }
  SceneProductRemoved.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    deleted_at: {
      type: DataTypes.DATE,
      field: 'deleted_at',
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
  }, {
    sequelize,
    modelName: 'SceneProductRemoved',
  });
  return SceneProductRemoved;
};
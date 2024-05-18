'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SceneProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.SceneProduct.hasMany(models.SceneProductDescription, {
        foreignKey: 'scene_product_client_side_uuid',
      });
      models.SceneProduct.hasMany(models.SceneProductRemoved, {
        foreignKey: 'scene_product_client_side_uuid',
      });
    }
  }
  SceneProduct.init({
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
    modelName: 'SceneProduct',
  });
  return SceneProduct;
};
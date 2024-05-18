'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SceneBasket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.SceneBasket.hasMany(models.SceneBasketDescription, {
        foreignKey: 'scene_basket_client_side_uuid',
      });
      models.SceneBasket.hasMany(models.SceneBasketRemoved, {
        foreignKey: 'scene_basket_client_side_uuid',
      });
    }
  }
  SceneBasket.init({
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
    modelName: 'SceneBasket',
  });
  return SceneBasket;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SceneCheckout extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.SceneCheckout.hasMany(models.SceneCheckoutDescription, {
        foreignKey: 'scene_checkout_client_side_uuid',
      });
      models.SceneCheckout.hasMany(models.SceneCheckoutRemoved, {
        foreignKey: 'scene_checkout_client_side_uuid',
      });
    }
  }
  SceneCheckout.init({
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
    modelName: 'SceneCheckout',
  });
  return SceneCheckout;
};
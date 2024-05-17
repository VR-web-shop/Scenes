'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SceneBasketRemoved extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SceneBasketRemoved.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SceneBasketRemoved',
  });
  return SceneBasketRemoved;
};
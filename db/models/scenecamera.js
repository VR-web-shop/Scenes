'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SceneCamera extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SceneCamera.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SceneCamera',
  });
  return SceneCamera;
};
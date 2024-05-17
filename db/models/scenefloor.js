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
      // define association here
    }
  }
  SceneFloor.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SceneFloor',
  });
  return SceneFloor;
};
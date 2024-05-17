'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SceneCameraDescription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SceneCameraDescription.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SceneCameraDescription',
  });
  return SceneCameraDescription;
};
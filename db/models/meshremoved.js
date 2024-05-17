'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MeshRemoved extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MeshRemoved.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'MeshRemoved',
  });
  return MeshRemoved;
};
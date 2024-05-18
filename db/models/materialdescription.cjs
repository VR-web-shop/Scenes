'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MaterialDescription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MaterialDescription.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
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
    material_client_side_uuid: {
      type: DataTypes.STRING,
      field: 'material_client_side_uuid',
    },
    material_type_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name:  { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
  }, {
    sequelize,
    modelName: 'MaterialDescription',
  });
  return MaterialDescription;
};
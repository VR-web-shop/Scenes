'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductDescription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProductDescription.init({
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
    product_client_side_uuid: {
      type: DataTypes.STRING,
      field: 'product_client_side_uuid',
    },
    distributed_transaction_transaction_uuid: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name:  { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    description:  { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    thumbnail_source: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    price: { 
      type: DataTypes.FLOAT, 
      allowNull: false 
    },
  }, {
    sequelize,
    modelName: 'ProductDescription',
  });
  return ProductDescription;
};
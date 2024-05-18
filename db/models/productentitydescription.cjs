'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductEntityDescription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.ProductEntityDescription.belongsTo(models.DistributedTransaction, {
        foreignKey: 'distributed_transaction_transaction_uuid',
      });
      models.ProductEntityDescription.belongsTo(models.ProductEntity, {
        foreignKey: 'product_entity_client_side_uuid',
      });
    }
  }
  ProductEntityDescription.init({
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
    product_entity_client_side_uuid: {
      type: DataTypes.STRING,
      field: 'product_entity_client_side_uuid',
    },
    product_entity_state_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product_client_side_uuid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    distributed_transaction_transaction_uuid: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'ProductEntityDescription',
  });
  return ProductEntityDescription;
};
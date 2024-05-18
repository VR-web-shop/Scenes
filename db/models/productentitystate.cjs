'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductEntityState extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.ProductEntityState.hasMany(models.ProductEntityDescription, {
        foreignKey: 'product_entity_state_name',
      });
    }
  }
  ProductEntityState.init({
    name: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'created_at',
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'created_at',
    }
  }, {
    sequelize,
    modelName: 'ProductEntityState',
  });
  return ProductEntityState;
};
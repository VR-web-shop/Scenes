'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Material extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Material.hasMany(models.MaterialDescription, {
        foreignKey: 'material_client_side_uuid',
      });
      models.Material.hasMany(models.MaterialRemoved, {
        foreignKey: 'material_client_side_uuid',
      });
      models.Material.hasMany(models.MaterialTexture, {
        foreignKey: 'material_client_side_uuid',
      });
      models.Material.hasMany(models.MeshMaterialDescription, {
        foreignKey: 'material_client_side_uuid',
      });
    }
  }
  Material.init({
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
    modelName: 'Material',
  });
  return Material;
};
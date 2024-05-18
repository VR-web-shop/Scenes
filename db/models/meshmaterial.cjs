'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MeshMaterial extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.MeshMaterial.hasMany(models.MeshMaterialDescription, {
        foreignKey: 'mesh_material_client_side_uuid',
      });
      models.MeshMaterial.hasMany(models.MeshMaterialRemoved, {
        foreignKey: 'mesh_material_client_side_uuid',
      });
    }
  }
  MeshMaterial.init({
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
    modelName: 'MeshMaterial',
  });
  return MeshMaterial;
};
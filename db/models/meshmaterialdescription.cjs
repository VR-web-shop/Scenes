'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MeshMaterialDescription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.MeshMaterialDescription.belongsTo(models.MeshMaterial, {
        foreignKey: 'mesh_material_client_side_uuid',
      });
      models.MeshMaterialDescription.belongsTo(models.Mesh, {
        foreignKey: 'mesh_client_side_uuid',
      });
      models.MeshMaterialDescription.belongsTo(models.Material, {
        foreignKey: 'material_client_side_uuid',
      });
    }
  }
  MeshMaterialDescription.init({
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
    mesh_material_client_side_uuid: {
      type: DataTypes.STRING,
      field: 'mesh_material_client_side_uuid',
    },
    mesh_client_side_uuid: {
      type: DataTypes.STRING,
      field: 'mesh_client_side_uuid',
    },
    material_client_side_uuid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    submesh_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'MeshMaterialDescription',
  });
  return MeshMaterialDescription;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mesh extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Mesh.hasMany(models.MeshDescription, {
        foreignKey: 'mesh_client_side_uuid',
      });
      models.Mesh.hasMany(models.MeshRemoved, {
        foreignKey: 'mesh_client_side_uuid',
      });
      models.Mesh.hasMany(models.MeshMaterialDescription, {
        foreignKey: 'mesh_client_side_uuid',
      });

      models.Mesh.hasMany(models.SceneBasketDescription, {
        foreignKey: 'object_client_side_uuid',
      });
      models.Mesh.hasMany(models.SceneBasketDescription, {
        foreignKey: 'placeholder_client_side_uuid',
      });
      models.Mesh.hasMany(models.SceneBasketDescription, {
        foreignKey: 'pocket_client_side_uuid',
      });

      models.Mesh.hasMany(models.SceneCheckoutDescription, {
        foreignKey: 'mesh_client_side_uuid',
      });

      models.Mesh.hasMany(models.SceneFloorDescription, {
        foreignKey: 'mesh_client_side_uuid',
      });

      models.Mesh.hasMany(models.SceneProductDescription, {
        foreignKey: 'mesh_client_side_uuid',
      });

      models.Mesh.hasMany(models.SceneStaticObjectDescription, {
        foreignKey: 'mesh_client_side_uuid',
      });
    }
  }
  Mesh.init({
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
    modelName: 'Mesh',
  });
  return Mesh;
};
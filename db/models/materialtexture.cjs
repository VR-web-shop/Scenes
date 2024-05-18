'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MaterialTexture extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.MaterialTexture.belongsTo(models.Material, {
        foreignKey: 'material_client_side_uuid',
      });
      models.MaterialTexture.belongsTo(models.Texture, {
        foreignKey: 'texture_client_side_uuid',
      });
    }
  }
  MaterialTexture.init({
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
    material_client_side_uuid: {
      type: DataTypes.STRING,
      field: 'material_client_side_uuid',
    },
    texture_client_side_uuid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'MaterialTexture',
  });
  return MaterialTexture;
};
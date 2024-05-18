'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Texture extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Texture.hasMany(models.TextureDescription, {
        foreignKey: 'texture_client_side_uuid',
      });
      models.Texture.hasMany(models.TextureRemoved, {
        foreignKey: 'texture_client_side_uuid',
      });
      models.Texture.hasMany(models.MaterialTexture, {
        foreignKey: 'texture_client_side_uuid',
      });
    }
  }
  Texture.init({
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
    modelName: 'Texture',
  });
  return Texture;
};
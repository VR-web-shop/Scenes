'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TextureRemoved extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.TextureRemoved.belongsTo(models.Texture, {
        foreignKey: 'texture_client_side_uuid',
      });
    }
  }
  TextureRemoved.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    deleted_at: {
      type: DataTypes.DATE,
      field: 'deleted_at',
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
    texture_client_side_uuid: {
      type: DataTypes.STRING,
      field: 'texture_client_side_uuid',
    },
  }, {
    sequelize,
    modelName: 'TextureRemoved',
  });
  return TextureRemoved;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SceneCharacter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.SceneCharacter.hasMany(models.SceneCharacterDescription, {
        foreignKey: 'scene_character_client_side_uuid',
      });
      models.SceneCharacter.hasMany(models.SceneCharacterRemoved, {
        foreignKey: 'scene_character_client_side_uuid',
      });
    }
  }
  SceneCharacter.init({
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
    modelName: 'SceneCharacter',
  });
  return SceneCharacter;
};
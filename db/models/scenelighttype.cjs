'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SceneLightType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.SceneLightType.hasMany(models.SceneLightDescription, {
        foreignKey: 'scene_light_type_name',
      });
    }
  }
  SceneLightType.init({
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
    modelName: 'SceneLightType',
  });
  return SceneLightType;
};
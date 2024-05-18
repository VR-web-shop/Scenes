'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SceneStaticObject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.SceneStaticObject.hasMany(models.SceneStaticObjectDescription, {
        foreignKey: 'scene_static_object_client_side_uuid',
      });
      models.SceneStaticObject.hasMany(models.SceneStaticObjectRemoved, {
        foreignKey: 'scene_static_object_client_side_uuid',
      });
    }
  }
  SceneStaticObject.init({
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
    modelName: 'SceneStaticObject',
  });
  return SceneStaticObject;
};
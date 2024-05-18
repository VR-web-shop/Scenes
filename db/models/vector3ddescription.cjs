'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vector3dDescription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Vector3dDescription.belongsTo(models.Vector3d, {
        foreignKey: 'vector3d_client_side_uuid',
      });
    }
  }
  Vector3dDescription.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    x: {
      allowNull: false,
      type: DataTypes.FLOAT,
      field: 'x',
      defaultValue: 0
    },
    y: {
      allowNull: false,
      type: DataTypes.FLOAT,
      field: 'y',
      defaultValue: 0
    },
    z: {
      allowNull: false,
      type: DataTypes.FLOAT,
      field: 'z',
      defaultValue: 0
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
    vector3d_client_side_uuid: {
      type: DataTypes.STRING,
      field: 'vector3d_client_side_uuid',
    },
  }, {
    sequelize,
    modelName: 'Vector3dDescription',
  });
  return Vector3dDescription;
};
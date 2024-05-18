'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vector3D extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Vector3d.hasMany(models.Vector3dDescription, {
        foreignKey: 'vector3d_client_side_uuid',
      });
      models.Vector3d.hasMany(models.Vector3dRemoved, {
        foreignKey: 'vector3d_client_side_uuid',
      });

      models.Vector3d.hasMany(models.SceneBasketDescription, {
        foreignKey: 'position_client_side_uuid',
      });
      models.Vector3d.hasMany(models.SceneBasketDescription, {
        foreignKey: 'rotation_client_side_uuid',
      });
      models.Vector3d.hasMany(models.SceneBasketDescription, {
        foreignKey: 'scale_client_side_uuid',
      });
      models.Vector3d.hasMany(models.SceneBasketDescription, {
        foreignKey: 'object_offset_client_side_uuid',
      });
      models.Vector3d.hasMany(models.SceneBasketDescription, {
        foreignKey: 'insert_area_offset_client_side_uuid',
      });
      models.Vector3d.hasMany(models.SceneBasketDescription, {
        foreignKey: 'insert_area_size_client_side_uuid',
      });

      models.Vector3d.hasMany(models.SceneCameraDescription, {
        foreignKey: 'position_client_side_uuid',
      });
      models.Vector3d.hasMany(models.SceneCameraDescription, {
        foreignKey: 'rotation_client_side_uuid',
      });

      models.Vector3d.hasMany(models.SceneCharacterDescription, {
        foreignKey: 'position_client_side_uuid',
      });
      models.Vector3d.hasMany(models.SceneCharacterDescription, {
        foreignKey: 'rotation_client_side_uuid',
      });

      models.Vector3d.hasMany(models.SceneCheckoutDescription, {
        foreignKey: 'position_client_side_uuid',
      });
      models.Vector3d.hasMany(models.SceneCheckoutDescription, {
        foreignKey: 'rotation_client_side_uuid',
      });
      models.Vector3d.hasMany(models.SceneCheckoutDescription, {
        foreignKey: 'scale_client_side_uuid',
      });
      models.Vector3d.hasMany(models.SceneCheckoutDescription, {
        foreignKey: 'surface_offset_client_side_uuid',
      });
      models.Vector3d.hasMany(models.SceneCheckoutDescription, {
        foreignKey: 'surface_size_client_side_uuid',
      });
      models.Vector3d.hasMany(models.SceneCheckoutDescription, {
        foreignKey: 'ui_offset_position_client_side_uuid',
      });
      models.Vector3d.hasMany(models.SceneCheckoutDescription, {
        foreignKey: 'ui_offset_rotation_client_side_uuid',
      });
      models.Vector3d.hasMany(models.SceneCheckoutDescription, {
        foreignKey: 'ui_scale_client_side_uuid',
      });

      models.Vector3d.hasMany(models.SceneFloorDescription, {
        foreignKey: 'position_client_side_uuid',
      });
      models.Vector3d.hasMany(models.SceneFloorDescription, {
        foreignKey: 'rotation_client_side_uuid',
      });
      models.Vector3d.hasMany(models.SceneFloorDescription, {
        foreignKey: 'scale_client_side_uuid',
      });

      models.Vector3d.hasMany(models.SceneProductDescription, {
        foreignKey: 'position_client_side_uuid',
      });
      models.Vector3d.hasMany(models.SceneProductDescription, {
        foreignKey: 'rotation_client_side_uuid',
      });
      models.Vector3d.hasMany(models.SceneProductDescription, {
        foreignKey: 'scale_client_side_uuid',
      });
      models.Vector3d.hasMany(models.SceneProductDescription, {
        foreignKey: 'ui_offset_position_client_side_uuid',
      });
      models.Vector3d.hasMany(models.SceneProductDescription, {
        foreignKey: 'ui_offset_rotation_client_side_uuid',
      });
      models.Vector3d.hasMany(models.SceneProductDescription, {
        foreignKey: 'ui_scale_client_side_uuid',
      });

      models.Vector3d.hasMany(models.SceneStaticObjectDescription, {
        foreignKey: 'position_client_side_uuid',
      });
      models.Vector3d.hasMany(models.SceneStaticObjectDescription, {
        foreignKey: 'rotation_client_side_uuid',
      });
      models.Vector3d.hasMany(models.SceneStaticObjectDescription, {
        foreignKey: 'scale_client_side_uuid',
      });
    }
  }
  Vector3D.init({
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
    modelName: 'Vector3d',
  });
  return Vector3D;
};
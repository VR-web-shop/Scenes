'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SceneStaticObjectDescriptions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at',
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updated_at',
        defaultValue: Sequelize.fn('now')
      },
      scene_static_object_client_side_uuid: {
        type: Sequelize.STRING,
        field: 'scene_static_object_client_side_uuid',
        references: {
          model: 'SceneStaticObjects',
          key: 'client_side_uuid'
        },
      },
      scene_client_side_uuid: {
        type: Sequelize.STRING,
        field: 'scene_client_side_uuid',
        references: {
          model: 'Scenes',
          key: 'client_side_uuid'
        },
      },
      position_client_side_uuid: {
        type: Sequelize.STRING,
        field: 'position_client_side_uuid',
        references: {
          model: 'Vector3ds',
          key: 'client_side_uuid'
        },
      },
      rotation_client_side_uuid: {
        type: Sequelize.STRING,
        field: 'rotation_client_side_uuid',
        references: {
          model: 'Vector3ds',
          key: 'client_side_uuid'
        },
      },
      scale_client_side_uuid: {
        type: Sequelize.STRING,
        field: 'scale_client_side_uuid',
        references: {
          model: 'Vector3ds',
          key: 'client_side_uuid'
        },
      },
      mesh_client_side_uuid: {
        type: Sequelize.STRING,
        field: 'mesh_client_side_uuid',
        references: {
          model: 'Meshes',
          key: 'client_side_uuid'
        },
      },
      name:  {
        type: Sequelize.STRING,
        allowNull: false
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('SceneStaticObjectDescriptions');
  }
};

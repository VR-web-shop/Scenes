'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SceneStaticObjectRemoveds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      deleted_at: {
        type: Sequelize.DATE,
        field: 'deleted_at',
        defaultValue: Sequelize.fn('now')
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('SceneStaticObjectRemoveds');
  }
};
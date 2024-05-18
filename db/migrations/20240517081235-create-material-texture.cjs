'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MaterialTextures', {
      client_side_uuid: {
        type: Sequelize.STRING,
        field: 'client_side_uuid',
        primaryKey: true
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
      material_client_side_uuid: {
        type: Sequelize.STRING,
        field: 'material_client_side_uuid',
        references: {
          model: 'Materials',
          key: 'client_side_uuid'
        },
      },
      texture_client_side_uuid: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Textures',
          key: 'client_side_uuid'
        },
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('MaterialTextures');
  }
};
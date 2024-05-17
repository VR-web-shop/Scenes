'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TextureDescriptions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'name',
      },
      source: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'source',
      },
      texture_type_name: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'texture_type_name',
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
      texture_client_side_uuid: {
        type: Sequelize.STRING,
        field: 'texture_client_side_uuid',
        references: {
          model: 'Textures',
          key: 'client_side_uuid'
        },
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('TextureDescriptions');
  }
};

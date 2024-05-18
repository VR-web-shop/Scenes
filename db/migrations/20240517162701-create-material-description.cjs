'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MaterialDescriptions', {
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
      material_client_side_uuid: {
        type: Sequelize.STRING,
        field: 'material_client_side_uuid',
        references: {
          model: 'Materials',
          key: 'client_side_uuid'
        },
      },
      material_type_name: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'MaterialTypes',
          key: 'name'
        },
      },
      name:  { 
        type: Sequelize.STRING, 
        allowNull: false 
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('MaterialDescriptions');
  }
};

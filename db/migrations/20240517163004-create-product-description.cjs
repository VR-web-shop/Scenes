'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProductDescriptions', {
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
      product_client_side_uuid: {
        type: Sequelize.STRING,
        field: 'product_client_side_uuid',
        references: {
          model: 'Products',
          key: 'client_side_uuid'
        },
      },
      distributed_transaction_transaction_uuid: {
        type: Sequelize.STRING,
        allowNull: true,
        references: {
          model: 'DistributedTransactions',
          key: 'transaction_uuid'
        }
      },
      name:  { 
        type: Sequelize.STRING, 
        allowNull: false 
      },
      description:  { 
        type: Sequelize.STRING, 
        allowNull: false 
      },
      thumbnail_source: { 
        type: Sequelize.STRING, 
        allowNull: false 
      },
      price: { 
        type: Sequelize.FLOAT, 
        allowNull: false 
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ProductDescriptions');
  }
};
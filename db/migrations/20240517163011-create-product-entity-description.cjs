'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProductEntityDescriptions', {
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
      product_entity_client_side_uuid: {
        type: Sequelize.STRING,
        field: 'product_entity_client_side_uuid',
        references: {
          model: 'ProductEntities',
          key: 'client_side_uuid'
        },
      },
      product_entity_state_name: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'ProductEntityStates',
          key: 'name'
        },
      },
      product_client_side_uuid: {
        type: Sequelize.STRING,
        allowNull: false,
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ProductEntityDescriptions');
  }
};
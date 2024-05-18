'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Vector3dDescriptions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      x: {
        allowNull: false,
        type: Sequelize.FLOAT,
        field: 'x',
        defaultValue: 0
      },
      y: {
        allowNull: false,
        type: Sequelize.FLOAT,
        field: 'y',
        defaultValue: 0
      },
      z: {
        allowNull: false,
        type: Sequelize.FLOAT,
        field: 'z',
        defaultValue: 0
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
      vector3d_client_side_uuid: {
        type: Sequelize.STRING,
        field: 'vector3d_client_side_uuid',
        references: {
          model: 'Vector3ds',
          key: 'client_side_uuid'
        },
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Vector3dDescriptions');
  }
};
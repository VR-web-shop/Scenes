'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MeshMaterialDescriptions', {
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
      mesh_material_client_side_uuid: {
        type: Sequelize.STRING,
        field: 'mesh_material_client_side_uuid',
        references: {
          model: 'MeshMaterials',
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
      material_client_side_uuid: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Materials',
          key: 'client_side_uuid'
        },
      },
      submesh_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('MeshMaterialDescriptions');
  }
};

'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SceneProductDescriptions', {
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
      scene_product_client_side_uuid: {
        type: Sequelize.STRING,
        field: 'scene_product_client_side_uuid',
        references: {
          model: 'SceneProducts',
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
      ui_offset_position_client_side_uuid: {
        type: Sequelize.STRING,
        field: 'ui_offset_position_client_side_uuid',
        references: {
          model: 'Vector3ds',
          key: 'client_side_uuid'
        },
      },
      ui_offset_rotation_client_side_uuid: {
        type: Sequelize.STRING,
        field: 'ui_offset_rotation_client_side_uuid',
        references: {
          model: 'Vector3ds',
          key: 'client_side_uuid'
        },
      },
      ui_scale_client_side_uuid: {
        type: Sequelize.STRING,
        field: 'ui_scale_client_side_uuid',
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
      product_client_side_uuid: {
        type: Sequelize.STRING,
        field: 'product_client_side_uuid',
        references: {
          model: 'Products',
          key: 'client_side_uuid'
        },
      },
      scene_product_state_name: {
        type: Sequelize.STRING,
        field: 'scene_product_state_name',
        references: {
          model: 'SceneProductStates',
          key: 'name'
        },
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('SceneProductDescriptions');
  }
};

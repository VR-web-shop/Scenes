'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SceneBasketDescriptions', {
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
      scene_basket_client_side_uuid: {
        type: Sequelize.STRING,
        field: 'scene_basket_client_side_uuid',
        references: {
          model: 'SceneBaskets',
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
      object_offset_client_side_uuid: {
        type: Sequelize.STRING,
        field: 'object_offset_client_side_uuid',
        references: {
          model: 'Vector3ds',
          key: 'client_side_uuid'
        },
      },
      placeholder_offset_client_side_uuid: {
        type: Sequelize.STRING,
        field: 'placeholder_offset_client_side_uuid',
        references: {
          model: 'Vector3ds',
          key: 'client_side_uuid'
        },
      },
      pocket_offset_client_side_uuid: {
        type: Sequelize.STRING,
        field: 'pocket_offset_client_side_uuid',
        references: {
          model: 'Vector3ds',
          key: 'client_side_uuid'
        },
      },      
      insert_area_offset_client_side_uuid: {
        type: Sequelize.STRING,
        field: 'insert_area_offset_client_side_uuid',
        references: {
          model: 'Vector3ds',
          key: 'client_side_uuid'
        },
      },
      insert_area_size_client_side_uuid: {
        type: Sequelize.STRING,
        field: 'insert_area_size_client_side_uuid',
        references: {
          model: 'Vector3ds',
          key: 'client_side_uuid'
        },
      },
      object_client_side_uuid: {
        type: Sequelize.STRING,
        field: 'object_client_side_uuid',
        references: {
          model: 'Meshes',
          key: 'client_side_uuid'
        },
      },
      placeholder_client_side_uuid: {
        type: Sequelize.STRING,
        field: 'placeholder_client_side_uuid',
        references: {
          model: 'Meshes',
          key: 'client_side_uuid'
        },
      },
      pocket_client_side_uuid: {
        type: Sequelize.STRING,
        field: 'pocket_client_side_uuid',
        references: {
          model: 'Meshes',
          key: 'client_side_uuid'
        },
      },
      scene_basket_state_name: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'SceneBasketStates',
          key: 'name'
        },
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('SceneBasketDescriptions');
  }
};

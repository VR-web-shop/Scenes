'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SceneLightDescriptions', {
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
      scene_light_client_side_uuid: {
        type: Sequelize.STRING,
        field: 'scene_light_client_side_uuid',
        references: {
          model: 'SceneLights',
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
      scene_light_type_name: {
        type: Sequelize.STRING,
        field: 'scene_light_type_name',
        references: {
          model: 'SceneLightTypes',
          key: 'name'
        },
      },
      intensity: {
        type: Sequelize.FLOAT,
        field: 'intensity',
      },
      hexColor: {
        type: Sequelize.STRING,
        field: 'hex_color',
      },
      name: {
        type: Sequelize.STRING,
        field: 'name',
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('SceneLightDescriptions');
  }
};

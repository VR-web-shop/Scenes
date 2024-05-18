'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const demoScene = require('../../data/demo_scene.json');
    await queryInterface.bulkInsert('SceneBackgrounds', [{
      client_side_uuid: demoScene.client_side_uuid
    }], {});
    await queryInterface.bulkInsert('SceneBackgroundDescriptions', [{
      scene_background_client_side_uuid: demoScene.client_side_uuid,
      scene_client_side_uuid: demoScene.client_side_uuid,
      hex: demoScene.background.hex,
    }], {});
  },
 
  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('SceneBackgroundDescriptions', null, {});
    await queryInterface.bulkDelete('SceneBackgrounds', null, {});
  }
};

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
    await queryInterface.bulkInsert('Scenes', [{
      client_side_uuid: demoScene.client_side_uuid
    }], {});
    await queryInterface.bulkInsert('SceneDescriptions', [{
      scene_client_side_uuid: demoScene.client_side_uuid,
      name: demoScene.name,
      active: true,
    }], {});
  },
 
  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('SceneDescriptions', null, {});
    await queryInterface.bulkDelete('Scenes', null, {});
  }
};

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
    const v4 = require('uuid').v4;
    const demoScene = require('../../data/demo_scene.json');

    const position_client_side_uuid = v4();
    const rotation_client_side_uuid = v4();
    const scale_client_side_uuid = v4();

    await queryInterface.bulkInsert('Vector3ds', [
      { client_side_uuid: position_client_side_uuid },
      { client_side_uuid: rotation_client_side_uuid },
    ], {});

    await queryInterface.bulkInsert('Vector3dDescriptions', [
      { 
        vector3d_client_side_uuid: position_client_side_uuid,
        x: demoScene.character.position.x,
        y: demoScene.character.position.y,
        z: demoScene.character.position.z, 
      },
      { 
        vector3d_client_side_uuid: rotation_client_side_uuid,
        x: demoScene.character.rotation.x,
        y: demoScene.character.rotation.y,
        z: demoScene.character.rotation.z, 
      },
    ], {});
    
    await queryInterface.bulkInsert('SceneCharacters', [{
      client_side_uuid: demoScene.client_side_uuid
    }], {});

    await queryInterface.bulkInsert('SceneCharacterDescriptions', [{
      scene_character_client_side_uuid: demoScene.client_side_uuid,
      scene_client_side_uuid: demoScene.client_side_uuid,
      position_client_side_uuid,
      rotation_client_side_uuid,
    }], {});
  },
 
  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('SceneCharacterDescriptions', null, {});
    await queryInterface.bulkDelete('SceneCharacters', null, {});
  }
};

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

    await queryInterface.bulkInsert('Vector3ds', [
      { client_side_uuid: position_client_side_uuid },
      { client_side_uuid: rotation_client_side_uuid },
    ], {});

    await queryInterface.bulkInsert('Vector3dDescriptions', [
      { 
        vector3d_client_side_uuid: position_client_side_uuid,
        x: demoScene.camera.position.x,
        y: demoScene.camera.position.y,
        z: demoScene.camera.position.z, 
      },
      { 
        vector3d_client_side_uuid: rotation_client_side_uuid,
        x: demoScene.camera.rotation.x,
        y: demoScene.camera.rotation.y,
        z: demoScene.camera.rotation.z, 
      },
    ], {});
    
    await queryInterface.bulkInsert('SceneCameras', [{
      client_side_uuid: demoScene.client_side_uuid
    }], {});

    await queryInterface.bulkInsert('SceneCameraDescriptions', [{
      scene_camera_client_side_uuid: demoScene.client_side_uuid,
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
    await queryInterface.bulkDelete('SceneCameraDescriptions', null, {});
    await queryInterface.bulkDelete('SceneCameras', null, {});
  }
};

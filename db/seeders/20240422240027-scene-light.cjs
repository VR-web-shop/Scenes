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

    const params = demoScene.lights.map(light => {
      const position_client_side_uuid = v4();
      const rotation_client_side_uuid = v4();

      return {
        position_client_side_uuid,
        rotation_client_side_uuid,
        light,
      };
    });
    
    const vector3ds = params.map(param => [
      { client_side_uuid: param.position_client_side_uuid },
      { client_side_uuid: param.rotation_client_side_uuid },
    ]).flat();

    const vector3dDescriptions = params.map(param => [
      { 
        vector3d_client_side_uuid: param.position_client_side_uuid,
        x: param.light.position.x,
        y: param.light.position.y,
        z: param.light.position.z, 
      },
      { 
        vector3d_client_side_uuid: param.rotation_client_side_uuid,
        x: param.light.rotation.x,
        y: param.light.rotation.y,
        z: param.light.rotation.z, 
      },
    ]).flat();

    const sceneLights = params.map(param => ({
      client_side_uuid: v4()
    }));

    const sceneLightDescriptions = params.map((param, index) => ({
      scene_light_client_side_uuid: sceneLights[index].client_side_uuid,
      scene_client_side_uuid: demoScene.client_side_uuid,
      position_client_side_uuid: param.position_client_side_uuid,
      rotation_client_side_uuid: param.rotation_client_side_uuid,
      scene_light_type_name: param.light.scene_light_type_name,
      intensity: param.light.intensity,
      hex_color: param.light.hexColor,
      name: param.light.name,
    }));

    await queryInterface.bulkInsert('Vector3ds', vector3ds, {});
    await queryInterface.bulkInsert('Vector3dDescriptions', vector3dDescriptions, {});
    await queryInterface.bulkInsert('SceneLights', sceneLights, {});
    await queryInterface.bulkInsert('SceneLightDescriptions', sceneLightDescriptions, {});
  },
 
  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('SceneLightDescriptions', null, {});
    await queryInterface.bulkDelete('SceneLights', null, {});
  }
};

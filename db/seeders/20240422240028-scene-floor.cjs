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

    const params = demoScene.floors.map(floor => {
      const position_client_side_uuid = v4();
      const rotation_client_side_uuid = v4();
      const scale_client_side_uuid = v4();
      const mesh_client_side_uuid = demoScene.meshes.find(mesh => {
        return mesh.name === floor.mesh_name
      }).client_side_uuid;

      return {
        position_client_side_uuid,
        rotation_client_side_uuid,
        scale_client_side_uuid,
        mesh_client_side_uuid,
        floor,
      };
    });
    
    const vector3ds = params.map(param => [
      { client_side_uuid: param.position_client_side_uuid },
      { client_side_uuid: param.rotation_client_side_uuid },
      { client_side_uuid: param.scale_client_side_uuid },
    ]).flat();

    const vector3dDescriptions = params.map(param => [
      { 
        vector3d_client_side_uuid: param.position_client_side_uuid,
        x: param.floor.position.x,
        y: param.floor.position.y,
        z: param.floor.position.z, 
      },
      { 
        vector3d_client_side_uuid: param.rotation_client_side_uuid,
        x: param.floor.rotation.x,
        y: param.floor.rotation.y,
        z: param.floor.rotation.z, 
      },
      { 
        vector3d_client_side_uuid: param.scale_client_side_uuid,
        x: param.floor.scale.x,
        y: param.floor.scale.y,
        z: param.floor.scale.z, 
      },
    ]).flat();

    const sceneFloors = params.map(param => ({
      client_side_uuid: v4()
    }));

    const sceneFloorDescriptions = params.map((param, index) => ({
      scene_floor_client_side_uuid: sceneFloors[index].client_side_uuid,
      scene_client_side_uuid: demoScene.client_side_uuid,
      position_client_side_uuid: param.position_client_side_uuid,
      rotation_client_side_uuid: param.rotation_client_side_uuid,
      scale_client_side_uuid: param.scale_client_side_uuid,
      mesh_client_side_uuid: param.mesh_client_side_uuid,
      name: param.floor.name,
    }));

    await queryInterface.bulkInsert('Vector3ds', vector3ds, {});
    await queryInterface.bulkInsert('Vector3dDescriptions', vector3dDescriptions, {});
    await queryInterface.bulkInsert('SceneFloors', sceneFloors, {});
    await queryInterface.bulkInsert('SceneFloorDescriptions', sceneFloorDescriptions, {});
  },
 
  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('SceneFloorDescriptions', null, {});
    await queryInterface.bulkDelete('SceneFloors', null, {});
  }
};

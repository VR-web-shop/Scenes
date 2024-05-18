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

    const params = demoScene.static_objects.map(staticObject => {
      const position_client_side_uuid = v4();
      const rotation_client_side_uuid = v4();
      const scale_client_side_uuid = v4();

      const mesh_client_side_uuid = demoScene.meshes.find(mesh => {
        return mesh.name === staticObject.mesh_name
      }).client_side_uuid;

      return {
        position_client_side_uuid,
        rotation_client_side_uuid,
        scale_client_side_uuid,
        mesh_client_side_uuid,
        staticObject,
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
        x: param.staticObject.position.x,
        y: param.staticObject.position.y,
        z: param.staticObject.position.z, 
      },
      { 
        vector3d_client_side_uuid: param.rotation_client_side_uuid,
        x: param.staticObject.rotation.x,
        y: param.staticObject.rotation.y,
        z: param.staticObject.rotation.z, 
      },
      { 
        vector3d_client_side_uuid: param.scale_client_side_uuid,
        x: param.staticObject.scale.x,
        y: param.staticObject.scale.y,
        z: param.staticObject.scale.z, 
      },
    ]).flat();

    const sceneStaticObjects = params.map(param => ({
      client_side_uuid: v4()
    }));

    const sceneStaticObjectDescriptions = params.map((param, index) => ({
      scene_static_object_client_side_uuid: sceneStaticObjects[index].client_side_uuid,
      scene_client_side_uuid: demoScene.client_side_uuid,
      position_client_side_uuid: param.position_client_side_uuid,
      rotation_client_side_uuid: param.rotation_client_side_uuid,
      scale_client_side_uuid: param.scale_client_side_uuid,
      mesh_client_side_uuid: param.mesh_client_side_uuid,
      name: param.staticObject.name,
    }));

    await queryInterface.bulkInsert('Vector3ds', vector3ds, {});
    await queryInterface.bulkInsert('Vector3dDescriptions', vector3dDescriptions, {});
    await queryInterface.bulkInsert('SceneStaticObjects', sceneStaticObjects, {});
    await queryInterface.bulkInsert('SceneStaticObjectDescriptions', sceneStaticObjectDescriptions, {});
  },
 
  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('SceneStaticObjectDescriptions', null, {});
    await queryInterface.bulkDelete('SceneStaticObjects', null, {});
  }
};

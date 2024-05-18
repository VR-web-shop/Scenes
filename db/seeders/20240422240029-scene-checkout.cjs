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

    const params = demoScene.checkouts.map(checkout => {
      const position_client_side_uuid = v4();
      const rotation_client_side_uuid = v4();
      const scale_client_side_uuid = v4();
      const surface_offset_client_side_uuid = v4();
      const surface_size_client_side_uuid = v4();
      const ui_offset_position_client_side_uuid = v4();
      const ui_offset_rotation_client_side_uuid = v4();
      const ui_scale_client_side_uuid = v4();

      const mesh_client_side_uuid = demoScene.meshes.find(mesh => {
        return mesh.name === checkout.mesh_name
      }).client_side_uuid;

      return {
        position_client_side_uuid,
        rotation_client_side_uuid,
        scale_client_side_uuid,
        surface_offset_client_side_uuid,
        surface_size_client_side_uuid,
        ui_offset_position_client_side_uuid,
        ui_offset_rotation_client_side_uuid,
        ui_scale_client_side_uuid,
        mesh_client_side_uuid,
        checkout,
      };
    });
    
    const vector3ds = params.map(param => [
      { client_side_uuid: param.position_client_side_uuid },
      { client_side_uuid: param.rotation_client_side_uuid },
      { client_side_uuid: param.scale_client_side_uuid },
      { client_side_uuid: param.surface_offset_client_side_uuid },
      { client_side_uuid: param.surface_size_client_side_uuid },
      { client_side_uuid: param.ui_offset_position_client_side_uuid },
      { client_side_uuid: param.ui_offset_rotation_client_side_uuid },
      { client_side_uuid: param.ui_scale_client_side_uuid },
    ]).flat();

    const vector3dDescriptions = params.map(param => [
      { 
        vector3d_client_side_uuid: param.position_client_side_uuid,
        x: param.checkout.position.x,
        y: param.checkout.position.y,
        z: param.checkout.position.z, 
      },
      { 
        vector3d_client_side_uuid: param.rotation_client_side_uuid,
        x: param.checkout.rotation.x,
        y: param.checkout.rotation.y,
        z: param.checkout.rotation.z, 
      },
      { 
        vector3d_client_side_uuid: param.scale_client_side_uuid,
        x: param.checkout.scale.x,
        y: param.checkout.scale.y,
        z: param.checkout.scale.z, 
      },
      { 
        vector3d_client_side_uuid: param.surface_offset_client_side_uuid,
        x: param.checkout.surface_offset.x,
        y: param.checkout.surface_offset.y,
        z: param.checkout.surface_offset.z, 
      },
      { 
        vector3d_client_side_uuid: param.surface_size_client_side_uuid,
        x: param.checkout.surface_size.x,
        y: param.checkout.surface_size.y,
        z: param.checkout.surface_size.z, 
      },
      { 
        vector3d_client_side_uuid: param.ui_offset_position_client_side_uuid,
        x: param.checkout.ui_offset_position.x,
        y: param.checkout.ui_offset_position.y,
        z: param.checkout.ui_offset_position.z, 
      },
      { 
        vector3d_client_side_uuid: param.ui_offset_rotation_client_side_uuid,
        x: param.checkout.ui_offset_rotation.x,
        y: param.checkout.ui_offset_rotation.y,
        z: param.checkout.ui_offset_rotation.z, 
      },
      { 
        vector3d_client_side_uuid: param.ui_scale_client_side_uuid,
        x: param.checkout.ui_offset_scale.x,
        y: param.checkout.ui_offset_scale.y,
        z: param.checkout.ui_offset_scale.z, 
      },
    ]).flat();

    const sceneCheckouts = params.map(param => ({
      client_side_uuid: v4()
    }));

    const sceneCheckoutDescriptions = params.map((param, index) => ({
      scene_checkout_client_side_uuid: sceneCheckouts[index].client_side_uuid,
      scene_client_side_uuid: demoScene.client_side_uuid,
      position_client_side_uuid: param.position_client_side_uuid,
      rotation_client_side_uuid: param.rotation_client_side_uuid,
      scale_client_side_uuid: param.scale_client_side_uuid,
      surface_offset_client_side_uuid: param.surface_offset_client_side_uuid,
      surface_size_client_side_uuid: param.surface_size_client_side_uuid,
      ui_offset_position_client_side_uuid: param.ui_offset_position_client_side_uuid,
      ui_offset_rotation_client_side_uuid: param.ui_offset_rotation_client_side_uuid,
      ui_scale_client_side_uuid: param.ui_scale_client_side_uuid,
      mesh_client_side_uuid: param.mesh_client_side_uuid,
      name: param.checkout.name,
    }));

    await queryInterface.bulkInsert('Vector3ds', vector3ds, {});
    await queryInterface.bulkInsert('Vector3dDescriptions', vector3dDescriptions, {});
    await queryInterface.bulkInsert('SceneCheckouts', sceneCheckouts, {});
    await queryInterface.bulkInsert('SceneCheckoutDescriptions', sceneCheckoutDescriptions, {});
  },
 
  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('SceneCheckoutDescriptions', null, {});
    await queryInterface.bulkDelete('SceneCheckouts', null, {});
  }
};

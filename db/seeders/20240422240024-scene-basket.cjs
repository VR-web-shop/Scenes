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
    const object_offset_client_side_uuid = v4();
    const insert_area_offset_client_side_uuid = v4();
    const insert_area_size_client_side_uuid = v4();
    const placeholder_offset_client_side_uuid = v4();
    const pocket_offset_client_side_uuid = v4();

    const object_client_side_uuid = demoScene.meshes.find(mesh => {
      return mesh.name === demoScene.basket.basket_mesh_name
    }).client_side_uuid;

    const placeholder_client_side_uuid = demoScene.meshes.find(mesh => {
      return mesh.name === demoScene.basket.products_mesh_name
    }).client_side_uuid;

    const pocket_client_side_uuid = demoScene.meshes.find(mesh => {
      return mesh.name === demoScene.basket.pocket_mesh_name
    }).client_side_uuid;

    await queryInterface.bulkInsert('Vector3ds', [
      { client_side_uuid: position_client_side_uuid },
      { client_side_uuid: rotation_client_side_uuid },
      { client_side_uuid: scale_client_side_uuid },
      { client_side_uuid: object_offset_client_side_uuid },
      { client_side_uuid: insert_area_offset_client_side_uuid },
      { client_side_uuid: insert_area_size_client_side_uuid },
      { client_side_uuid: placeholder_offset_client_side_uuid },
      { client_side_uuid: pocket_offset_client_side_uuid },
    ], {});

    await queryInterface.bulkInsert('Vector3dDescriptions', [
      { 
        vector3d_client_side_uuid: position_client_side_uuid,
        x: demoScene.basket.position.x,
        y: demoScene.basket.position.y,
        z: demoScene.basket.position.z, 
      },
      { 
        vector3d_client_side_uuid: rotation_client_side_uuid,
        x: demoScene.basket.rotation.x,
        y: demoScene.basket.rotation.y,
        z: demoScene.basket.rotation.z, 
      },
      { 
        vector3d_client_side_uuid: scale_client_side_uuid,
        x: demoScene.basket.scale.x,
        y: demoScene.basket.scale.y,
        z: demoScene.basket.scale.z, 
      },
      { 
        vector3d_client_side_uuid: object_offset_client_side_uuid,
        x: demoScene.basket.object_offset.x,
        y: demoScene.basket.object_offset.y,
        z: demoScene.basket.object_offset.z, 
      },
      { 
        vector3d_client_side_uuid: insert_area_offset_client_side_uuid,
        x: demoScene.basket.insert_area_offset.x,
        y: demoScene.basket.insert_area_offset.y,
        z: demoScene.basket.insert_area_offset.z, 
      },
      { 
        vector3d_client_side_uuid: insert_area_size_client_side_uuid,
        x: demoScene.basket.insert_area_size.x,
        y: demoScene.basket.insert_area_size.y,
        z: demoScene.basket.insert_area_size.z, 
      },
      { 
        vector3d_client_side_uuid: placeholder_offset_client_side_uuid,
        x: demoScene.basket.placeholder_offset.x,
        y: demoScene.basket.placeholder_offset.y,
        z: demoScene.basket.placeholder_offset.z, 
      },
      { 
        vector3d_client_side_uuid: pocket_offset_client_side_uuid,
        x: demoScene.basket.pocket_offset.x,
        y: demoScene.basket.pocket_offset.y,
        z: demoScene.basket.pocket_offset.z, 
      },
    ], {});
    
    await queryInterface.bulkInsert('SceneBaskets', [{
      client_side_uuid: demoScene.client_side_uuid
    }], {});

    await queryInterface.bulkInsert('SceneBasketDescriptions', [{
      scene_basket_client_side_uuid: demoScene.client_side_uuid,
      scene_client_side_uuid: demoScene.client_side_uuid,
      scene_basket_state_name: demoScene.basket.scene_basket_state_name,
      position_client_side_uuid,
      rotation_client_side_uuid,
      scale_client_side_uuid,
      object_offset_client_side_uuid,
      insert_area_offset_client_side_uuid,
      insert_area_size_client_side_uuid,
      object_client_side_uuid,
      placeholder_client_side_uuid,
      placeholder_offset_client_side_uuid,
      pocket_offset_client_side_uuid,
      pocket_client_side_uuid,
    }], {});
  },
  
  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('SceneBasketDescriptions', null, {});
    await queryInterface.bulkDelete('SceneBaskets', null, {});
  }
};

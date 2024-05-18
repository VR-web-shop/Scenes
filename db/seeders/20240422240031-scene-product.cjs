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
    const CDN_URL = process.env.S3_CDN_URL;

    const params = demoScene.scene_products.map(sceneProduct => {
      const position_client_side_uuid = v4();
      const rotation_client_side_uuid = v4();
      const scale_client_side_uuid = v4();
      const ui_offset_position_client_side_uuid = v4();
      const ui_offset_rotation_client_side_uuid = v4();
      const ui_scale_client_side_uuid = v4();
      const scene_product_state_name = 'ReadyForSale';

      const mesh_client_side_uuid = demoScene.meshes.find(mesh => {
        return mesh.name === sceneProduct.mesh_name
      }).client_side_uuid;

      return {
        position_client_side_uuid,
        rotation_client_side_uuid,
        scale_client_side_uuid,
        ui_offset_position_client_side_uuid,
        ui_offset_rotation_client_side_uuid,
        ui_scale_client_side_uuid,
        mesh_client_side_uuid,
        scene_product_state_name,
        sceneProduct,
      };
    });
    
    const vector3ds = params.map(param => [
      { client_side_uuid: param.position_client_side_uuid },
      { client_side_uuid: param.rotation_client_side_uuid },
      { client_side_uuid: param.scale_client_side_uuid },
      { client_side_uuid: param.ui_offset_position_client_side_uuid },
      { client_side_uuid: param.ui_offset_rotation_client_side_uuid },
      { client_side_uuid: param.ui_scale_client_side_uuid },
    ]).flat();

    const vector3dDescriptions = params.map(param => [
      { 
        vector3d_client_side_uuid: param.position_client_side_uuid,
        x: param.sceneProduct.position.x,
        y: param.sceneProduct.position.y,
        z: param.sceneProduct.position.z, 
      },
      { 
        vector3d_client_side_uuid: param.rotation_client_side_uuid,
        x: param.sceneProduct.rotation.x,
        y: param.sceneProduct.rotation.y,
        z: param.sceneProduct.rotation.z, 
      },
      { 
        vector3d_client_side_uuid: param.scale_client_side_uuid,
        x: param.sceneProduct.scale.x,
        y: param.sceneProduct.scale.y,
        z: param.sceneProduct.scale.z, 
      },
      {
        vector3d_client_side_uuid: param.ui_offset_position_client_side_uuid,
        x: param.sceneProduct.ui_offset_position.x,
        y: param.sceneProduct.ui_offset_position.y,
        z: param.sceneProduct.ui_offset_position.z,
      },
      {
        vector3d_client_side_uuid: param.ui_offset_rotation_client_side_uuid,
        x: param.sceneProduct.ui_offset_rotation.x,
        y: param.sceneProduct.ui_offset_rotation.y,
        z: param.sceneProduct.ui_offset_rotation.z,
      },
      {
        vector3d_client_side_uuid: param.ui_scale_client_side_uuid,
        x: param.sceneProduct.ui_offset_scale.x,
        y: param.sceneProduct.ui_offset_scale.y,
        z: param.sceneProduct.ui_offset_scale.z,
      }
    ]).flat();

    const products = params.map(param => ({
      client_side_uuid: param.sceneProduct.Product.uuid,
    }));

    const productDescriptions = params.map((param, index) => ({
      product_client_side_uuid: products[index].client_side_uuid,
      name: param.sceneProduct.Product.name,
      description: param.sceneProduct.Product.description,
      price: param.sceneProduct.Product.price,
      thumbnail_source: CDN_URL + param.sceneProduct.Product.thumbnail_source,
    }));

    const sceneProducts = params.map(param => ({
      client_side_uuid: v4()
    }));

    const sceneProductDescriptions = params.map((param, index) => ({
      scene_product_client_side_uuid: sceneProducts[index].client_side_uuid,
      scene_client_side_uuid: demoScene.client_side_uuid,
      position_client_side_uuid: param.position_client_side_uuid,
      rotation_client_side_uuid: param.rotation_client_side_uuid,
      scale_client_side_uuid: param.scale_client_side_uuid,
      ui_offset_position_client_side_uuid: param.ui_offset_position_client_side_uuid,
      ui_offset_rotation_client_side_uuid: param.ui_offset_rotation_client_side_uuid,
      ui_scale_client_side_uuid: param.ui_scale_client_side_uuid,
      mesh_client_side_uuid: param.mesh_client_side_uuid,
      scene_product_state_name: param.scene_product_state_name,
      product_client_side_uuid: param.sceneProduct.Product.uuid,
    }));

    await queryInterface.bulkInsert('Vector3ds', vector3ds, {});
    await queryInterface.bulkInsert('Vector3dDescriptions', vector3dDescriptions, {});
    await queryInterface.bulkInsert('Products', products, {});
    await queryInterface.bulkInsert('ProductDescriptions', productDescriptions, {});
    await queryInterface.bulkInsert('SceneProducts', sceneProducts, {});
    await queryInterface.bulkInsert('SceneProductDescriptions', sceneProductDescriptions, {});
  },
 
  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('ProductDescriptions', null, {});
    await queryInterface.bulkDelete('Products', null, {});
    await queryInterface.bulkDelete('SceneProductDescriptions', null, {});
    await queryInterface.bulkDelete('SceneProducts', null, {});
  }
};

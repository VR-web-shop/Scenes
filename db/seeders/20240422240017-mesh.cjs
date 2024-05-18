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
    const v4 = require('uuid').v4;
    const CDN_URL = process.env.S3_CDN_URL;

    const meshes = demoScene.meshes.map((mesh) => {
      return { client_side_uuid: mesh.client_side_uuid }
    });
    const meshDescriptions = demoScene.meshes.map((mesh) => {
      return {
        name: mesh.name,
        source: CDN_URL + mesh.source,
        mesh_client_side_uuid: mesh.client_side_uuid,
      }
    });
    const meshMaterials = []
    const meshMaterialDescriptions = []
    demoScene.meshes.forEach((mesh) => {
      return mesh.meshMaterials.forEach((meshMaterial) => {
        const mesh_material_client_side_uuid = v4();
        meshMaterials.push({
          client_side_uuid: mesh_material_client_side_uuid,          
        });
        meshMaterialDescriptions.push({
          mesh_material_client_side_uuid,
          submesh_name: meshMaterial.submesh_name,
          mesh_client_side_uuid: mesh.client_side_uuid,
          material_client_side_uuid: meshMaterial.material_client_side_uuid,
        });
      });
    });

    await queryInterface.bulkInsert('Meshes', meshes, {});
    await queryInterface.bulkInsert('MeshDescriptions', meshDescriptions, {});
    await queryInterface.bulkInsert('MeshMaterials', meshMaterials, {});
    await queryInterface.bulkInsert('MeshMaterialDescriptions', meshMaterialDescriptions, {});
  },
 
  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('MeshMaterialDescriptions', null, {});
    await queryInterface.bulkDelete('MeshMaterials', null, {});
    await queryInterface.bulkDelete('MeshDescriptions', null, {});
    await queryInterface.bulkDelete('Meshes', null, {});
  }
};

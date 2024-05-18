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

    const materials = demoScene.materials.map((material) => {
      return { client_side_uuid: material.client_side_uuid }
    });
    const materialDescriptions = demoScene.materials.map((material) => {
      return {
        name: material.name,
        material_type_name: material.material_type_name,
        material_client_side_uuid: material.client_side_uuid,
      }
    });
    const materialTextures = [] 
    demoScene.materials.forEach((material) => {
      material.textures.forEach((texture) => {
        materialTextures.push({
          client_side_uuid: v4(),
          material_client_side_uuid: material.client_side_uuid,
          texture_client_side_uuid: texture.client_side_uuid,
        });
      });
    });

    await queryInterface.bulkInsert('Materials', materials, {});
    await queryInterface.bulkInsert('MaterialDescriptions', materialDescriptions, {});
    await queryInterface.bulkInsert('MaterialTextures', materialTextures, {});
  },
 
  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('MaterialTextures', null, {});
    await queryInterface.bulkDelete('MaterialDescriptions', null, {});
    await queryInterface.bulkDelete('Materials', null, {});
  }
};

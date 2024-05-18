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
    const CDN_URL = process.env.S3_CDN_URL;
  
    const textures = demoScene.textures.map((texture) => {
      return { client_side_uuid: texture.client_side_uuid }
    });
    const textureDescriptions = demoScene.textures.map((texture) => {
      return {
        name: texture.name,
        source: CDN_URL + '/' + texture.source,
        texture_type_name: texture.texture_type_name,
        texture_client_side_uuid: texture.client_side_uuid,
      }
    });

    await queryInterface.bulkInsert('Textures', textures, {});
    await queryInterface.bulkInsert('TextureDescriptions', textureDescriptions, {});
  },
 
  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('TextureDescriptions', null, {});
    await queryInterface.bulkDelete('Textures', null, {});
  }
};

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
    await queryInterface.bulkInsert('ProductEntityStates', [
      {
        name: 'SYSTEM_FAILURE',
      },
      {
        name: 'AVAILABLE_FOR_PURCHASE',
      },
      {
        name: 'RESERVERED_BY_CUSTOMER_CART',
      },
      {
        name: 'RESERVERED_BY_CUSTOMER_ORDER',
      },
      {
        name: 'SHIPPED_TO_CUSTOMER',
      },
      {
        name: 'DELIVERED_TO_CUSTOMER',
      },
      {
        name: 'RETURNED_BY_CUSTOMER',
      },
      {
        name: 'DISCARDED_BY_EMPLOYEE'
      }
    ], {});
  },
  
  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('ProductEntityStates', null, {});
  }
};

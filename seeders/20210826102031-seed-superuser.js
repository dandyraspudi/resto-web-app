'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let data = [
      {
        name: 'Admin',
        password: '$2b$10$KrCHzlnaBY88BDeEaHv52.VkEfWJ/jtODqKw2bbeN486.fSeIpcZq',
        role: 'SU',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name: 'Arnold',
        password: '$2b$10$KrCHzlnaBY88BDeEaHv52.VkEfWJ/jtODqKw2bbeN486.fSeIpcZq',
        role: 'Manager',
        createdAt : new Date(),
        updatedAt : new Date(),
        RestoranId : 1
      },
      {
        name: 'Ayu',
        password: '$2b$10$KrCHzlnaBY88BDeEaHv52.VkEfWJ/jtODqKw2bbeN486.fSeIpcZq',
        role: 'Manager',
        createdAt : new Date(),
        updatedAt : new Date(),
        RestoranId : 2
      }
    ]
    return queryInterface.bulkInsert('Users', data)
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    return queryInterface.bulkDelete('Users', null)
  }
};

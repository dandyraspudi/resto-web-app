'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = require('../data/restoran.json')
    data.forEach(resto => {
      resto.createdAt = new Date()
      resto.updatedAt = new Date()
    })
    return queryInterface.bulkInsert('Restaurants', data)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Restaurants', null)
  }
};

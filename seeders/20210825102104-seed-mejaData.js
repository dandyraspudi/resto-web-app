'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = require('../data/seat.json')
    data.forEach(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })
    return queryInterface.bulkInsert('Seats', data)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Seats', null)
  }
};

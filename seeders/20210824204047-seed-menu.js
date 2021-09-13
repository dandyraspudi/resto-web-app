'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = require('../data/menu.json')
    data.forEach(menu => {
      menu.createdAt = new Date()
      menu.updatedAt = new Date()
    })
    return queryInterface.bulkInsert('Menus', data)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Menus', null)
  }
};

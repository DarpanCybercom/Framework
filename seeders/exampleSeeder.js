'use strict';
const {
    Sequelize
} = require('sequelize');

module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('example', [{
        title: "Example",
        createdAt: new Date(),
        updatedAt: new Date()
      }]);
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('example', null, {});
    }
  };
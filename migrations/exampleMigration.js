'use strict';
const { Sequelize } = require('sequelize');

module.exports = {
  async up({context :queryInterface}) {
    await queryInterface.createTable('example', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title:{
        type:Sequelize.STRING
      },
      isActive:{
        type:Sequelize.INTEGER
      },
      fromDate : {
        allowNull: false,
        type: Sequelize.DATE
      },
      toDate : {
        allowNull: false,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      }
    });
  },
  async down({context :queryInterface}) {
    await queryInterface.dropTable('example');
  }
};
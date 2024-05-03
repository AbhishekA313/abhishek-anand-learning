'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      source: {
        type: Sequelize.STRING
      },
      account_number: {
        type: Sequelize.INTEGER
      },
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      customer_number: {
        type: Sequelize.STRING
      },
      case_reference: {
        type: Sequelize.STRING
      },
      triggered_by_rule: {
        type: Sequelize.STRING
      },
      record_type: {
        type: Sequelize.STRING
      },
      notes: {
        type: Sequelize.STRING
      },
      senior_analyst_user_id: {
        type: Sequelize.INTEGER
      },
      investigating_analyst_user_id: {
        type: Sequelize.INTEGER
      },
      case_outcome: {
        type: Sequelize.STRING
      },
      category_of_match: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropAllTables();
  }
};
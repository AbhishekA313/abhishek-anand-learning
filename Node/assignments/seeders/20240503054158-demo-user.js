'use strict';

const excelJS = require("exceljs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = await this.getData();
    await queryInterface.bulkInsert('Users', data);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },

  async getData () {
    const data = [
      {
        id: 1,
        source: "BANA",
        account_number: 119455639,
        first_name: "Pace",
        last_name: "Hebblewhite",
        customer_number: "519256323",
        case_reference: "871480336",
        triggered_by_rule: "909",
        record_type: "TM",
        notes: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
        senior_analyst_user_id: 123,
        investigating_analyst_user_id: 456,
        case_outcome: "Negative",
        category_of_match: "PEP",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        source: "BANA",
        account_number: 362117235,
        first_name: "Murielle",
        last_name: "Babe",
        customer_number: "307717200",
        case_reference: "367579783",
        triggered_by_rule: "906",
        record_type: "Screening",
        notes: "Donec posuere metus vitae ipsum. Aliquam non mauris. Morbi non lectus.",
        senior_analyst_user_id: 123,
        investigating_analyst_user_id: 456,
        case_outcome: "TBD",
        category_of_match: "PEP",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    return data;
  }
};

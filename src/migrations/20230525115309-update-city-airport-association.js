'use strict';


/* 

  This file is generate by the following command : 
  command : npx sequelize migration:generate --name update-city-airport-association

  This used to set up diffrent assiciations between tables, i.e. creating foreign key
*/
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.addConstraint('Airports', {
      type: 'foreign key',
      fields: ['cityId'],
      name: 'city_fkey_constaints',
      references: {
        table: 'Cities',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onDelete: 'CASCADE'
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Airports', 'city_fkey_constaints')
  }
};

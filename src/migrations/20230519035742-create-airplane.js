'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    // queryInterface -> creates an interface between the raw querries and ORM 
    // Database level constaints are applied here
    // If there are any changes in the models, are we forget to reflect those change here
    // then there will be no change in the tables.

    // These properties will be applied to the tables in the next commit -> migration
    // Migrations files are like the version controles of your db

    // datatype : we can a lots of datatypes just like sql -> go to documentation
    // operators : we can many operators -> goto docs of sequelize cli
    await queryInterface.createTable('Airplanes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      modelNumber: {
        type: Sequelize.STRING,
        allowNull: false
      },
      capacity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
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
    await queryInterface.dropTable('Airplanes');
  }
};
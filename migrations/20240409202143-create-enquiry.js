'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Enquiries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      schoolId: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      enquiryDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      parentName :{
        type: DataTypes.STRING,
        allowNull: false
      },
      contactNo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      class: {
        type: DataTypes.STRING,
        allowNull: false
      },
      previousSchool: {
        type: DataTypes.STRING,
      },
      villageOrCity: {
        type: DataTypes.STRING,
      },
      district: {
        type: DataTypes.STRING,
      },
      followUpDate: {
        type: DataTypes.DATEONLY,
      },
      remarks: {
        type: DataTypes.TEXT,
      },
      parentConcern: {
        type: DataTypes.TEXT,
      },
      status: {
        type: DataTypes.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('Enquiries');
  }
};
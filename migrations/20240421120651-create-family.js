'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface,  DataTypes) {
    await queryInterface.createTable('Families', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type:  DataTypes.INTEGER
      },
      schoolId: {
        type:  DataTypes.INTEGER
      },
      studentId: {
        type:  DataTypes.INTEGER
      },
      bankName: {
        type:  DataTypes.STRING
      },
      bankBranch: {
        type:  DataTypes.STRING
      },
      IFSCCode: {
        type:  DataTypes.STRING
      },
      accountNo: {
        type:  DataTypes.STRING
      },
      panNo: {
        type:  DataTypes.STRING
      },
      fatherName: {
        type:  DataTypes.STRING
      },
      fatherQualification: {
        type:  DataTypes.STRING
      },
      fatherOccupation: {
        type:  DataTypes.STRING
      },
      fatherIncome: {
        type:  DataTypes.STRING
      },
      fatherAadharCard: {
        type:  DataTypes.STRING
      },
      fatherPhoto: {
        type:  DataTypes.STRING
      },
      Address: {
        type:  DataTypes.TEXT
      },
      fatherMobileNo: {
        type:  DataTypes.STRING
      },
      fatherEmail: {
        type:  DataTypes.STRING
      },
      motherName: {
        type:  DataTypes.STRING
      },
      motherQualification: {
        type:  DataTypes.STRING
      },
      motherOccupation: {
        type:  DataTypes.STRING
      },
      motherIncome: {
        type:  DataTypes.STRING
      },
      MotherAadhardCard: {
        type:  DataTypes.STRING
      },
      motherPhoto: {
        type:  DataTypes.STRING
      },
      motherMobileNo: {
        type:  DataTypes.STRING
      },
      motherEmail: {
        type:  DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type:  DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type:  DataTypes.DATE
      }
    });
  },
  async down(queryInterface,  DataTypes) {
    await queryInterface.dropTable('Families');
  }
};
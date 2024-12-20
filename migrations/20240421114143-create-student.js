'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Students', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      schoolId: {
        type: DataTypes.INTEGER
      },
      session: {
        type: DataTypes.STRING
      },
      admissionDate: {
        type: DataTypes.DATEONLY
      },
      admissionNo: {
        type: DataTypes.STRING
      },
      rollNo: {
        type: DataTypes.STRING
      },
      firstName: {
        type: DataTypes.STRING
      },
      lastName: {
        type: DataTypes.STRING
      },
      classId: {
        type: DataTypes.INTEGER
      },
      sectionId: {
        type: DataTypes.INTEGER
      },
      fatherName: {
        type: DataTypes.STRING
      },
      contactNo: {
        type: DataTypes.STRING
      },
      gender: {
        type: DataTypes.STRING
      },
      DOB: {
        type: DataTypes.STRING
      },
      bloodGroup: {
        type: DataTypes.STRING
      },
      height: {
        type: DataTypes.STRING
      },
      weight: {
        type: DataTypes.STRING
      },
      aadharNo: {
        type: DataTypes.STRING
      },
      transport: {
        type: DataTypes.STRING
      },
      religion: {
        type: DataTypes.STRING
      },
      studentType: {
        type: DataTypes.STRING
      },
      caste: {
        type: DataTypes.STRING
      },
      nationality: {
        type: DataTypes.STRING
      },
      registrationNo: {
        type: DataTypes.STRING
      },
      crnNo: {
        type: DataTypes.STRING
      },
      rte: {
        type: DataTypes.STRING
      },
      rteApplicationNo: {
        type: DataTypes.STRING
      },
      udiseNo: {
        type: DataTypes.STRING
      },
      studentPhoto: {
        type: DataTypes.STRING
      },
      casteCertificate: {
        type: DataTypes.STRING
      },
      aadharCard: {
        type: DataTypes.STRING
      },
      birthCertificate: {
        type: DataTypes.STRING
      },
      transferCertificate: {
        type: DataTypes.STRING
      },
      previousClass: {
        type: DataTypes.STRING
      },
      passYear: {
        type: DataTypes.STRING
      },
      obtMarks: {
        type: DataTypes.STRING
      },
      age: {
        type: DataTypes.STRING
      },
      schoolName: {
        type: DataTypes.STRING
      },
      studentId: {
        type: DataTypes.STRING
      },
      familyId: {
        type: DataTypes.STRING
      },
      status: {
        type: DataTypes.INTEGER
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
    await queryInterface.dropTable('Students');
  }
};
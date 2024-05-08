'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Family extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Family.init({
    schoolId: {
      type: DataTypes.INTEGER
    },
    studentId: {
      type: DataTypes.INTEGER
    },
    bankName: {
      type: DataTypes.STRING
    },
    bankBranch: {
      type: DataTypes.STRING
    },
    IFSCCode: {
      type: DataTypes.STRING
    },
    accountNo: {
      type: DataTypes.STRING
    },
    panNo: {
      type: DataTypes.STRING
    },
    fatherName: {
      type: DataTypes.STRING
    },
    fatherQualification: {
      type: DataTypes.STRING
    },
    fatherOccupation: {
      type: DataTypes.STRING
    },
    fatherIncome: {
      type: DataTypes.STRING
    },
    fatherAadharCard: {
      type: DataTypes.STRING
    },
    fatherPhoto: {
      type: DataTypes.STRING
    },
    Address: {
      type: DataTypes.TEXT
    },
    fatherMobileNo: {
      type: DataTypes.STRING
    },
    fatherEmail: {
      type: DataTypes.STRING
    },
    motherName: {
      type: DataTypes.STRING
    },
    motherQualification: {
      type: DataTypes.STRING
    },
    motherOccupation: {
      type: DataTypes.STRING
    },
    motherIncome: {
      type: DataTypes.STRING
    },
    MotherAadhardCard: {
      type: DataTypes.STRING
    },
    motherPhoto: {
      type: DataTypes.STRING
    },
    motherMobileNo: {
      type: DataTypes.STRING
    },
    motherEmail: {
      type: DataTypes.STRING
    },
    fatherAadharNo: {
      type: DataTypes.STRING
    },
    motherAadharNo: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'Family',
  });
  return Family;
};
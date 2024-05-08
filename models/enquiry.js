'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Enquiry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Enquiry.init({
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
    lastName: {
      type: DataTypes.STRING,
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
    status: {
      type: DataTypes.INTEGER,
    },
  }, {
  sequelize,
  modelName: 'Enquiry',
});
return Enquiry;
};
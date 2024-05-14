'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class School extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  School.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    logo: {
      type: DataTypes.STRING,
    },
    banner: {
      type: DataTypes.STRING,
    },
    contactNo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    alternateContactNo: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    website: {
      type: DataTypes.STRING,
    },
    admissionNoSeq: {
      type: DataTypes.STRING,
    },
    rollNoSeq: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.INTEGER,
    },
    settings: {
      type: DataTypes.INTEGER,
    },
    contactPerson: {
      type: DataTypes.STRING,
    },
    blockedAt: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'School',
  });
  return School;
};
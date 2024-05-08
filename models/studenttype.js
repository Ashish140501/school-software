'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StudentType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  StudentType.init({
    schoolId: {
      type: DataTypes.INTEGER
    },
    studentType: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'StudentType',
  });
  return StudentType;
};
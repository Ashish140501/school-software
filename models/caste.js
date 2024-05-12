'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Caste extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Caste.init({
    caste: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'Caste',
  });
  return Caste;
};
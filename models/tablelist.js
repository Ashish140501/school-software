'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TableList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TableList.init({
    schoolId: {
      type: DataTypes.INTEGER
    },
    tableName: {
      type: DataTypes.STRING
    },
    list: {
      type: DataTypes.JSONB
    },
  }, {
    sequelize,
    modelName: 'TableList',
  });
  return TableList;
};
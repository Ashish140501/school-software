'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Section extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Section.belongsTo(models.Class, {
        foreignKey: 'classId',
        as: 'classList'
      });
      Section.hasMany(models.Student, {
        foreignKey: 'sectionId',
      });
    }
  }
  Section.init({
    schoolId: {
      type: DataTypes.INTEGER
    },
    classId: {
      type: DataTypes.INTEGER
    },
    section: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'Section',
  });
  return Section;
};
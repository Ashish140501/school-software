'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RoleHasPermission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RoleHasPermission.belongsTo(models.Permission, {
        foreignKey: 'permissionId',
        // as: 'permissions'
      });
      RoleHasPermission.belongsTo(models.Role, {
        foreignKey: 'roleId',
        // as: 'roles'
      });

    }
  }
  RoleHasPermission.init({
    permissionId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'RoleHasPermission',
  });
  return RoleHasPermission;
};
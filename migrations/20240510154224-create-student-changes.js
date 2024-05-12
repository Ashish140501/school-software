module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Students', 'transport', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Students', 'transportId', {
        type: Sequelize.INTEGER
      }),
      queryInterface.removeColumn('Families', 'motherAadhardCard', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Families', 'motherAadharCard', {
        type: Sequelize.STRING
      }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Students', 'transport', {
        type: Sequelize.STRING
      }),
      queryInterface.removeColumn('Students', 'transportId', {
        type: Sequelize.INTEGER
      }),
      queryInterface.addColumn('Families', 'motherAadhardCard', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Families', 'motherAadharCard', {
        type: Sequelize.STRING
      }),
    ])
  }
};
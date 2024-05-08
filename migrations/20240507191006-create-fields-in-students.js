module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Students', 'staffNo', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Students', 'availingTransport', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Students', 'percentage', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Families', 'fatherAadharNo', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Families', 'motherAadharNo', {
        type: Sequelize.STRING
      }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Students', 'staffNo', {
        type: Sequelize.STRING
      }),
      queryInterface.removeColumn('Students', 'availingTransport', {
        type: Sequelize.STRING
      }),
      queryInterface.removeColumn('Students', 'percentage', {
        type: Sequelize.STRING
      }),
      queryInterface.removeColumn('Families', 'fatherAadharNo', {
        type: Sequelize.STRING
      }),
      queryInterface.removeColumn('Families', 'motherAadharNo', {
        type: Sequelize.STRING
      }),
    ])
  }
};
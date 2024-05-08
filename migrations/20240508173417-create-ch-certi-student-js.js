module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Students', 'characterCertificate', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Families', 'uploadPanCard', {
        type: Sequelize.STRING
      }),
      queryInterface.removeColumn('Families', 'MotherAadhardCard', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Families', 'motherAadhardCard', {
        type: Sequelize.STRING
      }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Students', 'characterCertificate', {
        type: Sequelize.STRING
      }),
      queryInterface.removeColumn('Families', 'uploadPanCard', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Families', 'MotherAadhardCard', {
        type: Sequelize.STRING
      }),
      queryInterface.removeColumn('Families', 'motherAadhardCard', {
        type: Sequelize.STRING
      }),
    ])
  }
};
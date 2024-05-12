module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Schools', 'admissionNoSeq', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Schools', 'rollNoSeq', {
        type: Sequelize.STRING
      }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Schools', 'admissionNoSeq', {
        type: Sequelize.STRING
      }),
      queryInterface.removeColumn('Schools', 'rollNoSeq', {
        type: Sequelize.STRING
      }),
    ])
  }
};
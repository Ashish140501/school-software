module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Enquiries', 'parentConcern', {
        type: Sequelize.TEXT
      }),
      queryInterface.addColumn('Enquiries', 'lastName', {
        type: Sequelize.STRING
      }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Enquiries', 'parentConcern', {
        type: Sequelize.TEXT
      }),
      queryInterface.removeColumn('Enquiries', 'lastName', {
        type: Sequelize.STRING
      }),
    ])
  }
};
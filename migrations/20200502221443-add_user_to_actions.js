'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('actions','userId',{
      type: Sequelize.INTEGER,
      references:{
        model:{
          tableName:'Users'
        },
          key:'id'
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('actions','userId');
  }
};

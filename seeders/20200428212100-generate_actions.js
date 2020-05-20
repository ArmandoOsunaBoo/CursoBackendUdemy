'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('actions',
      [{id:1,nombre: 'Ejecutar',createdAt: new Date(),updatedAt: new Date()},
    {id:2,nombre: 'Borrar',createdAt: new Date(),updatedAt: new Date()},
  {id:3,nombre: 'Insertar',createdAt: new Date(),updatedAt: new Date()}], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('actions', null, {});
  }
};

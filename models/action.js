'use strict';
const socket = require('../realtime/client');
module.exports = (sequelize, DataTypes) => {
  const action = sequelize.define('action', {
    nombre: DataTypes.TEXT
  }, {});
  action.associate = function(models) {
     action.belongsTo(models.User,{
       as: 'user',
       foreignKey: "userId" 
     });
  };

   action.afterCreate(function(action,options){
     socket.emit('new_action',action);
   });

  return action;
};

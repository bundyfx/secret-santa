'use strict';
module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define('Game', {
    name: DataTypes.STRING,
    room: DataTypes.STRING,
    players: DataTypes.ARRAY(DataTypes.STRING)
  }, {});
  Game.associate = function(models) {
    // associations can be defined here
  };
  return Game;
};
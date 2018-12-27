const Sequelize = require('sequelize');
const gameModel = require('./game.js');

//environment vars
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

//db config
const db = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: process.env.NODE_ENV === 'production' ? true : false,
  },
});

// Declare Models
const Game = gameModel(db, Sequelize);

module.exports = {
  db,
  Game
};
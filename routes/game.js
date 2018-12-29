const express = require('express');
const { Game } = require('../models')
const sequelize = require('sequelize');

const routes = () => {
    const gameRouter = express.Router();

    gameRouter.post('/', (req, res) => {
        const { create, join, leave } = req.query
        let { playerName, gameName } = req.body

        req.session.room = gameName

        if (create) {
            Game.create({
                name: gameName,
                players: [playerName],
                room: `/${gameName}`
            }).then(() => {
                res.json({
                    gameName: req.session.room,
                    playerList: [playerName]
                });
            })
        }
        if (join) {
            Game.update({
                'players': sequelize.fn('array_append', sequelize.col('players'), playerName)
            }, {
                'where': {
                    'name': gameName
                },
                'returning': true
            }).then((data) => {
                const playerList = data[1].map(gameInfo => gameInfo.dataValues.players).pop()
                // const filteredPlayerList = playerList.filter(player => player != playerName)
                res.json({
                    gameName: req.session.room,
                    playerList: playerList
                });
            })
        }
        if (leave) {
            Game.update({
                'players': sequelize.fn('array_remove', sequelize.col('players'), playerName)
            }, {
                'where': {
                    'name': gameName
                },
                'returning': true
            }).then((data) => {
                const playerList = data[1].map(gameInfo => gameInfo.dataValues.players).pop()
                // const filteredPlayerList = playerList.filter(player => player != playerName)
                res.json({
                    gameName: req.session.room,
                    playerList: playerList
                });
            })
        }
    });
    return gameRouter;
};

module.exports = routes;
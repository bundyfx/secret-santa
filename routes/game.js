const express = require('express');
const { Game } = require('../models')
const sequelize = require('sequelize');

const routes = (io) => {
    const gameRouter = express.Router();

    gameRouter.post('/', (req, res) => {
        const { create, join } = req.query
        let { playerName, gameName } = req.body

        req.session.room = gameName

        if (create) {
            // Set the session to be the room name (Will become some complex GUID)
    
            Game.create({
                name: gameName,
                players: [playerName],
                room: `/${gameName}` // (Will become some complex GUID)
            }).then(() => {
                res.cookie('gameDetails', JSON.stringify({ gameName: req.session.room, playerName: playerName })); // (Will become some complex GUID)
                res.render('game', {
                    namespace: req.session.room,
                    playerList: []
                });


                return
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
                // The returned list of players in this room according to the DB
                const playerList = data[1].map(gameInfo => gameInfo.dataValues.players).pop()

                res.cookie('gameDetails', JSON.stringify({ gameName: req.session.room, playerName: playerName })); // (Will become some complex GUID)
                const filteredPlayerList = playerList.filter(player => player != playerName)

                res.render('game', {
                    namespace: req.session.room,
                    playerList: filteredPlayerList
                });

                // Emit back to the client the current player-list (returned from db)
                return
            })
        }
    });

    gameRouter.get('/', (req, res) => {
        const {} = req.query
        res.render('game');
    });

    return gameRouter;
};

module.exports = routes;
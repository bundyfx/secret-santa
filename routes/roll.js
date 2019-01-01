const express = require('express');

const routes = (io) => {
    const rollRouter = express.Router();

    // Some function here to validate if the person who clicked can actually roll
    rollRouter.post('/', (req, res) => {
        const { gameName, playerName, playerList } = req.body // fred comes in // ["fred", "ted"]

        let nextPlayersName = getNextPlayer(playerList, playerName)

        io.sockets.in(gameName).emit('roll', getRandomInt(6));
        io.sockets.in(gameName).emit('players-turn', nextPlayersName);
        
        res.status(200).end()
    })

    return rollRouter;
};

// Our rolling function
const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}

const getNextPlayer = (playerArray, currentValue) => {
    const index = playerArray.indexOf(currentValue);
    if (index >= 0 && index < playerArray.length - 1) {
      const nextItem = playerArray[index + 1];
      return nextItem;
    }
    return playerArray[0];
}

module.exports = routes;
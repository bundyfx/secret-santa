const express = require('express');

const routes = (io) => {
    const rollRouter = express.Router();

    rollRouter.post('/', (req, res) => {
        const room = req.session.room
        io.sockets.in(room).emit('roll', getRandomInt(6));
        res.status(200).end()
    })

    return rollRouter;
};

// Our rolling function
const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}

module.exports = routes;
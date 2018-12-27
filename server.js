if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const cookieParser = require('cookie-parser')
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser')
const session = require('express-session');
const sequelize = require('sequelize');
const { db, Game } = require('./models');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

app.use(
    session({
        store: new SequelizeStore({
            db: db,
            checkExpirationInterval: 15 * 60 * 1000, // The interval at which to cleanup expired sessions in milliseconds.
            expiration: 24 * 60 * 60 * 10000, // The maximum age (in milliseconds) of a valid session.
        }),
        secret: process.env.BCRYPT_SECRET,
        saveUninitialized: true,
        resave: false,
    })
);

app.use(cookieParser())

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/game', (req, res) => {
    const {
    } = req.query
    res.render('game');
});

app.post('/game', (req, res) => {
    const { create, join } = req.query
    if (create) {
        const { playerName,  gameName } = req.body

        // Set the session to be the room name (Will become some complex GUID)
        req.session.room = gameName

        Game.create({
            name: gameName,
            players: [playerName],
            room: `/${gameName}` // (Will become some complex GUID)
        }).then(() => {
            res.cookie('room', req.session.room); // (Will become some complex GUID)
            res.render('game', { namespace: req.session.room });
            return
        })
    }
    if (join){
        // If the user is joining a game
        const { playerName, gameName } = req.body

        // Set the session to be the room name (Will become some complex GUID)
        req.session.room = gameName

        Game.update(
            {'players': sequelize.fn('array_append', sequelize.col('players'), playerName)},
            {'where': {'name': gameName}}
           ).then(() => {
            res.cookie('room', req.session.room); // (Will become some complex GUID)
            res.render('game', { namespace: req.session.room });
            return
        })
    }
});



        // handle incoming connections from clients
        io.sockets.on('connection', (socket) => {
            console.log('connected!')
    
            // once a client has connected, we expect to get a ping from them saying what room they want to join
            socket.on('room', (room) => {
                console.log('room joined')
                socket.join(room);
            });
        });


app.post('/roll', (req, res) => {
    const room = req.session.room
    io.sockets.in(room).emit('roll', getRandomInt(6));
    res.status(200).end()
})

app.get('/home/:status', (req, res) => {
    const {
        status
    } = req.params
    res.render('home', {
        status: status
    });
});

db.sync()
    .then(() => {
        server.listen(process.env.PORT || 3000, () => {
            console.log(`App listening on port: ${server.address().port}`);
        });
    })
    .catch(error => console.log('Error: => ', error));

const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}
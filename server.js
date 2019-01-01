// env config
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// Core imports 
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser')
const session = require('express-session');
const cors = require('cors')

// Import routes
const gameRouter = require('./routes/game')();
const rollRouter = require('./routes/roll')(io);


// Models and DB
const { db, Game } = require('./models');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Cors Config
const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
  }

// Middleware
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

app.use(cors(corsOptions))

// Required for form parsing
app.use(bodyParser.json())

// Routes
app.use('/game', gameRouter);
app.use('/roll', rollRouter);


// Db Sync and server listen
db.sync()
    .then(() => {
        server.listen(process.env.PORT || 3000, () => {
            console.log(`App listening on port: ${server.address().port}`);
        });
    })
    .catch(error => console.log('Error: => ', error));

// Handle incoming connections from clients
io.sockets.on('connection', (socket) => {
    console.log('connected!')
    // Once a client has connected, we expect to get a ping from them saying what room they want to join
    socket.on('room', (gameDetails) => {
        socket.playerName = gameDetails.playerName
        socket.gameName = gameDetails.gameName

        console.log(`${socket.playerName} is joining the room`)
        socket.join(gameDetails.gameName);
        io.sockets.in(gameDetails.gameName).emit('player-join', socket.playerName);
    });
    socket.on('start-game', (gameDetails) => {
        // Ask DB for list of all users in the game and send that back to be stored in state
        Game.findAll({
            where: {
              name: gameDetails.gameName
            }
        }).then(data => {
            const playerList = data.map(gameInfo => gameInfo.dataValues.players).pop()
            io.sockets.in(socket.gameName).emit('start-game', { playerName: socket.playerName, playerList: playerList, gameName: socket.gameName});
        })
    });

    socket.on('disconnect', () => {
        io.sockets.in(socket.gameName).emit('player-leave', { playerName: socket.playerName, gameName: socket.gameName } );
        socket.leave(socket.gameName)
    });
});



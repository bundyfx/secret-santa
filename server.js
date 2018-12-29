// env config
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// Core imports 
// const express = require('express');
// const cookieParser = require('cookie-parser')
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser')
const session = require('express-session');
const cors = require('cors')

// Import routes
const gameRouter = require('./routes/game')();
// const homeRouter = require('./routes/home')();
// const rollRouter = require('./routes/roll')(io);

// Models and DB
const { db } = require('./models');
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


// Define where our static content lives
// app.use(express.static(__dirname + '/public'));

// Cookie parsing middleware
// app.use(cookieParser())

// Routes
app.use('/game', gameRouter);
// app.use('/home', homeRouter);
// app.use('/roll', rollRouter);

// View Engine
// app.set('view engine', 'ejs');

// Main route
// app.get('/', (req, res) => {
//     res.render('index');
// });

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

    socket.on('disconnect', () => {
        io.sockets.in(socket.gameName).emit('player-leave', { playerName: socket.playerName, gameName: socket.gameName } );
        socket.leave(socket.gameName)
    });
});



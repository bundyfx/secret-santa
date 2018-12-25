const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')

const app = express()

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(express.static(__dirname + '/public'))

const actions = [
    "The player left of Soheima, Moves two spots to the left, gifts stay.",
    "The tallest person in the room gives 1 gift to the shortest",
    "The shortest person in the room gives 1 gift to the tallest person",
    "If you can name 4 Netflix original series you collect 1 gift from anybody",
    "If you can name 3 spice girls you can take a gift from anybody",
    "Everyone moves two spots to the left, gifts stay",
    "You move two spots to the right, take your gifts",
    "If you can name the current song playing on Spotify, you can open a gift",
    "Swap places with Johan and gifts stay",
    "If you've been cooking all day open a gift",
    "Can you name three seinfeld characters? if not put a gift back",
    "Take any gift from one of the following people Flynn, Thomas, Rachel",
    "Name three movies that came out this year in 10 seconds or put a gift in the pile",
    "Can you name the TV show Lionel Hutz is from? if not place a gift in the pile",
    "Winner winner chicken dinner take all the gifts in the pile",
    "Name three of Santa's reindeer in 10 seconds or put 1 gift back in the pile",
    "High five the person next to you because you're skipped next round",
    "The person with the least gift can take a gift from the pile or anyone and unwrap it",
    "Unwrap a gift and keep it permanently",
    "Sing along with Spotify for ten seconds and unwrap a gift you have or one in the pile and keep it",
    "The person with the most gifts gives 1 gift to the person with the least",
    "You receive the smallest gift from whomever has it",
    "You receive the best smelling gift from whomever has it",
    "You receive the deadliest gift from whomever has it",
    "Swap places with the person on your left, gifts stay"
]

const randomSaying = [
    "muchwow!",
    "omg",
    "lol",
    "noooooo",
    "woot",
    "yay!"
]

const rollValues = [{
        round: 1,
        roll: 0,
        message: "Grab 1 gift from the pile (leave wrapped)",
    }, {
        round: 1,
        roll: 1,
        message: "Grab 2 gift from the pile  for you and someone else (leave wrapped).",

    },
    {
        round: 1,
        roll: 2,
        message: "The next person is skipped!",

    },
    {
        round: 1,
        roll: 3,
        message: "Grab a gift from the pile and give it to someone else (leave wrapped).",

    },
    {
        round: 1,
        roll: 4,
        message: "The playing order is reversed",

    },
    {
        round: 1,
        roll: 5,
        message: "Grab a gift from the pile and unwrap it.",

    },
    {
        round: 2,
        roll: 0,
        message: "Unwrap one of your gifts. If all gifts are unwrapped, next person.",

    },
    {
        round: 2,
        roll: 1,
        message: "Put one of your presents back in the pile (wrapped or unwrapped)",

    },
    {
        round: 2,
        roll: 2,
        message: "The next person is skipped",

    },
    {
        round: 2,
        roll: 3,
        message: "Give one of your gift to the next person (wrapped or unwrapped)",

    },
    {
        round: 2,
        roll: 4,
        message: "The playing order is reversed",

    },
    {
        round: 2,
        roll: 5,
        message: "Take one gift from the pile and unwrap it. If there are no gifts in the pile, unwrap one of your gifts.",

    },
    {
        round: 3,
        roll: 0,
        message: "Action!",

    },
    {
        round: 3,
        roll: 1,
        message: "Give a present to the person to your right",

    },
    {
        round: 3,
        roll: 2,
        message: "The next person is skipped",

    },
    {
        round: 3,
        roll: 3,
        message: "Take a gift from the pile if there are any. Otherwise take a gift from someone.",

    },
    {
        round: 3,
        roll: 4,
        message: "The playing order is reversed",

    },
    {
        round: 3,
        roll: 5,
        message: "Action!"
    }
]

app.get('/', (req, res) => {
    res.render('index', {
        action: null,
        roll: null,
        randomSaying: 'WELCOME!'
    })
})

app.post('/roll', (req, res) => {
    const round = req.body.round
    const roll = getRandomInt(6)
    const rollMessage = rollValues.filter(item => item.round == round && item.roll == roll).pop()

    res.render('index', {
        action: null,
        roll: String(roll),
        rollMessage: rollMessage.message,
        randomSaying: randomSaying[roll]
    })
})

app.post('/action', (req, res) => {
    const action = randomAction(actions)
    res.render('index', {
        action: action,
        roll: null,
        randomSaying: randomSaying[getRandomInt(6)]
    })
})

app.get('/rules', (req, res) => {
    res.render('rules')
})

const randomAction = (actions) => {
    const randomInt = getRandomInt(actions.length)
    return actions[randomInt]
}

const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}

app.listen(3000)
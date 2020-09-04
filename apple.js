const express = require('express')
const apple = express()
const session = require('express-session')
const MongoStore = require('connect-mongo') (session)

let sessionOptions = session ({
    secret : "mati please fix this cluster",
    resave: false,
    store: new MongoStore ({client: require('./ddb')}),
    saveUninitialized: false,
    cookie : {maxAge:840000,httpOnly:true}
})

const rrouter = require('./rrouter')

apple.use(sessionOptions)
apple.use(express.urlencoded({extended: false}))
apple.use(express.json())

apple.use(express.static('ppublic'))
apple.set('views', 'vview')
apple.set('view engine', 'ejs')

apple.use('/', rrouter)

module.exports = apple
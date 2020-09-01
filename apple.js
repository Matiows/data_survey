const express = require('express')
const apple = express()
const session = require('express-session')
const Mongostore = require('connect-mongo')

let sessionOptions = session ({
    secret : "mati please fix this cluster fuck",
    resave: false,
    store: new Mongostore ({client: require('./db')}),
    saveUninitialized:false,
    cookie : {maxAge:840000,httpOnly:true}
})

const akafay = require('./akafay')

apple.use(express.urlencoded({extended: false}))
apple.use(express.json())
apple.use(session)

apple.use(express.static('public'))
apple.set('views', 'melk')
apple.set('view engine', 'ejs')

apple.use('/', akafay)

module.exports = apple
const express = require('express')
const apple = express()
const session = require('express-session')
const MongoStore = require('connect-mongo') (session)
const flash = require('connect-flash')

let sessionOptions = session ({
    secret : "mati please fix this cluster",
    resave: false,
    store: new MongoStore ({client: require('./db')}),
    saveUninitialized: false,
    cookie : {maxAge:840000,httpOnly:true}
})

const router = require('./router')

apple.use(sessionOptions)
apple.use(express.urlencoded({extended: false}))
apple.use(express.json())

apple.use(express.static('public'))
apple.set('views', 'view')
apple.set('view engine', 'ejs')

apple.use(flash())
apple.use('/', router)

module.exports = apple
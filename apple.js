const express = require('express')
const apple = express()

const akafay = require('./akafay')

apple.use(express.urlencoded({extended: false}))
apple.use(express.json())

apple.use(express.static('public'))
apple.set('views', 'melk')
apple.set('view engine', 'ejs')

apple.use('/', akafay)

module.exports = apple
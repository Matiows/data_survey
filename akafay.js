const express = require('express')
const akafay = express.Router()
const Meri = require('./meri/sewMeri')

akafay.get('/', Meri.bet)

akafay.post('/register', Meri.mezgeb)

module.exports = akafay
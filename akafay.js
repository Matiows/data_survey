const express = require('express')
const akafay = express.Router()
const sewMeri = require('./meri/sewMeri')

akafay.get('/', sewMeri.bet)
akafay.post('/register', sewMeri.mezgeb)
akafay.post('/login', sewMeri.geba)
module.exports = akafay
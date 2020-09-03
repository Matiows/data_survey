const express = require('express')
const rrouter = express.Router()
const uuserController = require('./ccontroller/uuserController')

rrouter.get('/', uuserController.hhome)
rrouter.post('/register', uuserController.rregister)
rrouter.post('/login', uuserController.llogin)
rrouter.post('/logout', uuserController.llogout)

module.exports = rrouter
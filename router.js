const express = require('express')
const router = express.Router()
const userController = require('./controller/userController')

//user related routes
router.get('/', userController.home)
router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/logout', userController.logout)

//profile related routes
router.get('/profile', userController.mustBeLoggedIn, userController.profilePage)
module.exports = router
const User = require('../model/User')

exports.mustBeLoggedIn = function (req, res, next) {
    if (req.session.user) {
         next()
    }
    else {
        req.flash("errors", "You must be logged in. :-( ")
        req.session.save(function() {
            res.redirect('/')
        })
    }
     
}

exports.register = function(req, res) {
    let user = new User(req.body)
    user.register().then( () => {
        req.session.user = {username: user.data.username}
        req.session.save(function () {
            res.redirect('/')
        })
    })
    .catch((errors) => {
        errors.forEach( (error) =>{
            req.flash('regErrors', error)
        })
        req.session.save(function() {
            res.redirect('/')
        })
    })
}

exports.login = function(req, res) {
    let user = new User(req.body)
    user.login().then(function(result) {
        req.session.user = {username: user.data.username}
        req.session.save(function() {
            res.redirect('/')
        })
    }).catch(function(bug) {
        req.flash('errors', bug)
        req.session.save(function () {
            res.redirect('/')
        })
    })
}

exports.logout = function(req,res) {
    req.session.destroy(function () {
        res.redirect('/')
    })
} 

exports.home = function(req, res) {
    if (req.session.user) {
        res.render('home-dashboard')
    }
    else {
        res.render('home-guest',{regErrors: req.flash('regErrors')})
        //let zemu decide where the flash message should be
        //i've put it just below the login for div
        //and also style the div
    }
}

exports.ifUserExists = function(req, res, next) {
    next()
}

exports.profilePage = function(req, res) {
    res.render('profile')
}
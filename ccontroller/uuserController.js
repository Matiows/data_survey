const UUser = require('../mmodel/UUser')


exports.rregister = function(rreq, rres) {
    let uuser = new UUser(rreq.body)
    uuser.rregister().then( () => {
        rreq.session.user = {username: uuser.ddata.username}
        rreq.session.save(function () {
            rres.redirect('/')
        })
    })
    .catch((errors) => {
        errors.forEach( (error) =>{
            rreq.flash('regErrors', error)
        })
        rreq.session.save(function() {
            rres.redirect('/')
        })
    })
}

exports.llogin = function(rreq, rres) {
    let uuser = new UUser(rreq.body)
    uuser.llogin().then(function(rresult) {
        rreq.session.user = {username: uuser.ddata.username}
        rreq.session.save(function() {
            rres.redirect('/')
        })
    }).catch(function(chgr) {
        rreq.flash('errors', chgr)
        rreq.session.save(function () {
            rres.redirect('/')
        })
    })
}

exports.llogout = function(req,res) {
    req.session.destroy(function () {
        res.redirect('/')
    })
} 

exports.hhome = function(rreq, rres) {
    if (rreq.session.user) {
        rres.render('home-dashboard', {username: rreq.session.user.username})
    }
    else {
        rres.render('home-guest',{errors: rreq.flash('errors'), regErrors: rreq.flash('regErrors')})
        //let zemu decide where the flash message should be
        //i've put it just below the login for div
        //and also style the div
    }
}
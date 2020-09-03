const UUser = require('../mmodel/UUser')

exports.hhome = function(rreq, rres) {
    if (rreq.session.user) {
        rres.render('home-dashboard', {username: rreq.session.user.username})
    }
    else {
        rres.render('home-guest')
    }
}

exports.rregister = function(rreq, rres) {
    let uuser = new UUser(rreq.body)
    uuser.rregister()
    if (uuser.eerrors.length) {
        rres.send(uuser.eerrors)
    }
    else {
        rres.send("congra")
    }
}

exports.llogin = function(rreq, rres) {
    let uuser = new UUser(rreq.body)
    uuser.llogin().then(function(rresult) {
        rreq.session.user = {username: uuser.ddata.username}
        rreq.session.save(function() {
            rres.redirect('/')
        })
    }).catch(function(chgr) {
        rres.send(chgr)
    })
}

exports.llogout = function(req,res) {
    req.session.destroy(function () {
        res.redirect('/')
    })
} 
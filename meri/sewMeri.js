const Sew = require('../heg/Sew')

exports.bet = function(tyaqe, mels) {
    if (tyaqe.session.user) {
        //forgot what to do lmao
        //render actual homepage maybe
    }
    else {
        mels.render('wana')
    }
}

exports.mezgeb = function(tyaqe, mels) {
    let sew = new Sew(tyaqe.body)
    sew.mezgeb()
    if (sew.chgroch.length) {
        mels.send(sew.chgroch)
    }
    else {
        mels.send("congra")
    }
}

exports.geba = function(tyaqe, mels) {
    let sew = new Sew(tyaqe.body)
    sew.geba().then(function(wetet) {
        tyaqe.session.user = {username: sew.data.log_username}
        tyaqe.session.save (function () {
            mels.redirect("/")
        })
        //mels.send(wetet)
    }).catch(function(chgr) {
        mels.send(chgr)
    })
}

exports.logout = function(req,res) {
    req.session.destroy(function () {
        res.redirect('/')
    })
}
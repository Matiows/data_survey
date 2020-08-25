const Sew = require('../heg/Sew')

exports.bet = function(tyaqe, mels) {
    mels.render('wana')
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
        mels.send(wetet)
    }).catch(function(chgr) {
        mels.send(chgr)
    })
}
/*
exports.logout = function() {
    
}*/
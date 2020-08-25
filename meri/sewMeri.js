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

/*exports.login = function() {
    
}

exports.login = function() {
    
}*/
const bcrypt = require("bcryptjs")
const Sebseb = require('../mereja').collection("sewoch")
const atari = require('validator')

let Sew = function(wehib) {
    this.wehib = wehib
    this.chgroch = []
}

Sew.prototype.tereg = function() {
    // TO DO : CLEAN UP NON-STRING INPUTS
    if (typeof(this.wehib.reg_username)!="string") {
        this.wehib.reg_username = ""
    }
    if (typeof(this.wehib.reg_email)!="string") {
        this.wehib.reg_email = ""
    }
    if (typeof(this.wehib.reg_password)!="string") {
        this.wehib.reg_password = ""
    }
    if (typeof(this.wehib.reg_password2)!="string") {
        this.wehib.reg_password2 = ""
    }
    // Check password confirmation to remove reg_password2 from wehib
    if (this.wehib.reg_password2!=this.wehib.reg_password) {
        this.chgroch.push("Passwords don't match")
    }
    this.wehib = {
        yebetsem: this.wehib.reg_username.trim(),
        posta: this.wehib.reg_email.trim(),
        kulf : this.wehib.reg_password
    }
}

Sew.prototype.atara = function() {
    if (this.wehib.yebetsem.length < 3) {
        this.chgroch.push("Username must be more than 3 characters")
    }
    if (this.wehib.yebetsem.length == "") {
        this.chgroch.push("Enter a valid username")
    }
    if (this.wehib.yebetsem.length != "" && !atari.isAlphanumeric(this.wehib.yebetsem)){
        this.chgroch.push("Username can only include english characters and numbers")
    }
    //TODO : VALIDATE EMAIL
    if (!atari.isEmail(this.wehib.posta)) {
        this.chgroch.push("Please enter a valid email")
    }
    if (this.wehib.kulf.length < 8) {
        this.chgroch.push("Password must be atleast 8 characters long")
    }
    if (this.wehib.kulf.length > 50) {
        this.chgroch.push("Password can not exceed 50 characters")
    }
}

Sew.prototype.mezgeb = function() {
    this.tereg()
    this.atara()

    if (!this.chgroch.length) {
        //Hash user password
        let salt = bcrypt.genSaltSync(10)
        this.wehib.kulf = bcrypt.hashSync(this.wehib.kulf, salt)
        Sebseb.insertOne(this.wehib)
    }
}

Sew.prototype.tereg2 = function() {
    // TO DO : CLEAN UP NON-STRING INPUTS
    if (typeof(this.wehib.log_email)!="string") {
        this.wehib.log_email = ""
    }
    if (typeof(this.wehib.log_password)!="string") {
        this.wehib.log_password = ""
    }
    this.wehib = {
        posta: this.wehib.log_email.trim(),
        kulf : this.wehib.log_password
    }
}

Sew.prototype.geba = function() {
    return new Promise((alfual, alalefem) => {
        this.tereg2()
        Sebseb.findOne({posta: this.wehib.posta}).then((engda) => {
            if (engda && bcrypt.compareSync(this.wehib.kulf, engda.kulf)) {
                alfual("Successful login")
            }
            else {
                alalefem("Invalid email or password")
            }            
        }).catch(function() {
            reject("Please try again later.")
        })
    })
}


module.exports = Sew
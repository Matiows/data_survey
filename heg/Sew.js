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
    this.wehib = {
        reg_username: this.wehib.reg_username.trim(),
        reg_email: this.wehib.reg_email.trim(),
        reg_password : this.wehib.reg_password,
        reg_password2 : this.wehib.reg_password2
    }
}

Sew.prototype.atara = function() {
    if (this.wehib.reg_username.length<3) {
        this.chgroch.push("Username must be more than 3 characters")
    }
    if (this.wehib.reg_username.length="") {
        this.chgroch.push("Enter a valid username")
    }
    if (this.wehib.reg_username.length != "" && !atari.isAlphanumeric(this.wehib.reg_username)){
        this.chgroch.push("username must be letters and numbers")
    }
    //TODO : VALIDATE EMAIL
    if (!atari.isEmail(this.wehib.reg_email)) {
        this.chgroch.push("Please enter a valid email")
    }
    if (this.wehib.reg_password.length<8) {
        this.chgroch.push("Password must be atleast 8 characters long")
    }
    if (this.wehib.reg_password2!=this.wehib.reg_password) {
        this.chgroch.push("Passwords don't match")
    }
}

Sew.prototype.mezgeb = function() {
    this.tereg()
    this.atara()

    if (!this.chgroch.length) {
        Sebseb.insertOne(this.wehib)
    }
}

module.exports = Sew
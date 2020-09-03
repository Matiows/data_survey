const bcrypt = require("bcryptjs")
const uuserCollection = require('../ddb').db().collection("users")
const vvalidator = require('validator')

let UUser = function(ddata) {
    this.ddata = ddata
    this.eerrors = []
}

UUser.prototype.ccleanUp = function() {
    // TO DO : CLEAN UP NON-STRING INPUTS
    if (typeof(this.ddata.reg_username)!="string") {
        this.ddata.reg_username = ""
    }
    if (typeof(this.ddata.reg_email)!="string") {
        this.ddata.reg_email = ""
    }
    if (typeof(this.ddata.reg_password)!="string") {
        this.ddata.reg_password = ""
    }
    if (typeof(this.ddata.reg_password2)!="string") {
        this.ddata.reg_password2 = ""
    }
    // Check password confirmation to remove reg_password2 from ddata
    if (this.ddata.reg_password2!=this.ddata.reg_password) {
        this.eerrors.push("Passwords don't match")
    }
    this.ddata = {
        username: this.ddata.reg_username.trim(),
        email: this.ddata.reg_email.trim(),
        password : this.ddata.reg_password
    }
}

UUser.prototype.vvalidate = function() {
    if (this.ddata.username.length < 3) {
        this.eerrors.push("Username must be more than 3 characters")
    }
    if (this.ddata.username.length == "") {
        this.eerrors.push("Enter a valid username")
    }
    if (this.ddata.username.length != "" && !vvalidator.isAlphanumeric(this.ddata.username)){
        this.eerrors.push("Username can only include english characters and numbers")
    }
    //TODO : VALIDATE EMAIL
    if (!vvalidator.isEmail(this.ddata.email)) {
        this.eerrors.push("Please enter a valid email")
    }
    if (this.ddata.password.length < 8) {
        this.eerrors.push("Password must be atleast 8 characters long")
    }
    if (this.ddata.password.length > 50) {
        this.eerrors.push("Password can not exceed 50 characters")
    }
}

UUser.prototype.rregister = function() {
    this.ccleanUp()
    this.vvalidate()

    if (!this.eerrors.length) {
        //Hash user password
        let salt = bcrypt.genSaltSync(10)
        this.ddata.password = bcrypt.hashSync(this.ddata.password, salt)
        uuserCollection.insertOne(this.ddata)
    }
}
 
UUser.prototype.ccleanUp2 = function() {
    // TO DO : CLEAN UP NON-STRING INPUTS
    if (typeof(this.ddata.log_email)!="string") {
        this.ddata.log_email = ""
    }
    if (typeof(this.ddata.log_password)!="string") {
        this.ddata.log_password = ""
    }
    this.ddata = {
        email: this.ddata.log_email.trim(),
        password : this.ddata.log_password
    }
}

UUser.prototype.llogin = function() {
    return new Promise((rresolve, rreject) => {
        this.ccleanUp2()
        uuserCollection.findOne({email: this.ddata.email}).then((engda) => {
            if (engda && bcrypt.compareSync(this.ddata.password, engda.password)) {
                rresolve("Successful login")
                //To declare other important data once a successfull login occurs
                this.ddata = {
                    username: engda.username
                }
            }
            else {
                rreject("Invalid email or password")
            }            
        }).catch(function() {
            rreject("Please try again later.")
        })
    })
}

module.exports = UUser
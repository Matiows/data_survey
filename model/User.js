const bcrypt = require("bcryptjs")
const userCollection = require('../db').db().collection("users")
const validator = require('validator')
const { resolveInclude } = require("ejs")

let User = function(data) {
    this.data = data
    this.errors = []
}

User.prototype.cleanUp =  function() {
    // TO DO : CLEAN UP NON-STRING INPUTS
    if (typeof(this.data.reg_username)!="string") {
        this.data.reg_username = ""
    }
    if (typeof(this.data.reg_email)!="string") {
        this.data.reg_email = ""
    }
    if (typeof(this.data.reg_password)!="string") {
        this.data.reg_password = ""
    }
    if (typeof(this.data.reg_password2)!="string") {
        this.data.reg_password2 = ""
    }
    // Check password confirmation to remove reg_password2 from data
    if (this.data.reg_password2!=this.data.reg_password) {
        this.errors.push("Passwords don't match")
    }
    this.data = {
        username: this.data.reg_username.trim(),
        email: this.data.reg_email.trim(),
        password : this.data.reg_password
    }
}

User.prototype.validate = function() {
    return new Promise ( async (resolve,reject) => {
        if (this.data.username.length < 3) {
            this.errors.push("Username must be more than 3 characters")
        }
        if (this.data.username.length == "") {
            this.errors.push("Enter a valid username")
        }
        if (this.data.username.length != "" && !validator.isAlphanumeric(this.data.username)){
            this.errors.push("Username can only include english characters and numbers")
        }
        //TODO : VALIDATE EMAIL
        if (!validator.isEmail(this.data.email)) {
            this.errors.push("Please enter a valid email")
        }
        if (this.data.password.length < 8) {
            this.errors.push("Password must be atleast 8 characters long")
        }
        if (this.data.password.length > 50) {
            this.errors.push("Password can not exceed 50 characters")
        }
        if (this.data.username>2 && this.data.username<32 && validator.isAlphanumeric(this.data.username)) {
            let usernameExists = await userCollection.findOne({username: this.data.username})
            if (usernameExists) {
                this.errors.push("Username already taken")
            }
        }
        if (validator.isEmail(this.data.email)) {
            let emailExists = await userCollection.findOne({email: this.data.email})
            if (emailExists) {
                this.errors.push("Email already being used login to continue")
            }
        }
        resolve()
    })
}
    
   

User.prototype.register = function() {
   return new Promise ( async (resolve,reject) => {
    this.cleanUp()
    await this.validate()

    if (!this.errors.length) {
        //Hash user password
        let salt = bcrypt.genSaltSync(10)
        this.data.password = bcrypt.hashSync(this.data.password, salt)
       await userCollection.insertOne(this.data)
       resolve()
    }
    else {
        reject(this.errors)
    }
   })
}
 
User.prototype.cleanUp2 = function() {
    // TO DO : CLEAN UP NON-STRING INPUTS
    if (typeof(this.data.log_email)!="string") {
        this.data.log_email = ""
    }
    if (typeof(this.data.log_password)!="string") {
        this.data.log_password = ""
    }
    this.data = {
        email: this.data.log_email.trim(),
        password : this.data.log_password
    }
}

User.prototype.login = function() {
    return new Promise((result, reject) => {
        this.cleanUp2()
        userCollection.findOne({email: this.data.email}).then((guest) => {
            if (guest && bcrypt.compareSync(this.data.password, guest.password)) {
                result("Successful login")
                //To declare other important data once a successfull login occurs
                this.data = {
                    username: guest.username
                }
            }
            else {
                reject("Invalid email or password")
            }            
        }).catch(function() {
            reject("Please try again later.")
        })
    })
}

module.exports = User

export default class registrationForm {

    constructor() {
        //Add the name later lol
        this.entireField = document.querySelectorAll("#registration-form .form-control") 
        this.insertValidationElements()
        this.username = document.querySelector("#username")
        this.username.previousValue = ""
        this.email = document.querySelector("#defaultRegisterFormEmail")
        this.email.previousValue = ""
        this.password = document.querySelector("#defaultRegisterFormPassword")
        this.password.previousValue = ""
        this.events()
    }
    
    //events
    events() {
        //TODO DISABLE FORM SUBMIT UNTIL ERRORS ARE CHECKED
        this.username.addEventListener('keyup', () => {
            this.isDifferent(this.username, this.usernameHandler)
        })
        this.email.addEventListener('keyup', () => {
            this.isDifferent(this.email, this.emailHandler)
        })
        this.password.addEventListener('keyup', () => {
            this.isDifferent(this.password, this.passwordHandler)
        })
    }
    isDifferent (el, handler) {
        if (el.value!=el.previousValue) {
            handler.call(this)
        }
        el.previousValue = el.value
    }
    usernameHandler() {
        this.username.errors = false
        this.usernameImmediate()
        clearTimeout(this.username.timer)
        this.username.timer = setTimeout(() => this.usernameDelayed (), 800);
    }
    usernameImmediate () {
        if (this.username.value!="" && !/^([a-zA-Z0-9]+)$/.test(this.username.value)){
            this.showValidationErrors(this.username, "username cannot contain non alphanumeric characters")
        }
        if(!this.username.errors) {
            this.hideValidationErors(this.username)
        }
    }
    emailHandler() {
        this.email.errors = false
        clearTimeout(this.email.timer)
        this.email.timer = setTimeout(() => {
            this.emailDelayed()
        }, 800);

    }

    emailDelayed () {
        if(!/^\S+@\S+$/.test(this.email.value)){
            this.showValidationErrors(this.email, "you must provide a valid email address")
        }
        if (!this.email.errors) {
            this.hideValidationErors(this.email)
            //TODO CHECK IF EMAIL IS ALREADY TAKEN
        }
    }
    passwordHandler () {
        
        this.password.errors = false
        this.passwordImmediate()
        clearTimeout(this.password.timer)
        this.password.timer = setTimeout(() => {
            this.passwordDelayed()
        }, 800);


    }
    passwordDelayed () {
        if (this.password.value.length<12) {
            this.showValidationErrors(this.password, "password must be atleast 12 characters long")
        }
    }
    passwordImmediate () {
        if (this.password.value.length > 50) {
            this.showValidationErrors(this.password, "password cannot be more than 50 characters")
        }
        if(!this.password.errors) {
            this.hideValidationErors(this.password)
        }
    }
    
    hideValidationErors(el) {
        el.nextElementSibling.classList.remove("liveValidateMessage--visible")
    }
    
      showValidationErrors(el, message) {
        el.nextElementSibling.innerHTML = message
        el.nextElementSibling.classList.add("liveValidateMessage--visible")
        el.errors = true
    }
    usernameDelayed () {
        if(this.username.value.length<3) {
            this.showValidationErrors(this.username,"username must be more than 3 characters")
        }
        if (!this.username.errors) {
            //TODO CHECK IF USERNAME IS ALREADY TAKEN
        }
    }
    insertValidationElements () {
        this.entireField.forEach(function (el) {
            //edit the div later
            el.insertAdjacentHTML('afterend', '<div class="alert alert-danger small liveValidateMessage"></div>') 
        })
    }
}

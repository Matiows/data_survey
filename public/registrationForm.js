
export default class registrationForm {

    constructor() {
        //Add the name later lol
        this.entireField = document.querySelectorAll("#registration-form .form-control") 
        this.insertValidationElements()
        this.username = document.querySelector("#username")
        this.username.previousValue = ""
        this.events()
    }
    
    //events
    events() {
        //TODO DISABLE FORM SUBMIT UNTIL ERRORS ARE CHECKED
        this.username.addEventListener('keyup', () => {
            this.isDifferent(this.username, this.usernameHandler)
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
    
    hideValidationErors(el) {
        el.nextElementSibling.classList.remove("liveValidateMessage--visible")
    }
    
      showValidationErrors(el, message) {
        el.nextElementSibling.innerHTML = message
        el.nextElementSibling.classList.add("liveValidateMessage--visible")
        el.errors = true
    }
    usernameDelayed () {
        if(this.username.value<3) {
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

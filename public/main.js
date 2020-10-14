import Registration from './registrationForm.js'
import Search from './search.js'

// only loads if their is a registration form
if (document.querySelector("#registration-form")) {
    new Registration()
}
// only loads if there is a search icon
if (document.querySelector(".navSearch")) {
    new Search()
}

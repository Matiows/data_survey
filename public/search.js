export default class Search {
    // 1. Select Dom elements, and keep track of ant useful data
    constructor() {
        this.navSearchIcon = document.querySelector(".header-search-icon")
        this.events()
    }

    //2. Events
    events() {
        this.navSearchIcon.addEventListener("click", (e) => {
            e.preventDefault()
            this.openSearch()
        })
    }
    openSearch() {
        alert("searching . . . .")
    }
}
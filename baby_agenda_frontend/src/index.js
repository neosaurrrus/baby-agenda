const ACTIVITIES_URL = "http://localhost:3000/activities"
const USERS_URL = "http://localhost:3000/users"
const SESSIONS_URL = "http://localhost:3000/sessions"
const AGENDA_URL = "http://localhost:3000/items"
let session = {
    name: "Guest",
    id: null
}



class Fetcher { //Responsible for handling fetches to the back end
    static get(url){
        return fetch(url)
        .then (res =>res.json())
    }
    static data(url, method, data){
        return (
            fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(data)
        })
        .then (res =>res.json())
        )
    }

}

class UI{
    static getFetcher(url){
        return fetch(url)
        .then (res =>res.json())
    }
    static dataFetcher(url, method, data){
        return (
            fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(data)
        })
        .then (res =>res.json())
        )
    }



    static openActivitySplash(){
        const node = document.createElement("div")
        node.setAttribute(`id`,`activity-splash`)
        document.getElementById("activities-wrapper").appendChild(node)
        return node
    }
    static closeActivitySplash() {
        const activitySplash = document.getElementById(`activity-splash`)
        if (activitySplash) {activitySplash.remove() }
        new Nav()
    }
    static closeLogonSplash() {
        const loginSplash = document.getElementById(`login-splash`)
        if (loginSplash) {loginSplash.remove()}
        new Nav()
    }

    static refreshActivities(){
        document.getElementById(`activities-wrapper`).innerHTML = ""
        new Nav()
        Activity.all()
    }
    static refreshAgenda(){
        document.getElementById(`agenda-wrapper`).innerHTML = ""
        document.getElementById(`user-wrapper`).setAttribute(`style`,`display:grid`)
        document.getElementById(`activities-header`).textContent = `Availiable Quests for ${session.baby_name}` 
        new Agenda()
    }
    static refreshBaby(){
        document.getElementById(`baby-wrapper`).innerHTML = ""
        new Baby()
    }
  
    static buildElement(target,element, attributeName, attributeValue, textValue){
        const node = document.createElement(element)
        node.setAttribute(attributeName,attributeValue)
        const node_text = document.createTextNode(textValue)
        node.appendChild(node_text)
        target.appendChild(node)
    }
    static currentUser(id){
        return session.id == id
    }
    static loggedIn(){
        return Boolean(session.id)
    }
}


class Activity{
    constructor(activity){
        this.name = activity.name,
        this.id = activity.id,
        this.upvotes = activity.upvotes,
        this.downvotes = activity.downvotes
        this.render()
    }

    static all(){
        document.getElementById(`activities-wrapper`).innerHTML = ""
        Fetcher.get(ACTIVITIES_URL).then( data => {
            data.forEach(activity => {
              return new Activity(activity)
            })
        })
        .catch(err => console.log(err))
    }

    render(){
     
        const activity_node = document.createElement("div")
        const activity_votes_node = document.createElement("div")
        activity_node.setAttribute('class', 'activity-card')
        UI.buildElement(activity_node, "h3", "class", "activity-text", this.name)
    
        UI.buildElement(activity_votes_node, "span", "class", "activity-upvotes", `😃 ${this.upvotes} `)
        UI.buildElement(activity_votes_node, "span", "class", "activity-upvotes", `😒 ${this.downvotes}`)
          

        
        //Details Button
        UI.buildElement(activity_node, "button", "id", `show-button-${this.id}`, "Details")
        activity_node.appendChild(activity_votes_node)
        document.getElementById("activities-wrapper").appendChild(activity_node)
        this.setShowButtonEvent()
    }

    setShowButtonEvent(){
        const detailsButton = document.getElementById(`show-button-${this.id}`)
        detailsButton.addEventListener("click", (e) => {
            Fetcher.get(`http://localhost:3000/activities/${this.id}`)
            .then( a => {
                new ActivityShow(a)
            })
        })
    }
    
} //end of activity

class ActivityShow { 
    constructor(activity){
        this.name = activity.name,
        this.id = activity.id,
        this.description = activity.description,
        this.minimum_age = activity.minimum_age,
        this.minimum_time_taken = activity.minimum_time_taken,
        this.upvotes = activity.upvotes,
        this.downvotes = activity.downvotes
        this.user_id = activity.user_id
        this.renderActivityShow()
    }
     showCloseEvent(){
        const showCloseButton = document.getElementById(`show-close-button`)
        showCloseButton.addEventListener("click", (e) => {
            UI.closeActivitySplash()
        })
    }
    showEditEvent(){
        const showEditButton = document.getElementById(`show-edit-button`)
        showEditButton.addEventListener("click", (e) => {
            UI.closeActivitySplash()
            this.renderEditActivityForm()

        })
    }

    showAgendaEvent(){
        
        const showAgendaButton = document.getElementById(`show-agenda-button`)
        showAgendaButton.addEventListener("click", (e) => {
            UI.closeActivitySplash()
            Agenda.add(this)
        })
    }
    showDeleteEvent(){
        const showDeleteButton = document.getElementById(`show-delete-button`)
        showDeleteButton.addEventListener("click", (e) => {
            this.submitDeleteActivity(e)
        })
    }

    renderEditActivityForm(){
        //splash
        const edit_activity_node = document.createElement("div")
        edit_activity_node.setAttribute(`id`,`activity-splash`)
        //title
        const edit_activity_title_node = document.createElement("h3")
        const edit_activity_title_node_text = document.createTextNode("edit a New Activity")
        edit_activity_title_node.appendChild(edit_activity_title_node_text)
        //actual form
        const editActivityForm = document.createElement("div")
        editActivityForm.innerHTML = `
            <form id="edit-activity-form"> 
            <label for="edit_activity_name">Name:</label>
            <input type="text" id="edit_activity_name" value="${this.name}" placeholder="Enter a short name for the activity">
            <label for="edit_activity_description">Description:</label>
            <input type="text" id="edit_activity_description" value="${this.description}" placeholder="Describe the activity">
            <label for="edit_activity_age">Minimum Recommended Age:</label>
            <select name="edit_activity_age" id="edit_activity_age" value="${this.minimum_age}>
                <option value="under6">Less than 6 Months</option>
                <option value="6-12">6-12 Months</option>
                <option value="12-24">12-24 Months</option>
                <option value="over24">Over 24 Months</option>
            </select>
            <label for="edit_activity_time">how long does it take?</label>
            <select name="edit_activity_time" id="edit_activity_time" value=${this.minimum_time_taken}>
                <option value="under10">Less than 10 Minutes</option>
                <option value="10-30">10-30 Minutes</option>
                <option value="30-60">30-60 Minutes</option>
                <option value="over60">Over 60 Minutes</option>
            </select>
            <input type="submit" id="edit-activity-submit" value="Submit Edits">
            <input type="hidden" id="edit-activity-id" value=${this.id} >
            </form>
        `
        
        const edit_activity_close_node = document.createElement("button")
        edit_activity_close_node.setAttribute(`id`,`edit-cancel-button`)
        const edit_activity_close_node_text = document.createTextNode("Cancel")
        edit_activity_close_node.appendChild(edit_activity_close_node_text)


        edit_activity_node.appendChild(edit_activity_title_node)
        edit_activity_node.appendChild(editActivityForm)
        edit_activity_node.appendChild(edit_activity_close_node)
        
        
        document.getElementById("activities-wrapper").appendChild(edit_activity_node)
        this.editCancelEvent()
        this.editSubmitEvent()
    }

    editCancelEvent(){
        const button = document.getElementById(`edit-cancel-button`)
        button.addEventListener("click", (e) => {
            UI.closeActivitySplash()
        })
    }
    editSubmitEvent(e){
        const form = document.getElementById(`edit-activity-form`)
        form.addEventListener("submit", (e) => {
            e.preventDefault()
            this.submitEditActivity(e)
        })
    }
    submitEditActivity(e){
        const data = {
            name:e.target[0].value, 
            description:e.target[1].value,
            minimum_age:e.target[2].value,
            minimum_time_taken:e.target[3].value,   
            id:e.target[5].value
        } 
        Fetcher.data(ACTIVITIES_URL+`/${data.id}`, "PUT", data)
        .then(() => {
            UI.closeActivitySplash()
            UI.refreshActivities()
        })
        .catch(err => console.log(err))

    }

    submitDeleteActivity(){
        const data = {
            id:this.id, 
        } 
        Fetcher.data(ACTIVITIES_URL+`/${this.id}`, "DELETE", data)
        .then(() => {
            UI.closeActivitySplash()
            UI.refreshActivities()
        })
        .catch(err => console.log(err))
    
    }


    renderActivityShow(){
        const activity_node = document.createElement("div")
        activity_node.setAttribute(`id`,`activity-splash`)
        UI.buildElement(activity_node, "h3", "class", "show-activity-name", `${this.name}`)
        UI.buildElement(activity_node, "p", "class", "show-activity-description", `${this.description}`)
        UI.buildElement(activity_node, "p", "class", "show-activity-minimum-age", `Minimum recommended age: ${this.minimum_age}`)
        UI.buildElement(activity_node, "p", "class", "show-activity-time-taken", `Minimum time: ${this.minimum_time_taken}`)
        UI.buildElement(activity_node, "p", "class", "show-activity-upvotes", `Liked: ${this.upvotes}`)
        UI.buildElement(activity_node, "p", "class", "show-activity-downvotes", `Disiked: ${this.downvotes}`)
        document.getElementById("activities-wrapper").appendChild(activity_node)
        //buttons
        console.log(this)
        if (UI.currentUser(this.user_id)){
            UI.buildElement(activity_node, "button", "id", "show-edit-button", `Edit`)
            UI.buildElement(activity_node, "button", "id", "show-delete-button", `Delete`)
            this.showEditEvent()
            this.showDeleteEvent()
        }
        if (UI.loggedIn()){
            console.log(UI.loggedIn)
            UI.buildElement(activity_node, "button", "id", "show-agenda-button", "Add to Agenda")
            this.showAgendaEvent()
        }
        UI.buildElement(activity_node, "button", "id", "show-close-button", "Close")
        this.showCloseEvent()
    }
} //end of ActivityShow


class NewActivity {
    constructor(){ 
        this.renderNewActivityForm()
    }

    renderNewActivityForm(){
        //splash
        const add_activity_node = document.createElement("div")
        add_activity_node.setAttribute(`id`,`activity-splash`)
        //title
        const add_activity_title_node = document.createElement("h2")
        const add_activity_title_node_text = document.createTextNode("Add a New Quest")
        add_activity_title_node.appendChild(add_activity_title_node_text)
        //actual form
        const addActivityForm = document.createElement("div")
        addActivityForm.innerHTML = `
            <form id="form-wrapper"> 
            <div>
            <label for="add_activity_name">Name:</label><br>
            <input type="text" id="add_activity_name" placeholder="Enter a short name for the quest">
            </div>
            <div>
            <label for="add_activity_description">Description:</label>
            <textarea id="add_activity_description" width="80%" placeholder="Describe the baby's quest"></textarea> 
            </div>
            <div>
            <label for="add_activity_age">Minimum Recommended Age:</label>
            <select name="add_activity_age" id="add_activity_age">
                <option value="under6">Less than 6 Months</option>
                <option value="6-12">6-12 Months</option>
                <option value="12-24">12-24 Months</option>
                <option value="over24">Over 24 Months</option>
            </select>
            </div>
            <div>
            <label for="add_activity_time">How long does it take?</label>
            <select name="add_activity_time" id="add_activity_time">
                <option value="under10">Less than 10 Minutes</option>
                <option value="10-30">10-30 Minutes</option>
                <option value="30-60">30-60 Minutes</option>
                <option value="over60">Over 60 Minutes</option>
            </select>
            </div>
            <input type="hidden" id="user_id" value="1">
            <input type="submit" id="submit">
            </form>
        `
        
        const add_activity_close_node = document.createElement("button")
        add_activity_close_node.setAttribute(`id`,`form-cancel-button`)
        const add_activity_close_node_text = document.createTextNode("Cancel")
        add_activity_close_node.appendChild(add_activity_close_node_text)


        add_activity_node.appendChild(add_activity_title_node)
        add_activity_node.appendChild(addActivityForm)
        add_activity_node.appendChild(add_activity_close_node)
        
        
        document.getElementById("activities-wrapper").appendChild(add_activity_node)
        this.addCancelEvent()
        this.addSubmitEvent()
    }

    addCancelEvent(){
        const button = document.getElementById(`form-cancel-button`)
        button.addEventListener("click", (e) => {
            UI.closeActivitySplash()
        })
    }
    addSubmitEvent(e){
        const form = document.getElementById(`form-wrapper`)
        form.addEventListener("submit", (e) => {
            e.preventDefault()
            this.submitNewActivity(e)
        })
    }
    submitNewActivity(e){
        const data = {
            name:e.target[0].value, 
            description:e.target[1].value,
            minimum_age:e.target[2].value,
            minimum_time_taken:e.target[3].value,
            user_id:e.target[4].value
        } 
        fetch(ACTIVITIES_URL, "POST", data)
        .then(res => {
            UI.closeActivitySplash()
            UI.refreshActivities()})
        .catch(err => console.log(err))
    }
}

class Nav {
    constructor(){
        this.nav = document.querySelector("nav")
        this.session = document.querySelector("#session-status")
        this.nav.innerHTML = ""
        this.session.innerHTML = ""
        if (UI.loggedIn()){
            this.renderSession()
            this.renderNewActivityButton()
            this.renderLogoutButton()
        } else {
            this.renderLoginButton()
            this.renderSignupButton()
        }
        

       
    }

    

    renderSession(){
            UI.buildElement(this.session, "div", "id", "session-text", `${session.name}`)  
    }
    renderNewActivityButton(){
        UI.buildElement(this.nav, "button", "id", "add-activity-button", "New Activity")
        const newActivityButton = document.getElementById(`add-activity-button`)
        newActivityButton.addEventListener("click", (e) => {
            return new NewActivity()
        })
    }
    renderLoginButton(){
        UI.buildElement(this.nav, "button", "id", "login-button", "Login")
        const button = document.getElementById(`login-button`)
        button.addEventListener("click", (e) => {
            return new Login()
        })
    }
    renderLogoutButton(){
        UI.buildElement(this.nav, "button", "id", "logout-button", "Logout")
        const button = document.getElementById(`logout-button`)
        button.addEventListener("click", (e) => {
            return new Logout()
        })
    }
    renderSignupButton(){
        UI.buildElement(this.nav, "button", "id", "signup-button", "Signup")
        const button = document.getElementById(`signup-button`)
        button.addEventListener("click", (e) => {
            return new Signup()
        })
    }
}

class Signup {
    constructor(){
        this.renderSignupForm()
    }
    renderSignupForm(){
        //splash
        const signupNode = UI.openActivitySplash()
        //title
        UI.buildElement(signupNode, "h2", "id", "form-heading", "Signup for full access")
        //actual form
        const form = document.createElement("div")
        form.innerHTML = `
            <form id="form-wrapper"> 
            <div>
                <label for="name">Name:</label><br>
                <input type="text" id="name" placeholder="Provide a username">
            </div>
            <div>
                <label for="password">Password:</label><br>
                <input type="password" id="password">
            </div>
            <div>
                <label for="baby_name">Baby Name:</label><br>
                <input type="text" id="baby_name" placeholder= "Provide your Baby's name">
            </div>
            <div>
                <label for="baby_dob">Baby DOB:</label><br>
                <input type="date" id="baby_dob">
            </div>
           
                
            <div>
                <input type="submit" id="submit" value="Sign up!">
            </div>
            </form>
        `
        signupNode.appendChild(form)
        UI.buildElement(signupNode, "button", "id", "form-cancel-button", "Cancel")
        
        this.submitSignup()
        this.signupCancelEvent()
         }

    signupCancelEvent(){
        const button = document.getElementById(`form-cancel-button`)
        button.addEventListener("click", (e) => {
            UI.closeActivitySplash()
        })
    }
    submitSignup(e){
        const form = document.getElementById(`form-wrapper`)
        form.addEventListener("submit", (e) => {
            e.preventDefault()
            const data = {
                name:e.target[0].value, 
                password:e.target[1].value,
                baby_name:e.target[2].value,
                baby_dob:e.target[3].value,
            } 
            Fetcher.data(USERS_URL, "POST", {user:data})
            .then(res => {
                Login.updateSession(res)
                UI.closeLogonSplash()
                UI.refreshAgenda()
                UI.refreshActivities()
            })
            .catch(err => console.log(err))
        })
    }
    
}

class Login {
    static checkSession(){
        return session
    }

    static updateSession(user){
        if (user.error) {this.resetSession()}
        else { 
            session.name = user.name
            session.baby_name = user.baby_name
            session.baby_dob = user.dob
            session.id = user.id  
            session.babyPoints = user.baby_points
        }
        new Baby(user)
    }
   

    constructor(){ 
        this.renderNewLoginForm()
    }

    renderNewLoginForm(){
        //splash
        const add_activity_node = document.createElement("div")
        add_activity_node.setAttribute(`id`,`login-splash`)
        //title
        const add_activity_title_node = document.createElement("h2")
        const add_activity_title_node_text = document.createTextNode("Log back in to continue your baby's adventure")
        add_activity_title_node.appendChild(add_activity_title_node_text)
        //actual form
        const addActivityForm = document.createElement("div")
        addActivityForm.innerHTML = `
            <form id="form-wrapper"> 
            <div>
            <label for="add_activity_name">Name:</label><br>
            <input type="text" id="add_activity_name" placeholder="Your username">
            </div>
            <div>
            <label for="add_activity_description">Password:</label>
            <input type="password" id="add_activity_password" placeholder="Your previous password">
            </div>
            <input type="submit" id="submit" value="Login">
            </form>
        `
        
        const add_activity_close_node = document.createElement("button")
        add_activity_close_node.setAttribute(`id`,`form-cancel-button`)
        const add_activity_close_node_text = document.createTextNode("Cancel")
        add_activity_close_node.appendChild(add_activity_close_node_text)


        add_activity_node.appendChild(add_activity_title_node)
        add_activity_node.appendChild(addActivityForm)
        add_activity_node.appendChild(add_activity_close_node)
        
        
        document.getElementById("activities-wrapper").appendChild(add_activity_node)
        this.loginCancelEvent()
        this.loginSubmitEvent()
    }

    loginCancelEvent(){
        const button = document.getElementById(`form-cancel-button`)
        button.addEventListener("click", (e) => {
            UI.closeLogonSplash()
        })
    }
    loginSubmitEvent(e){
        const form = document.getElementById(`form-wrapper`)
        form.addEventListener("submit", (e) => {
            e.preventDefault()
            this.submitLogin(e)
        })
    }
    submitLogin(e){
        const data = {
            name:e.target[0].value, 
            password:e.target[1].value,
        } 
        Fetcher.data(SESSIONS_URL, "POST", data)
        .then(res => {
            Login.updateSession(res)
            UI.closeLogonSplash()
            UI.refreshAgenda()
        })
        .catch(err => console.log(err))
    }
}

class Logout{
    constructor(){
        this.resetSession()
    }
    resetSession(){
        session.name = "Guest"
        session.baby_name = null
        session.baby_dob =  null
        session.id =  null
        session.babyPoints = null
        document.getElementById(`user-wrapper`).setAttribute(`style`,`display:none`) 
        document.getElementById(`session-text`).innerHTML = ""
        document.getElementById(`activities-header`).textContent = "You have logged out sucessfully."
        new Nav()
    }
}

class Agenda{ //handles fetching, management and display of a User's Agenda Items
    constructor(activity){
        if (UI.loggedIn()){
            this.buildAgenda()
        }
        
        //add new agenda to agenda area with subsequent mouseover for show and buttons
    }

    //all method - to show all agenda Items

    buildAgenda(){
        document.getElementById(`agenda-wrapper`).innerHTML = `<h3>${session.baby_name}'s Current Quests`

        fetch(USERS_URL+"/"+session.id)
        .then(resp => resp.json())
        .catch(err => console.log(err))
        .then(res => {
            console.log(res)
           res.forEach(item =>{
               console.log(item.name+item.upvotes)
               return new AgendaItem(item)
           })
        }) 

    }


    //addAgendaItem method - Add Agenda Item to Agenda
    static add(activity){
                const data = {
                    activity_id: activity.id,
                    user_id: session.id,
                    name: activity.name,
                    description: activity.description,
                    minimum_age: activity.minimum_age,
                    minimum_time_taken: activity.minimum_time_taken,
                    upvotes: activity.upvotes,
                    downvotes: activity.downvotes,
                } 
         
                Fetcher.data(AGENDA_URL, "POST", data)
                .then(res => {
                    UI.refreshActivities()
                    new Agenda
                })  
                .catch(err => console.log(err))
    }
}

class AgendaItem {
    constructor(item){
        this.name = item.name,
        this.id = item.id,
        this.activity_id = item.activity_id
        this.description = item.description,
        this.minimum_age = item.minimum_age,
        this.minimum_time_taken = item.minimum_time_taken,
        this.upvotes = item.upvotes,
        this.downvotes = item.downvotes
        this.render()
        this.upvoteEvent()
        this.downvoteEvent()
    }
    render(){
        const agenda_node = document.createElement("div")
        agenda_node.setAttribute('class', 'agenda-card')
        UI.buildElement(agenda_node, "h4", "class", "agenda-title", `${this.name}`)
       
        UI.buildElement(agenda_node, "button", "id", `${this.id}u`, `👍`)
        UI.buildElement(agenda_node, "button", "id",`${this.id}d`, `👎`)

        
        document.getElementById("agenda-wrapper").appendChild(agenda_node)
    }
    completeActivity(){
        session.babyPoints += 100
        
        Fetcher.data(USERS_URL+"/"+session.id, "PUT", {id: session.id, baby_points:session.babyPoints}) 
        .then(res => {
            UI.refreshActivities()
            new Baby(res)
        })
        .catch(err => console.log(err))
    }

    upvoteEvent(){
        const button = document.getElementById(this.id+"u")
        button.addEventListener("click", (e) => {
            this.voteSubmit("upvote")
        })
    }
    downvoteEvent(){
        const button = document.getElementById(this.id+"d")
        button.addEventListener("click", (e) => {
            this.voteSubmit("downvote")
        })
    }

    voteSubmit(voteType){
        const data = {
            upvotes: this.upvotes,
            downvotes: this.downvotes,
            id: this.activity_id,
            user_id: session.id
        } 
        if (voteType === "upvote"){
            data.upvotes = this.upvotes+ 1
          
        } else if (voteType === "downvote") {
            data.downvotes = this.downvotes+ 1
        }
    
        Fetcher.data(ACTIVITIES_URL+`/${this.activity_id}`,"PUT",data)
        .then(() => this.completeActivity())
        .catch(err => console.log(err))

        Fetcher.data(AGENDA_URL+`/${this.id}`, "DELETE", data)
        .then((res) => {
            new Agenda
            UI.refreshActivities()})
        .catch(err => console.log(err))
    }
}

class Baby{
    constructor(user){
        this.babyPoints = user.baby_points
        this.babyName = user.baby_name
        this.babyDob = user.baby_dob.toString()
        this.parseLevel()
        this.parseDob()
        this.render()
    }

    parseLevel(){
        console.log(this.babyPoints)
        if (this.babyPoints === 0){
            this.babyLevel = 0
        }
        else {
            this.babyLevel = Math.floor(this.babyPoints / 1 )
        }
    }
    parseDob(){
        let dob = {
            day: Number(this.babyDob.slice(-2)),
            month: Number(this.babyDob.slice(-5,-3)),
            year: Number(this.babyDob .slice(0,4))
        }
        let dobDate = new Date(`${dob.month}/${dob.day}/${dob.year}`)
        let todaysDate = Date.now()
        let differenceInSeconds = todaysDate - dobDate
    
        let differenceInDays = differenceInSeconds / (1000 *3600 *24)
        let differenceInMonths = differenceInDays / 30
        let differenceInYears = differenceInSeconds / (1000 * 31556952)
        this.dateInfo = {
            totalYears : Math.floor(differenceInYears),
            totalMonths : Math.floor(differenceInMonths),
            totalDays: Math.floor(differenceInDays),
            totalWeeks: Math.floor(differenceInDays / 7),
        }
        this.dateInfo.remainingMonths= Math.floor(this.dateInfo.totalMonths % 12),
        this.dateInfo.remainingDays=Math.floor((this.dateInfo.totalDays % 365) % 30),
        this.dateInfo.remainingWeeks=Math.floor((this.dateInfo.totalDays % 365) / 7)

    }

    render(){
        const wrapper = document.getElementById("baby-wrapper")
        wrapper.innerHTML = ``
        UI.buildElement(wrapper, "h2", "id", "baby_profile_name", this.babyName)
        UI.buildElement(wrapper, "h3", "id", "baby_profile_xp", `Level:${this.babyLevel}`)
        UI.buildElement(wrapper, "h4", "id", "baby_profile_age", `${this.dateInfo.totalYears} year(s), ${this.dateInfo.remainingMonths} month(s) and ${this.dateInfo.remainingDays} day(s) old`)
    }
}


//Actual runtime
UI.refreshActivities()

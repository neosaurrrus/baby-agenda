const ACTIVITIES_URL = "http://localhost:3000/activities"
const USERS_URL = "http://localhost:3000/users"
const SESSIONS_URL = "http://localhost:3000/sessions"
const AGENDA_URL = "http://localhost:3000/items"
let session = {
    name: "Guest",
    id: null
}


class Helper {
    static fetcher(url){
        return fetch(url)
        .then (res =>res.json())
    }

    static refreshAll(){
        document.getElementById(`activities-wrapper`).innerHTML = ""
        const activitySplash = document.getElementById(`activity-splash`)
        if (activitySplash) {activitySplash.remove() }
        const loginSplash = document.getElementById(`login-splash`)
        if (loginSplash) {loginSplash.remove()}
        new Nav()
        
        Activity.all()
    }
    static refreshAgenda(){
        document.getElementById(`agenda-wrapper`).innerHTML = ""
        new Agenda()
    }

    static openActivitySplash(){
        const node = document.createElement("div")
        node.setAttribute(`id`,`activity-splash`)
        document.getElementById("activities-wrapper").appendChild(node)
        return node
    }
    static closeActivitySplash(){
        document.getElementById(`activity-splash`).remove()
    }

    static buildElement(target,element, attributeName, attributeValue, textValue){
        const node = document.createElement(element)
        node.setAttribute(attributeName,attributeValue)
        const node_text = document.createTextNode(textValue)
        node.appendChild(node_text)
        target.appendChild(node)
    }
    static currentUser(){
        return session.id
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
        fetch(ACTIVITIES_URL)
        .then (res => res.json())
        .then( data => {
            data.forEach(activity => {
              return new Activity(activity)
            })
        })
        .catch(err => console.log(err))
    }

    render(){
     
        const activity_node = document.createElement("div")
        activity_node.setAttribute('class', 'activity-card')
        const activity_name_node = document.createElement("h3")
        const activity_name_node_text = document.createTextNode(this.name)
        activity_name_node.appendChild(activity_name_node_text)
        activity_node.appendChild(activity_name_node)

        
        //Details Button
        const activity_show_node = document.createElement("button")
        activity_show_node.setAttribute(`id`,`show-button-${this.id}`)
        const activity_show_node_text = document.createTextNode("Details")
        activity_show_node.appendChild(activity_show_node_text)
        activity_node.appendChild(activity_show_node)
        document.getElementById("activities-wrapper").appendChild(activity_node)
        this.setShowButtonEvent()
    }

    setShowButtonEvent(){
        const detailsButton = document.getElementById(`show-button-${this.id}`)
        detailsButton.addEventListener("click", (e) => {
            const act =  Helper.fetcher(`http://localhost:3000/activities/${this.id}`)
            act.then( a => {
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
        this.renderActivityShow()
    }

  
    //need to add remove event listeners to stop the 2 activites bug
     showCloseEvent(){
        const showCloseButton = document.getElementById(`show-close-button`)
        showCloseButton.addEventListener("click", (e) => {
            Helper.refreshAll()
        })
    }
    showEditEvent(){
        const showEditButton = document.getElementById(`show-edit-button`)
        showEditButton.addEventListener("click", (e) => {
            Helper.closeActivitySplash()
            this.renderEditActivityForm()

        })
    }

    showAgendaEvent(){
        
        const showAgendaButton = document.getElementById(`show-agenda-button`)
        showAgendaButton.addEventListener("click", (e) => {
            Helper.closeActivitySplash()
            console.log(this)
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
            <input type="submit" id="edit-activity-submit">
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
            Helper.refreshAll()
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
        fetch(ACTIVITIES_URL+`/${data.id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(data)
        })
        .then(resp => resp.json())
        .then(() => {Helper.refreshAll()})
        .catch(err => console.log(err))

    }

    submitDeleteActivity(){
        const data = {
            id:this.id, 
        } 
        fetch(ACTIVITIES_URL+`/${this.id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(data)
        })
        .then(resp => resp.json())
        .then(data => {Helper.refreshAll()})
        .catch(err => console.log(err))
    
    }


    renderActivityShow(){
        const activity_node = document.createElement("div")
        activity_node.setAttribute(`id`,`activity-splash`)
        const activity_name_node = document.createElement("h3")
        const activity_name_node_text = document.createTextNode(this.name)
        activity_name_node.appendChild(activity_name_node_text)
        activity_node.appendChild(activity_name_node)
        const activity_description_node = document.createElement("p")
        const activity_description_node_text = document.createTextNode(this.description)
        activity_description_node.appendChild(activity_description_node_text)
        activity_node.appendChild(activity_description_node)

        const activity_minimum_age_node = document.createElement("p")
        const activity_minimum_age_node_text = document.createTextNode(this.minimum_age)
        activity_minimum_age_node.appendChild(activity_minimum_age_node_text)
        activity_node.appendChild(activity_minimum_age_node)

        const activity_minimum_time_taken_node = document.createElement("p")
        const activity_minimum_time_taken_node_text = document.createTextNode(this.minimum_time_taken)
        activity_minimum_time_taken_node.appendChild(activity_minimum_time_taken_node_text)
        activity_node.appendChild(activity_minimum_time_taken_node)

        const activity_upvotes_node = document.createElement("p")
        const activity_upvotes_node_text = document.createTextNode(this.upvotes)
        activity_upvotes_node.appendChild(activity_upvotes_node_text)
        activity_node.appendChild(activity_upvotes_node)

        const activity_downvotes_node = document.createElement("p")
        const activity_downvotes_node_text = document.createTextNode(this.downvotes)
        activity_downvotes_node.appendChild(activity_downvotes_node_text)
        activity_node.appendChild(activity_downvotes_node)
        
        //logged in buttons
        if (Helper.currentUser()){
            const activity_edit_node = document.createElement("button")
            activity_edit_node.setAttribute(`id`,`show-edit-button`)
            const activity_edit_node_text = document.createTextNode("Edit")
            activity_edit_node.appendChild(activity_edit_node_text)
            activity_node.appendChild(activity_edit_node)
            //delete
            const activity_delete_node = document.createElement("button")
            activity_delete_node.setAttribute(`id`,`show-delete-button`)
            const activity_delete_node_text = document.createTextNode("delete")
            activity_delete_node.appendChild(activity_delete_node_text)
            activity_node.appendChild(activity_delete_node)
            //Add to agenda.
            
            Helper.buildElement(activity_node, "button", "id", "show-agenda-button", "Add to Agenda")
          
        }
        




        const activity_close_node = document.createElement("button")
        activity_close_node.setAttribute(`id`,`show-close-button`)
        const activity_close_node_text = document.createTextNode("Close")
        activity_close_node.appendChild(activity_close_node_text)
        activity_node.appendChild(activity_close_node)
        document.getElementById("activities-wrapper").appendChild(activity_node)
        this.showCloseEvent()
        this.showEditEvent()
        this.showDeleteEvent()
        this.showAgendaEvent()
      
    
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
            <input type="submit" id="add-activity-submit">
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
            Helper.refreshAll()
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
        fetch(ACTIVITIES_URL, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(data)
        })
        .then(resp => resp.json())
        .then(res => {Helper.refreshAll()})
        .catch(err => console.log(err))
    }
}

class Nav {
    constructor(){
        this.nav = document.querySelector("nav")
        this.session = document.querySelector("#session-status")
        this.nav.innerHTML = ""
        this.session.innerHTML = ""
        if (Helper.currentUser()){
            this.renderSession()
            this.renderNewActivityButton()
            this.renderLogoutButton()
        } else {
            this.renderLoginButton()
            this.renderSignupButton()
        }
        

       
    }

    

    renderSession(){
            Helper.buildElement(this.session, "div", "id", "session-text", `${session.name}`)  
    }
    renderNewActivityButton(){
        Helper.buildElement(this.nav, "button", "id", "add-activity-button", "New Activity")
        const newActivityButton = document.getElementById(`add-activity-button`)
        newActivityButton.addEventListener("click", (e) => {
            return new NewActivity()
        })
    }
    renderLoginButton(){
        Helper.buildElement(this.nav, "button", "id", "login-button", "Login")
        const button = document.getElementById(`login-button`)
        button.addEventListener("click", (e) => {
            return new Login()
        })
    }
    renderLogoutButton(){
        Helper.buildElement(this.nav, "button", "id", "logout-button", "Logout")
        const button = document.getElementById(`logout-button`)
        button.addEventListener("click", (e) => {
            return new Logout()
        })
    }
    renderSignupButton(){
        Helper.buildElement(this.nav, "button", "id", "signup-button", "Signup")
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
        const signupNode = Helper.openActivitySplash()
        //title
        Helper.buildElement(signupNode, "h2", "id", "form-heading", "Signup for full access")
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
                <input type="submit" id="add-activity-submit">
            </div>
            </form>
        `
        signupNode.appendChild(form)
        Helper.buildElement(signupNode, "button", "id", "form-cancel-button", "Cancel")
        
        this.submitSignup()
        document.getElementById(`form-cancel-button`).addEventListener("click", (e) => {Helper.refreshAll()})
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
      
            fetch(SESSIONS_URL, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify(data)
            })
            .then(resp => resp.json())
            .catch(err => console.log(err))
            .then(res => {
                console.log(res)
                Login.updateSession(res)
                Helper.refreshAll()
            })
            
        })
    }
    
}

class Login {
    static checkSession(){
        //fetch session info 
        return session
    }

    static updateSession(user){
        if (user.error) {this.resetSession()}
        else {
            session.name = user.name
            session.baby_name = user.baby_name
            session.baby_dob = user.dob
            session.id = user.id  
        }
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
            <input type="submit" id="add-activity-submit">
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
            Helper.refreshAll()
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
        fetch(SESSIONS_URL, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(data)
        })
        .then(resp => resp.json())
        .then(res => {
            // error handle failed login
            Login.updateSession(res)
            Helper.refreshAll()
            Helper.refreshAgenda()
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
        Helper.refreshAll()
    }
}

class Agenda{ //handles fetching, management and display of a User's Agenda Items
    constructor(activity){
        if (Helper.currentUser()){
            this.buildAgenda()
        }
        
        //add new agenda to agenda area with subsequent mouseover for show and buttons
    }

    //all method - to show all agenda Items

    buildAgenda(){
        document.getElementById(`agenda-wrapper`).innerHTML = `<h3>${session.baby_name}'s Quests`

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
            console.log(activity)
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
         
                fetch(AGENDA_URL, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                    body: JSON.stringify(data)
                })
                .then(resp => resp.json())
                .catch(err => console.log(err))
                .then(res => {
                    new Agenda
                }) 
    }
    
}


//Actual stull the app runs
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
        Helper.buildElement(agenda_node, "h3", "class", "agenda-title", `${this.name}`)
       
        Helper.buildElement(agenda_node, "button", "id", `${this.id}u`, `Upvote`)
        Helper.buildElement(agenda_node, "button", "id",`${this.id}d`, `Downvote`)
        Helper.buildElement(agenda_node, "button", "id", "agenda_details", `Details`)
        
        document.getElementById("agenda-wrapper").appendChild(agenda_node)
    }

    upvoteEvent(){
        const button = document.getElementById(this.id+"u")
    
        button.addEventListener("click", (e) => {
            this.upvoteSubmit()
        })
    }
    upvoteSubmit(){
        const newUpvoteCount = this.upvotes+ 1
        console.log(newUpvoteCount)
        //get name of item (easy)
        //fetch put request to update an activity with an upvote
        const data = {
            upvotes: newUpvoteCount,
            id: this.activity_id,
            user_id: session.id
        } 
     
        fetch(ACTIVITIES_URL+`/${this.activity_id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },

            body: JSON.stringify(data)
        })
        .then(resp => resp.json())
        .then((res) => {
            console.log("Upvote Given!")}
            )
        .catch(err => console.log(err))

        fetch(AGENDA_URL+`/${this.id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(data)
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data.message)
            new Agenda
            Helper.refreshAll()})
        .catch(err => console.log(err))
    }

    

    downvoteEvent(){

    }

}


Helper.refreshAll()





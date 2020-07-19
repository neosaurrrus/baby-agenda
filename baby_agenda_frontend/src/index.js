const ACTIVITIES_URL = "http://localhost:3000/activities"


class Fetcher {
    constructor(url){
        return fetch(url)
        .then (res =>res.json())
    }
}


class Activity {
    constructor(activity){
        this.name = activity.name,
        this.id = activity.id,
        this.description = activity.description,
        this.minimum_age = activity.minimum_age,
        this.minimum_time_taken = activity.minimum_time_taken,
        this.upvotes = activity.upvotes,
        this.downvotes = activity.downvotes
        this.render()
    }
    static index(){
        const allActivities =  new Fetcher(ACTIVITIES_URL)
        allActivities.then( activity => {
            activity.forEach(activity => {
                return new Activity(activity)
            })
        })
    }

    setDetailsEvent(){
        const detailsButton = document.getElementById(`details-button-${this.id}`)
        detailsButton.addEventListener("click", (e) => {
            ActivityShow.fetchDetails(this.id)
        })
    }

    render(){
        const activity_node = document.createElement("div")
        const activity_name_node = document.createElement("h3")
        const activity_name_node_text = document.createTextNode(this.name)
        activity_name_node.appendChild(activity_name_node_text)
        activity_node.appendChild(activity_name_node)

        
        //Details Button
        const activity_details_node = document.createElement("button")
        activity_details_node.setAttribute(`id`,`details-button-${this.id}`)
        const activity_details_node_text = document.createTextNode("Details")
        activity_details_node.appendChild(activity_details_node_text)
        activity_node.appendChild(activity_details_node)
        document.getElementById("activities-wrapper").appendChild(activity_node)
        this.setDetailsEvent()
    }
    
}

class ActivityShow {
    constructor(activity){
        this.render(activity)
    }
    static fetchDetails(id){
        const act =  new Fetcher(`http://localhost:3000/activities/${id}`)
        act.then( a => {
              
                ActivityShow.render(a)
            })
    }
    //need to add remove event listeners to stop the 2 activites bug
    static showCloseEvent(){
        const showCloseButton = document.getElementById(`show-close-button`)
        showCloseButton.addEventListener("click", (e) => {
            document.getElementById(`activity-splash`).remove()
        })
    }
    static showEditEvent(){
        const showEditButton = document.getElementById(`show-edit-button`)
        showEditButton.addEventListener("click", (e) => {
            document.getElementById(`activity-splash`).innerHTML = ""
            ActivityShow.renderEditActivityForm()

        })
    }

    static hideShow(){
        document.getElementById(`activity-show`).style.display = "none"
    }

    static renderEditActivityForm(){
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
            <input type="text" id="edit_activity_name" value="k" placeholder="Enter a short name for the activity">
            <label for="edit_activity_description">Description:</label>
            <input type="text" id="edit_activity_description" placeholder="Describe the activity">
            <label for="edit_activity_age">Minimum Recommended Age:</label>
            <select name="edit_activity_age" id="edit_activity_age">
                <option value="under6">Less than 6 Months</option>
                <option value="6-12">6-12 Months</option>
                <option value="12-24">12-24 Months</option>
                <option value="over24">Over 24 Months</option>
            </select>
            <label for="edit_activity_time">how long does it take?</label>
            <select name="edit_activity_time" id="edit_activity_time">
                <option value="under10">Less than 10 Minutes</option>
                <option value="10-30">10-30 Minutes</option>
                <option value="30-60">30-60 Minutes</option>
                <option value="over60">Over 60 Minutes</option>
            </select>
            <input type="submit" id="edit-activity-submit">
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
        ActivityShow.editCancelEvent()
        ActivityShow.editSubmitEvent()
    }

    static editCancelEvent(){
        const button = document.getElementById(`edit-cancel-button`)
        button.addEventListener("click", (e) => {
            document.getElementById(`activity-splash`).remove()
        })
    }
    static editSubmitEvent(e){
        const form = document.getElementById(`edit-activity-form`)
        form.addEventListener("submit", (e) => {
            e.preventDefault()
            ActivityShow.submitEditActivity(e)
        })
    }
    static submitEditActivity(e){
        const data = {
            name:e.target[0].value, 
            description:e.target[1].value,
            minimum_age:e.target[2].value,
            minimum_time_taken:e.target[3].value
        } 
        console.log(e)
        fetch(ACTIVITIES_URL+"/1", {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(data)
        })
        .then(resp => resp.json())
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }


    static render(a){
        const activity_node = document.createElement("div")
        activity_node.setAttribute(`id`,`activity-splash`)
        const activity_name_node = document.createElement("h3")
        const activity_name_node_text = document.createTextNode(a.name)
        activity_name_node.appendChild(activity_name_node_text)
        activity_node.appendChild(activity_name_node)
        const activity_description_node = document.createElement("p")
        const activity_description_node_text = document.createTextNode(a.description)
        activity_description_node.appendChild(activity_description_node_text)
        activity_node.appendChild(activity_description_node)

        const activity_minimum_age_node = document.createElement("p")
        const activity_minimum_age_node_text = document.createTextNode(a.minimum_age)
        activity_minimum_age_node.appendChild(activity_minimum_age_node_text)
        activity_node.appendChild(activity_minimum_age_node)

        const activity_minimum_time_taken_node = document.createElement("p")
        const activity_minimum_time_taken_node_text = document.createTextNode(a.minimum_time_taken)
        activity_minimum_time_taken_node.appendChild(activity_minimum_time_taken_node_text)
        activity_node.appendChild(activity_minimum_time_taken_node)

        const activity_upvotes_node = document.createElement("p")
        const activity_upvotes_node_text = document.createTextNode(a.upvotes)
        activity_upvotes_node.appendChild(activity_upvotes_node_text)
        activity_node.appendChild(activity_upvotes_node)

        const activity_downvotes_node = document.createElement("p")
        const activity_downvotes_node_text = document.createTextNode(a.downvotes)
        activity_downvotes_node.appendChild(activity_downvotes_node_text)
        activity_node.appendChild(activity_downvotes_node)
        
        //edit button
        const activity_edit_node = document.createElement("button")
        activity_edit_node.setAttribute(`id`,`show-edit-button`)
        const activity_edit_node_text = document.createTextNode("Edit")
        activity_edit_node.appendChild(activity_edit_node_text)
        activity_node.appendChild(activity_edit_node)
        //delete
        const activity_close_node = document.createElement("button")
        activity_close_node.setAttribute(`id`,`show-close-button`)
        const activity_close_node_text = document.createTextNode("Close")
        activity_close_node.appendChild(activity_close_node_text)
        activity_node.appendChild(activity_close_node)
        document.getElementById("activities-wrapper").appendChild(activity_node)
        ActivityShow.showCloseEvent()
        ActivityShow.showEditEvent()
    
    }

} //end of ActivityShow


class NewActivity {
    constructor(){
        
        this.renderNewActivityButton()
        this.newActivityButtonEvent()
    }

    newActivityButtonEvent(){
        const showCloseButton = document.getElementById(`add-activity-button`)
        showCloseButton.addEventListener("click", (e) => {
            this.renderNewActivityForm()
        })
    }

    renderNewActivityForm(){
        //splash
        const add_activity_node = document.createElement("div")
        add_activity_node.setAttribute(`id`,`activity-splash`)
        //title
        const add_activity_title_node = document.createElement("h3")
        const add_activity_title_node_text = document.createTextNode("Add a New Activity")
        add_activity_title_node.appendChild(add_activity_title_node_text)
        //actual form
        const addActivityForm = document.createElement("div")
        addActivityForm.innerHTML = `
            <form id="add-activity-form"> 
            <label for="add_activity_name">Name:</label>
            <input type="text" id="add_activity_name" placeholder="Enter a short name for the activity">
            <label for="add_activity_description">Description:</label>
            <input type="text" id="add_activity_description" placeholder="Describe the activity">
            <label for="add_activity_age">Minimum Recommended Age:</label>
            <select name="add_activity_age" id="add_activity_age">
                <option value="under6">Less than 6 Months</option>
                <option value="6-12">6-12 Months</option>
                <option value="12-24">12-24 Months</option>
                <option value="over24">Over 24 Months</option>
            </select>
            <label for="add_activity_time">how long does it take?</label>
            <select name="add_activity_time" id="add_activity_time">
                <option value="under10">Less than 10 Minutes</option>
                <option value="10-30">10-30 Minutes</option>
                <option value="30-60">30-60 Minutes</option>
                <option value="over60">Over 60 Minutes</option>
            </select>
            <input type="submit" id="add-activity-submit">
            </form>
        `
        
        const add_activity_close_node = document.createElement("button")
        add_activity_close_node.setAttribute(`id`,`add-cancel-button`)
        const add_activity_close_node_text = document.createTextNode("Cancel")
        add_activity_close_node.appendChild(add_activity_close_node_text)


        add_activity_node.appendChild(add_activity_title_node)
        add_activity_node.appendChild(addActivityForm)
        add_activity_node.appendChild(add_activity_close_node)
        
        
        document.getElementById("activities-wrapper").appendChild(add_activity_node)
        this.addCancelEvent()
        this.addSubmitEvent()
    }

    renderNewActivityButton(){
        const add_activity_node = document.createElement("button")
        add_activity_node.setAttribute(`id`,`add-activity-button`)
        const add_activity_node_text = document.createTextNode("New Activity")
        add_activity_node.appendChild(add_activity_node_text)
        document.querySelector("nav").appendChild(add_activity_node)
    }

    addCancelEvent(){
        const button = document.getElementById(`add-cancel-button`)
        button.addEventListener("click", (e) => {
            document.getElementById(`activity-splash`).remove()
        })
    }
    addSubmitEvent(e){
        const form = document.getElementById(`add-activity-form`)
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
            minimum_time_taken:e.target[3].value
        } 
        fetch(ACTIVITIES_NEW_URL, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(data)
        })
        .then(resp => resp.json())
        .then(res => new Activity(res))
        .catch(err => console.log(err))
    }
}


//Things that run (maybe all in an init afterwards)
new NewActivity()
Activity.index()


//something to build agenda



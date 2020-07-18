
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
        const allActivities =  new Fetcher("http://localhost:3000/activities")
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
            document.getElementById(`activity-show`).remove()
        })
    }

    static hideShow(){
        document.getElementById(`activity-show`).style.display = "none"
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
        //Details Button
        const activity_details_node = document.createElement("button")
        activity_details_node.setAttribute(`id`,`show-close-button`)
        const activity_details_node_text = document.createTextNode("Close")
        activity_details_node.appendChild(activity_details_node_text)
        activity_node.appendChild(activity_details_node)
        document.getElementById("activities-wrapper").appendChild(activity_node)
        ActivityShow.showCloseEvent()
    
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
            <form id="add_activity_form"> 
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
        console.log(document.getElementById('add-activity-submit'))
        const button = document.getElementById(`add-activity-submit`)
  
        button.addEventListener("click", (e) => {
            e.preventDefault()
            this.submitNewActivity(e)
        })
    }
    submitNewActivity(e){
        console.log(e)
    }
}


//Things that run (maybe all in an init afterwards)
new NewActivity()
Activity.index()
//something to set add activity button

//something to build agenda



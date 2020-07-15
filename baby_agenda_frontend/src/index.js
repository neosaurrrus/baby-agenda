
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

    static wrapper(){
        return document.getElementById("activities-wrapper")
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
        Activity.wrapper().appendChild(activity_node)
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
        activity_node.setAttribute(`id`,`activity-show`)
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



}


Activity.index()


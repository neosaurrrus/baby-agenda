function getActivities(){
    return fetch('http://localhost:3000/activities')
    .then (res =>res.json())
}

function renderActivity(activity){
    const activities_wrapper = document.getElementById("activities-wrapper")
    const activity_node = document.createElement("div")

    const activity_name_node = document.createElement("h3")
    const activity_name_node_text = document.createTextNode(activity.name)
    activity_name_node.appendChild(activity_name_node_text)
    activity_node.appendChild(activity_name_node)

    const activity_description_node = document.createElement("p")
    const activity_description_node_text = document.createTextNode(activity.description)
    activity_description_node.appendChild(activity_description_node_text)
    activity_node.appendChild(activity_description_node)

    const activity_minimum_age_node = document.createElement("p")
    const activity_minimum_age_node_text = document.createTextNode(activity.minimum_age)
    activity_minimum_age_node.appendChild(activity_minimum_age_node_text)
    activity_node.appendChild(activity_minimum_age_node)

    const activity_minimum_time_taken_node = document.createElement("p")
    const activity_minimum_time_taken_node_text = document.createTextNode(activity.minimum_time_taken)
    activity_minimum_time_taken_node.appendChild(activity_minimum_time_taken_node_text)
    activity_node.appendChild(activity_minimum_time_taken_node)

    const activity_upvotes_node = document.createElement("p")
    const activity_upvotes_node_text = document.createTextNode(activity.upvotes)
    activity_upvotes_node.appendChild(activity_upvotes_node_text)
    activity_node.appendChild(activity_upvotes_node)

    const activity_downvotes_node = document.createElement("p")
    const activity_downvotes_node_text = document.createTextNode(activity.downvotes)
    activity_downvotes_node.appendChild(activity_downvotes_node_text)
    activity_node.appendChild(activity_downvotes_node)

    activities_wrapper.appendChild(activity_node)
}



//Start of Javascript

getActivities().then( activity => {
    activity.forEach(activity => {
        renderActivity(activity)
    })
})




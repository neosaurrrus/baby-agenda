function getActivities(){
    return fetch('http://localhost:3000/activities')
    .then (res =>res.json())
}

getActivities().then( activity => {
    activity.forEach(activity => {
        console.log(activity)
    })
})


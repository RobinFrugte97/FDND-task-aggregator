export function findSprint(topics) {
    let sprint = ""
    topics.forEach(topic => {
        if (topic.toLowerCase().match("sprint")) {
            sprint = topic.replace(/-/g, ' ')
            sprint = sprint.charAt(0).toUpperCase() + sprint.slice(1)
            return sprint = parseInt(sprint.slice(-1))
        }
    })
    return sprint
}
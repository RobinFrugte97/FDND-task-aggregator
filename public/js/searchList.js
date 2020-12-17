// Function that loops through a task's taglist to try and find a match with the user query.
function findTag(tags, query) {
    let foundTag = false
    tags.forEach(tag => {
        if (tag.toLowerCase().match(query)) {
            return foundTag = true
        }
    })
    return foundTag
}

// Function that checks if the user input matches either the title, sprint name, semester name or the tags of a task.
export function searchList(list, query) {
    return list.filter(item => {
        if (findTag(item.tags, query.toLowerCase()) || item.title.toLowerCase().match(query.toLowerCase()) || item.semesterName.toLowerCase().match(query.toLowerCase()) || item.sprintName.toLowerCase().match(query.toLowerCase())) {
            return true
        }
    })
} 
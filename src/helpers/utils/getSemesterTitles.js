export function getSemesterTitles(displayTaskList) {
    let titles = []
    displayTaskList.map(task => {
        // uncomment if-statement if you want to prevent placeholder data from rendering
        
        // if(Number.isInteger(task.semester)) {
            titles.push(task.semester)
        // }
    })
    return titles = removeDuplicates(titles)
}

// Array duplication removal function from https://dev.to/mshin1995/back-to-basics-removing-duplicates-from-an-array-55he
 export function removeDuplicates(titles) {
    let noDupes = []
    titles.map(title => {
        if (!noDupes.includes(title)) {
            noDupes.push(title)
        }
    })
    return noDupes
}
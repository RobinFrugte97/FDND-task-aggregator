// Function that returns an array with titles without duplicates.
export function getTaskTitles(displayTaskList) {
    let titles = []
    displayTaskList.map(task => titles.push(task.title))
    return titles = removeDuplicates(titles)
}

// Array duplication removal function from https://dev.to/mshin1995/back-to-basics-removing-duplicates-from-an-array-55he
function removeDuplicates(array) {
    let a = []
    array.map(x => {
        if (!a.includes(x)) {
        a.push(x)
    }})
    return a
};
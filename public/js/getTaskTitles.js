import { removeDuplicates } from '../js/removeDuplicates.js'
// Function that returns an array with titles without duplicates.
export function getTaskTitles(displayTaskList) {
    let titles = []
    displayTaskList.map(task => titles.push(task.title))
    return titles = removeDuplicates(titles)
}


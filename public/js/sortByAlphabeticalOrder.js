// Function that sorts the tasks in alphabetical order based on the task title.
export function sortByAlphabeticalOrder(taskList) {
    return taskList.sort((a, b) => 
        a.title.localeCompare(b.title)
    )
}
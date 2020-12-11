export function sortByAlphabeticalOrder(taskList) {
    return taskList.sort((a, b) => 
        a.title.localeCompare(b.title)
    )
}
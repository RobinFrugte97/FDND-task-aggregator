// Function that sorts the tasks in alphabetical order based on the task title.
export function sortByReverseAlphabeticalOrder(taskList) {
    taskList.sort((a, b) => 
        a.title.localeCompare(b.title)
	)
	return taskList.reverse()
}
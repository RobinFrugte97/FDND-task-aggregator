// Function that sorts the tasks in alphabetical order based on the task title.
export function sortByReverseDifficultyOrder(taskList) {
	taskList.sort((a, b) => {
		return a['task-difficulty'] - b['task-difficulty']
	})
	return taskList.reverse()
}
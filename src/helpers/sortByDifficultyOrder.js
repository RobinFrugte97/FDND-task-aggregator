// Function that sorts the tasks based on task sprint.
// Function that sorts the tasks in alphabetical order based on the task title.
export function sortByDifficultyOrder(taskList) {
	taskList.sort((a, b) => {
		return a['task-difficulty'] - b['task-difficulty']
	})
	return taskList
}
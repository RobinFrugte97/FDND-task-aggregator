// Function that sorts the tasks based on task sprint.
export function sortByDifficultyOrder(taskList) {
	return taskList.sort((a, b) => {
		 return a.sprint - b.sprint
 })
}
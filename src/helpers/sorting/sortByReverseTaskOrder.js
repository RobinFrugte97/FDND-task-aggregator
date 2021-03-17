// Function that sorts the tasks based on task sprint.
export function sortByReverseTaskOrder(taskList) {
   	taskList.sort((a, b) => {
            return a.sprint - b.sprint
	})
	return taskList.reverse()
}
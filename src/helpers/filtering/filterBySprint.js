export function filterBySprint(value, taskList) {
	const filteredTaskList = taskList.filter(task => task.sprintName === value)
	return filteredTaskList
}
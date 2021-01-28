export function filterBySprint(value, taskList) {
	const filteredTaskList = taskList.filter(task => task.sprintName === value)
	console.log(filteredTaskList)
	return filteredTaskList
}
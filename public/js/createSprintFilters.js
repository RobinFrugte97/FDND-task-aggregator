import { removeDuplicates } from '../js/removeDuplicates.js'

export function createSprintFilters(taskList) {
	let sprints = []
	taskList.map(task => sprints.push(task.sprintName))
	sprints = removeDuplicates(sprints)
	return sprints
}
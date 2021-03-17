<script>
	import { searchList } from "../helpers/searching/searchList.js"
	import { getTaskTitles } from "../helpers/utils/getTaskTitles.js"

	import TaskSearch from "./TaskSearch.svelte"
	import SprintTasksContainer from "./SprintTasksContainer.svelte"

    export let semesterTasks
    export let sprint
	export let semester
	export let displayTaskList

    let searchTerm = ""
	let taskTitles = []

	// finalTasks is an object containing the final, sorted, version of the tasklist.
    let finalTasks = {tasks: [], dummy: {"title": "Task", "taskList": []}}
	let dummyData = {
		"client": "FDND",
		"semesterName": displayTaskList.filter(task => task.semester === semester)[0].semesterName,
		"sprintName": sprint,
		"support-level": 1,
		"tags": ["semantiek", "responsive design", "ui-interacties", "html", "css", "javascript"],
		"title": "Task",
		"url": "https://github.com/fdnd-task/fdnd-net-presence-example"
	}
	
	
    // Filter the list of tasks based on the given sprint. 
    const filter = (value, list) => filterBySprint(value, list)
	
	function filterBySprint(value, taskList) {
		// Filter all semester tasks based on the current sprint name.
		const filteredTaskList = taskList.filter(task => task.sprintName === value.sprint)
		
		// Create a list of titles
		taskTitles = getTaskTitles(filteredTaskList)

		return finalTasks.tasks = filteredTaskList
	}
	
	function sortSprintTasks(taskList) {
		// Create an object for each task
		let stacks = taskTitles.map(title => {
			return {
				"title": title.title,
				"client": title.client,
				"taskList": []
			}
		})
		
		// Put all tasks in the correct task array
		taskList.forEach(task => {
			stacks.forEach(stack => {
				if(stack.title == task.title && stack.client == task.client) {
					stack.taskList.push(task)
				}
			})
		})
		// Sort the task arrays based on support level
		stacks.forEach(task =>
		task.taskList.sort((a, b) => b["support-level"] - a["support-level"])
		)
		
		let counter = stacks.length
		// Add dummydata until the total amount of tasks in a group is 12.
		while(counter < 12) {
			counter++
			finalTasks.dummy.taskList.push(dummyData)
		}
		return finalTasks.tasks = stacks
	}

	// Fire function to begin sorting the tasks to sprints.
    sortSprintTasks(filter(sprint, semesterTasks))
</script>
<!-- Sprint specific search form-->
<TaskSearch bind:searchTerm bind:taskTitles on:updateSearch={
	() => {
		finalTasks.dummy.taskList = []
		// The task list of this sprint is automatically updated on "updateSearch"
		finalTasks.tasks = searchList(semesterTasks, searchTerm)
		// Refire sort function with the filtered tasklist based on search input.
		sortSprintTasks(filter(sprint, finalTasks.tasks))
	}
}/>

<SprintTasksContainer bind:finalTasks />



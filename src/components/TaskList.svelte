<script>
	import { searchList } from "../../public/js/searchList.js"
	import { getTaskTitles } from "../../public/js/getTaskTitles.js"

    import Task from "./Task.svelte"
	import TaskSearch from "../components/TaskSearch.svelte"

    export let semesterTasks
    export let sprint
	export let semester
	export let displayTaskList

    let finalTasks = []
    let searchTerm = ""
	let taskTitles = []
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
    const filter = (value) => filterBySprint(value, semesterTasks)
	
	function filterBySprint(value, taskList) {
		// Filter all semester tasks based on the current sprint name.
		const filteredTaskList = taskList.filter(task => task.sprintName === value)
		
		// Create a list of titles
		taskTitles = getTaskTitles(filteredTaskList)

		return finalTasks = filteredTaskList
	}
	function sortSprintTasks(taskList) {
		// Create an object for each task
		let base = taskTitles.map(title => {
			return {
				"title": title,
				"taskList": []
			}
		})
		// Add dummydata
		if (taskList.length < 12) {
			base.push({
				"title": "Task",
				"taskList": []
			})
			while(taskList.length < 12) {
				taskList.push(dummyData)
			}
		}
		// Put all tasks in the correct task array
		taskList.forEach(task => {
			base.forEach(e => {
				if(e.title == task.title) {
					e.taskList.push(task)
				}
			})
		})
		// Sort the task arrays based on support level
		base.forEach(task =>
				task.taskList.sort((a, b) => a["support-level"] - b["support-level"])
		)

		console.log(base)
		return finalTasks = base
	}
    sortSprintTasks(filter(sprint))
</script>

<!-- Sprint specific search form-->
<TaskSearch bind:searchTerm bind:taskTitles on:updateSearch={
	() => {
		// The task list of this sprint is automatically updated on "updateSearch"
		finalTasks = searchList(semesterTasks, searchTerm)
	}
}/>


<div>
	<!--Svelte each-block. This loops through the array of data and feeds each entry to a "Task" component-->
    {#each finalTasks as group}
		<!-- Group can be used to stack cards for example -->
		{#each group.taskList as task}
			<!--Task component, with a copy of the task data.-->
			<Task bind:task />
    	{/each}
    {:else}
        <!--This "else" is shown if displayTaskList is empty or otherwise not compatible 
        with the each-block.-->
        <p>No result...</p>
    {/each}
</div>


<style>
    div {
		margin: 1rem 0 1rem;
		padding-top: .25rem;
	}
	@media (min-width: 40em) {
		div{
			display: grid;
			grid-template-columns: 1fr 1fr;
			grid-gap: 1em;
			
		}
	}

	@media (min-width: 60em) {
		div {
			grid-template-columns: 1fr 1fr 1fr;
		}
	}
</style>
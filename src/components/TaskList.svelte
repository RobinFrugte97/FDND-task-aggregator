<script>
	import { searchList } from "../../public/js/searchList.js"
	import { getTaskTitles } from "../../public/js/getTaskTitles.js"

    import Task from "./Task.svelte"
    import TaskSelection from "./TaskSelection.svelte"
	import TaskSearch from "./TaskSearch.svelte"

    export let semesterTasks
    export let sprint
	export let semester
	export let displayTaskList

    let finalTasks = {tasks: [], dummy: {"title": "Task", "taskList": []}}
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
	let selection = []
	let isActive = false
	let relative = true
	
    // Filter the list of tasks based on the given sprint. 
    const filter = (value) => filterBySprint(value, semesterTasks)
	
	function filterBySprint(value, taskList) {
		// Filter all semester tasks based on the current sprint name.
		const filteredTaskList = taskList.filter(task => task.sprintName === value)
		
		// Create a list of titles
		taskTitles = getTaskTitles(filteredTaskList)

		return finalTasks.tasks = filteredTaskList
	}
	function sortSprintTasks(taskList) {
		// Create an object for each task
		let groups = taskTitles.map(title => {
			return {
				"title": title,
				"taskList": []
			}
		})
		
		// Put all tasks in the correct task array
		taskList.forEach(task => {
			groups.forEach(group => {
				if(group.title == task.title) {
					group.taskList.push(task)
				}
			})
		})
		// Sort the task arrays based on support level
		groups.forEach(task =>
			task.taskList.sort((a, b) => a["support-level"] - b["support-level"])
		)
		let counter = groups.length
		// Add dummydata
		while(counter < 12) {
			counter++
			finalTasks.dummy.taskList.push(dummyData)
		}
		return finalTasks.tasks = groups
	}
    sortSprintTasks(filter(sprint))
	console.log(finalTasks)
</script>

<!-- Sprint specific search form-->
<TaskSearch bind:searchTerm bind:taskTitles on:updateSearch={
	() => {
		// The task list of this sprint is automatically updated on "updateSearch"
		finalTasks = searchList(semesterTasks, searchTerm)
	}
}/>

<TaskSelection bind:selection bind:isActive />


<main>
	<!--Svelte each-block. This loops through the array of data and feeds each entry to a "Task" component-->
    {#each finalTasks.tasks as group}
		<!-- Group can be used to stack cards for example -->
		<div id="stack" on:click|preventDefault={()=>{
				selection = group.taskList;
				isActive = true
			}}> 
			{#each group.taskList as task}
			<!--Task component, with a copy of the task data.-->
			<Task bind:task bind:group />
    	{/each}
		</div>
    {/each}
	{#each finalTasks.dummy.taskList as task}
			<Task bind:task bind:relative/>

	{/each}
</main>


<style>
	#stack {
		height: 10em;
	}
    main {
		margin: 1rem 0 1rem;
		padding-top: .25rem;
	}
	@media (min-width: 40em) {
		main{
			display: grid;
			grid-template-columns: 1fr 1fr;
			grid-gap: 1em;
			
		}
	}

	@media (min-width: 60em) {
		main {
			grid-template-columns: 1fr 1fr 1fr;
		}
	}
</style>
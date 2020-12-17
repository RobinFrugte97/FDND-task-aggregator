<script>
	import { onMount } from "svelte"
	import { searchList } from "../public/js/searchList.js"
	// import { sortByTaskOrder } from "../public/js/sortByTaskOrder.js" 						/* SPRINT SORT */
	// import { sortByAlphabeticalOrder } from "../public/js/sortByAlphabeticalOrder.js" 		/* ALPHABETICAL SORT */
	import { getSemesterSprintName } from "../public/js/getSemesterSprintName.js"
	import { getTaskTitles } from "../public/js/getTaskTitles.js"
  
	import TaskList from "./components/TaskList.svelte"
	import TaskSearch from "./components/TaskSearch.svelte"
	
	let searchTerm = ""
	let taskList = [] // Original copy of the data.
	let displayTaskList = [] // Copy of the data that is used to render the tasks.
  	let taskTitles = []
  
	/*When App.svelte mounts, this function to fetch the data will run.*/
	onMount(async () => {
		const dataResponse = await fetch('data.json')
		taskList = await dataResponse.json()
		displayTaskList = getSemesterSprintName(taskList)

		/* SPRINT SORT */
		// displayTaskList = sortByTaskOrder(taskList)
		/* SPRINT SORT */

		/* ALPHABETICAL SORT */
		// displayTaskList = sortByAlphabeticalOrder(taskList)
		/* ALPHABETICAL SORT */

		// Create a list of titles for the datalist search
		taskTitles = getTaskTitles(displayTaskList)

		console.log(displayTaskList)
	})
</script>

<main>
	<h1>FDND Task Overview</h1>
	<!--Tasksearch component, with a function the fires on every change of the value.-->
	<TaskSearch bind:searchTerm bind:taskTitles
					on:updateSearch={
						() => {
							displayTaskList = searchList(taskList, searchTerm)
						}
					}/>
	<!--Tasklist component, with a copy of the task data bound to it.-->
	<TaskList bind:displayTaskList/>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1em;
		margin: 0 auto;
	}

	h1 {
		color: white;
		font-family: sans-serif;
		font-size: 4em;
		font-weight: bold;
		margin-top: 0em;
	}
</style>
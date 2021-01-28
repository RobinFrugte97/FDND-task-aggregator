<script>
	import { onMount } from "svelte"
	import { searchList } from "../public/js/searchList.js"
	import { sortList } from "../public/js/sortList.js"
	import { getSemesterSprintName } from "../public/js/getSemesterSprintName.js"
	import { getTaskTitles } from "../public/js/getTaskTitles.js"
	import { addDifficulty } from '../public/js/addDifficulty.js'
    import { getSemesterTitles } from "../public/js/getSemesterTitles.js"

	import { createSprintFilters } from "../public/js/createSprintFilters.js"
  
	import TaskList from "./components/TaskList.svelte"
	import TaskSearch from "./components/TaskSearch.svelte"
	import TaskSort from "./components/TaskSort.svelte"
	import SemesterFilter from "./components/SemesterFilter.svelte"
	import FilterSprint from "./components/FilterSprint.svelte"
	
	
	let searchTerm = ""
	let taskList = [] // Original copy of the data.
	let displayTaskList = [] // Copy of the data that is used to render the tasks.
	let taskTitles = []
	let searchTaskList = [] // Copy of the data to be used in the search
	let selected = {}
	let taskDifficulty = 0
	let semesters = []
	let sprintFilters = []
	let sprintFilter = ''
  
	/*When App.svelte mounts, this function to fetch the data will run.*/
	onMount(async () => {
		const dataResponse = await fetch('data.json')
		taskList = await dataResponse.json()

		// Add semester and sprint name to the task data list and put it in the search task list array.
		searchTaskList = getSemesterSprintName(taskList)
		semesters = getSemesterTitles(taskList)
		console.log(semesters)

		// Copy the array of tasks, complete with semester and sprint name to an array that is to be displayed.
		displayTaskList = searchTaskList
		console.log(displayTaskList)

		sprintFilters = createSprintFilters(displayTaskList)

		/*
		Add difficulty property to the taskList
		*/
		addDifficulty(displayTaskList)
		

		// Create a list of titles for the datalist search
		taskTitles = getTaskTitles(displayTaskList)

	})
</script>

<header>
	<h1>FDND <em>Tasks</em></h1>
	<!--Tasksearch component, with a function the fires on every change of the value.-->
	<TaskSearch bind:searchTerm bind:taskTitles on:updateSearch={
		() => {
			displayTaskList = searchList(taskList, searchTerm)
		}
	}/>
	<TaskSort bind:selected on:updateSort={
		() => {
			displayTaskList = sortList(taskList, selected)
		}
	}/>
</header>

<main>
	<!--Tasklist component, with a copy of the task data bound to it.-->
	<!-- <TaskList bind:displayTaskList/> -->
	<SemesterFilter bind:semesters bind:displayTaskList/>
	<FilterSprint bind:displayTaskList bind:sprintFilters />
	<TaskList bind:displayTaskList/>
</main>

<style>
	header {
		display:flex;
		flex-direction:column;
		justify-content: space-between;
		align-items: center;
	}
	h1 {
		color: white;
		font-family: sans-serif;
		font-size: 3em;
		font-weight: bold;
		margin: 0;
		white-space: nowrap;
	}
	h1 em {
		color:purple;
		font-style: normal;
	}
	main {
		display: flex;
		flex-direction: column;
		margin: 2em 0;
	}
	@media (min-width: 40em) {
		header {
			flex-direction: row;
		}
		/* main {
			display: grid;
			grid-template-columns: 1fr 1fr;
			grid-gap: 1em;
			padding: 0;
		} */
	}

	@media (min-width: 60em) {
		/* main {
			grid-template-columns: 1fr 1fr 1fr;
		} */
	}
	
</style>
<script>
	import { onMount } from "svelte"
	import { sortList } from "../public/js/sortList.js"
	import { getSemesterSprintName } from "../public/js/getSemesterSprintName.js"
	import { addDifficulty } from '../public/js/addDifficulty.js'
    import { getSemesterTitles } from "../public/js/getSemesterTitles.js"
	import { createSprintFilters } from "../public/js/createSprintFilters.js"
  
	import TaskSort from "./components/TaskSort.svelte"
	import FilterSemester from "./components/FilterSemester.svelte"	
	
	
	let taskList = [] // Original copy of the data.
	let displayTaskList = [] // Copy of the data that is used to render the tasks.
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

		// A list of semester names to be displayed.
		semesters = getSemesterTitles(taskList)

		// Sort semesters in numerical order
		semesters.sort((a, b) => a-b)

		// Copy the array of tasks, complete with semester and sprint name to an array that is to be displayed.
		displayTaskList = searchTaskList
		sprintFilters = createSprintFilters(displayTaskList)

		/*
		Add difficulty property to the taskList
		*/
		addDifficulty(displayTaskList)
		console.log(semesters)
	})
</script>

<header>
	<h1>Frontend Design & Development <em>Taken</em></h1>
	<!--Tasksort component, with a function the fires on every change of the value.-->
	<TaskSort bind:selected on:updateSort={
		() => {
			displayTaskList = sortList(taskList, selected)
		}
	}/>
</header>

<main>
	<!--Tasklist component, with a copy of the task data bound to it.-->
	<!-- <TaskList bind:displayTaskList/> -->
	<FilterSemester bind:semesters bind:displayTaskList bind:taskList/>
</main>

<style>
	header {
		display:flex;
		flex-direction:column;
		justify-content: space-between;
		align-items: center;
	}
	h1 {
		color: var(--primary);
		font-size: 3em;
		font-weight: normal;
		line-height:1.5;
		margin: 0 1rem;
	}
	h1 em {
		background-color:var(--primary);
		color:var(--secondary);
		font-style: normal;
		border-radius: .4rem;
		padding: 0 .5rem
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
		h1 {
			margin:0;
		}
	}
</style>
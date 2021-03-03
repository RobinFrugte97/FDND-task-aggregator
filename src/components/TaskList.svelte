<script>
	import { searchList } from "../../public/js/searchList.js"
	import { getTaskTitles } from "../../public/js/getTaskTitles.js"

    import Task from "./Task.svelte"
	import TaskSearch from "../components/TaskSearch.svelte"

    export let semesterTasks
    export let sprint
	export let displayTaskList

    let finalTasks = []
    let searchTerm = ""

    // Create a list of titles for the datalist search
	let taskTitles = getTaskTitles(displayTaskList)

    // Filter the list of tasks based on the given sprint. 
    const filter = (value) => filterBySprint(value, semesterTasks)
	
	function filterBySprint(value, taskList) {
		// Filter all semester tasks based on the current sprint name.
		const filteredTaskList = taskList.filter(task => task.sprintName === value)

		return finalTasks = filteredTaskList
	}
    filter(sprint)
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
    {#each finalTasks as task}
        <!--Task component, with a copy of the task data.-->
        <Task bind:task />
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
<script>
	import { searchList } from "../../public/js/searchList.js"
	import { getTaskTitles } from "../../public/js/getTaskTitles.js"

    import Task from "./Task.svelte"
	import TaskSearch from "../components/TaskSearch.svelte"

    export let sprintTasks
    export let sprint
	export let displayTaskList

    let finalTasks = []	
    let searchTerm = ""
	let taskTitles = []

    // Create a list of titles for the datalist search
	taskTitles = getTaskTitles(displayTaskList)

    // Filter the list of tasks based on the given sprint. 
    const filter = (value) => filterBySprint(value, sprintTasks)
	
	function filterBySprint(value, taskList) {
		const filteredTaskList = taskList.filter(task => task.sprintName === value)

		return finalTasks = filteredTaskList
	}
    filter(sprint)
</script>
<TaskSearch bind:searchTerm bind:taskTitles on:updateSearch={
				() => {
					finalTasks = searchList(sprintTasks, searchTerm)
				}
			}/>

<!--Svelte each-block. This loops through the array of data and 
feeds each entry to a "Task" component-->
<div>
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
		padding: 0 1em;
		margin-bottom: 1em;
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
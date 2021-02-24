<script>
    import Task from "./Task.svelte"
    export let sprintTasks
    export let sprint

    let finalTasks = []

    // Filter the list of tasks based on the given sprint. 
    const filter = (value) => filterBySprint(value, sprintTasks)
	
	function filterBySprint(value, taskList) {
		const filteredTaskList = taskList.filter(task => task.sprintName === value)

		return finalTasks = filteredTaskList
	}
    filter(sprint)
</script>


<!--Svelte each-block. This loops through the array of data and 
feeds each entry to a "Task" component-->
{#each finalTasks as task}
    <!--Task component, with a copy of the task data.-->
    <Task bind:task />
{:else}
    <!--This "else" is shown if displayTaskList is empty or otherwise not compatible 
    with the each-block.-->
    <p>No result...</p>
{/each}


<style>
    
    
</style>
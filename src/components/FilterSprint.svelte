<script>
	export let sprintFilters
	export let displayTaskList

	const filter = (value) => filterBySprint(value, displayTaskList)
	export let filteredBySprint = false

	
	function filterBySprint(value, taskList) {
		const filteredTaskList = taskList.filter(task => task.sprintName === value)
		filteredBySprint = true

		return displayTaskList = filteredTaskList
	}

</script>
{#if !filteredBySprint}
{#each sprintFilters as sprint}
	<button on:click={filter(sprint)}>{ sprint }</button>
{/each}
{/if}

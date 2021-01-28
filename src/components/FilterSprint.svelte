<script>
	export let sprintTitles
	export let sprints
	export let showSprints

    import TaskList from "../components/TaskList.svelte"


	const filter = (value) => filterBySprint(value, sprints)
	// export let filteredBySprint = false

	
	function filterBySprint(value, taskList) {
		const filteredTaskList = taskList.filter(task => task.sprintName === value)
		showSprints = false

		return sprints = filteredTaskList
	}

</script>
{#if showSprints}
	{#each sprintTitles as sprint}
		<button on:click={filter(sprint)}>{ sprint }</button>
	{/each}
{/if}
{#if showSprints == false}
	<TaskList bind:sprints/>
{/if}

<script>
	export let sprintTitles
	export let sprints
	export let showSprints
	export let showSemesters
	export let displayTaskList

    import TaskList from "../components/TaskList.svelte"


	const filter = (value) => filterBySprint(value, sprints)
	// export let filteredBySprint = false

	let finalTasks = []

	
	function filterBySprint(value, taskList) {
		const filteredTaskList = taskList.filter(task => task.sprintName === value)
		showSprints = false

		return finalTasks = filteredTaskList
	}

	// function back() {
	// 	showSemesters = !showSemesters
    //     showSprints = !showSprints
	// }

</script>
{#if showSprints}
	{#each sprintTitles as sprint}
		<button on:click={filter(sprint)}>{ sprint }</button>
	{/each}
	<button class="back-button" on:click={() => {
		showSemesters = !showSemesters
			showSprints = !showSprints
		finalTasks = displayTaskList
	}}>Back</button>
{/if}
{#if !showSprints && !showSemesters}
<button class="back-button" on:click={() => {
	showSprints = !showSprints
	finalTasks = sprints
}}>Back</button>
{/if}
{#if showSprints == false}
<div>
	<TaskList bind:finalTasks />
</div>
{/if}

<style>
    button {
        transition: ease .2s;
        font-size: 1.5em;
        min-width: 90%;
        margin: auto;
        margin-top: 2.5em;
        padding: 2em;
        text-align: left;
        background-color: transparent;
        border: black solid 2px;
    }

    button:hover, :focus {
        transform: scale(0.99);
    }

    button:active {
        transform: scale(0.98);
    }

    button::after {
        content: "";
        width: 0.8em;
        height: 0.5em;
        background-color: purple;
        clip-path: polygon(100% 0%, 0 0%, 50% 100%);
        pointer-events: none;
        position: absolute;
        margin-top: .35em;
        margin-left: .5em;
        transform: rotate(270deg)
    }

    button::after:active {
        transform: rotate(180deg)
    }
	.back-button {
		color: var(--text);
		background-color:var(--secondary);
		outline: none;
		position: relative;
	}
	.back-button::after {
        content: "";
        width: 0.8em;
        height: 0.5em;
        background-color: purple;
        clip-path: polygon(100% 0%, 0 0%, 50% 100%);
        pointer-events: none;
        position: absolute;
        margin-top: .35em;
		left: 0;
		top: 1.5em;
		
        transform: rotate(90deg)
	}
	@media (min-width: 40em) {
		div{
			display: grid;
			grid-template-columns: 1fr 1fr;
			grid-gap: 1em;
			padding: 0;
		}
	}

	@media (min-width: 60em) {
		div {
			grid-template-columns: 1fr 1fr 1fr;
		}
	}
</style>
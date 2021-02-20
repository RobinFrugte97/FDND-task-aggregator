<script>
    import TaskList from "../components/TaskList.svelte"

    import { removeDuplicates } from "../../public/js/getSemesterTitles.js"

	export let semester
	export let displayTaskList

	let sprintTitles = []
    let sprintTasks = []
	let showSprints = false

	// Create a list of sprints, with duplicates removed, to be rendered
    function loadSprints(semester, taskList) {
        sprintTasks = []
        sprintTitles = []
        sprintTasks = taskList.filter(task => task.semester === semester)
        sprintTasks.map(sprint => sprintTitles.push(sprint.sprintName))
        showSprints = true

        return sprintTitles = removeDuplicates(sprintTitles)
	}

	loadSprints(semester, displayTaskList)
</script>
{#if showSprints}
	{#each sprintTitles as sprint}
		<details>
			<summary>{ sprint }</summary>
			<div>
				<TaskList bind:sprint bind:sprintTasks />
			</div>
		</details>
	{/each}
{/if}

<style>
	details {
		margin: 1.25em 0;
	}
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
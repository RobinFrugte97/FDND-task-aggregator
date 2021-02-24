<script>
    import TaskList from "../components/TaskList.svelte"

    import { removeDuplicates } from "../../public/js/getSemesterTitles.js"

	export let semester
	export let displayTaskList


	let sprintTitles = []
    let semesterTasks = []

	let showSprints = false

	// Create a list of sprints, with duplicates removed, to be rendered
    function loadSprints(semester, taskList) {
		// Create a list of all tasks of a given semester
        semesterTasks = taskList.filter(task => task.semester === semester)

		// Create a list of sprint titles. Duplicates to be removed
        semesterTasks.map(sprint => sprintTitles.push(sprint.sprintName))

		// Allow the sprints to be displayed
        showSprints = true

		// Return a list of sprint titles with duplicates removed.
        return sprintTitles = removeDuplicates(sprintTitles)
	}

	loadSprints(semester, displayTaskList)
	
</script>
{#if showSprints}
	{#each sprintTitles as sprint}
		<section>
			<h3>{ sprint } </h3>
				<TaskList bind:sprint bind:semesterTasks bind:displayTaskList/>
		</section>
	{/each}
{/if}

<style>
	section {
		position: relative;
		background-color: var(--secondary);
		padding: 1rem 1rem 1rem;
		border-radius: .4em;
		margin-bottom: 1rem;
	}
	h3 {
		color: var(--primary);
		margin-top: 0;
	}
    
</style>
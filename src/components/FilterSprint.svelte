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
		console.log(taskList)
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
		<section>
			<h3>{ sprint } </h3>
			
			
				<TaskList bind:sprint bind:sprintTasks bind:displayTaskList/>
			
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
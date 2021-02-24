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
		<details>
			<summary>{ sprint } </summary>
			
			
				<TaskList bind:sprint bind:sprintTasks bind:displayTaskList/>
			
		</details>
	{/each}
{/if}

<style>
	details {
		margin: 1.25em 0;
	}
    
</style>
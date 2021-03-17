<script>
	import Sprint from "../components/Sprint.svelte"

	export let semester
	export let displayTaskList

	let sprintTitles = []
    let semesterTasks = []
	
	// Create a list of sprints, with duplicates removed, to be rendered
    function loadSprints(semester, taskList) {
		// Create a list of all tasks of a given semester
        semesterTasks = taskList.filter(task => task.semester === semester)

		// Create a list of sprint titles. Duplicates to be removed
        semesterTasks.forEach(sprint => sprintTitles.push({"sprint": sprint.sprintName,"index": sprint.sprint}))


        const seen = new Set();
		let filteredSprints = sprintTitles.filter(task => {
			const duplicate = seen.has(task.index)
			seen.add(task.index)
			return !duplicate
		})
		filteredSprints.sort((a, b) => {
			return a.index - b.index
		})

		// Assign the filtered list of sprints to a "global" variable, that allows the sprints to be rendered.
		sprintTitles = filteredSprints
	}

	// Fire function that creates a list of sprints to be rendered
	loadSprints(semester, displayTaskList)
</script>

{#each sprintTitles as sprint}
	<Sprint bind:semester bind:sprint bind:semesterTasks bind:displayTaskList />
{/each}



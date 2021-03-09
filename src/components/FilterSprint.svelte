<script>
	import Sprint from "../components/Sprint.svelte"

	export let semester
	export let displayTaskList


	let sprintTitles = []
    let semesterTasks = []

	let showSprints = false
	
	loadSprints(semester, displayTaskList)

	// Create a list of sprints, with duplicates removed, to be rendered
    function loadSprints(semester, taskList) {
		// Create a list of all tasks of a given semester
        semesterTasks = taskList.filter(task => task.semester === semester)
		// Create a list of sprint titles. Duplicates to be removed
        semesterTasks.forEach(sprint => sprintTitles.push({"sprint": sprint.sprintName,"index": sprint.sprint}))

		// Allow the sprints to be displayed
        showSprints = true
        const seen = new Set();

		let filteredSprints = sprintTitles.filter(task => {
			const duplicate = seen.has(task.index)
			seen.add(task.index)
			return !duplicate
		})
		filteredSprints.sort((a, b) => {
			return a.index - b.index
		})
        console.log(filteredSprints)
		sprintTitles = filteredSprints
		// Return a list of sprint titles with duplicates removed.
        // return sprintTitles = removeDuplicates(temp)
	}
</script>
{#if showSprints}
	{#each sprintTitles as sprint}
		<Sprint bind:semester bind:sprint bind:semesterTasks bind:displayTaskList />
	{/each}
{/if}


<script>
    import TaskList from "../components/TaskList.svelte"

    import { removeDuplicates } from "../../public/js/getSemesterTitles.js"

	export let semester
	export let displayTaskList


	let sprintTitles = []
    let semesterTasks = []

	let showSprints = false
	let isActive = false

	loadSprints(semester, displayTaskList)

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
</script>
{#if showSprints}
	{#each sprintTitles as sprint}
		<section class:active={isActive}>
			<h3>
				Sprint: { sprint } 
				<button on:click|preventDefault={() => isActive = !isActive}>
					<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-down" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
						<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
						<line x1="12" y1="5" x2="12" y2="19" />
						<line x1="18" y1="13" x2="12" y2="19" />
						<line x1="6" y1="13" x2="12" y2="19" />
					</svg>
				</button>
			</h3>

			<TaskList bind:sprint bind:semesterTasks bind:displayTaskList />
			
		</section>
	{/each}
{/if}

<style>
	section {
		position: relative;
		background-color: var(--secondary);
		padding: 1rem 1rem .5rem;
		overflow:hidden;
		
	}
	h3 {
		color: var(--highlight-secondary);
		margin: 0 0 .5rem;
	}

	button {
        border:none;
        width:2rem;
        height:2rem;
        position:relative;
		background-color:transparent;
		position: absolute;
		right:1rem;
		top:.5rem;

    }
	section > :global(div) {
		display:none;
	}
	section.active :global(div)  {
		display: grid
	}
	section :global(form) {
		opacity:0;
		transform: translateY(-2rem);
		transition: .25s .35s;
	}
	section.active :global(form)  {
		opacity:1;
		transform: translateY(0);
	}
	svg {
		stroke: var(--primary);
		transition:.25s
	}
	section.active svg {
		transform:rotate(180deg)
	}

	@media (min-width: 40em) {
		section {
			border-radius: .4em;
			margin-bottom: 1rem;
		}
        h2 {
            position: absolute;
            top: -4.7rem;
            margin-left: -1rem;
        }
	}
</style>
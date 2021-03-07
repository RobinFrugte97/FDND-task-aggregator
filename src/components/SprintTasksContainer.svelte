<script>

    import TaskSelection from "./TaskSelection.svelte"
    import Task from "./Task.svelte"

    export let finalTasks

	let relative = true
    let selection = []
	let isActive = false

</script>

<TaskSelection bind:selection bind:isActive />

<main>
	<!--Svelte each-block. This loops through the array of data and feeds each entry to a "Task" component-->
    {#each finalTasks.tasks as group}
		<!-- Group can be used to stack cards for example -->
		<div id="stack" on:click|preventDefault={()=>{
			selection = group.taskList
            console.log(selection)
			isActive = true
			}}> 
			{#each group.taskList as task}
			    <!--Task component, with a copy of the task data.-->
			    <Task bind:task bind:group />
    	    {/each}
		</div>
    {/each}
	{#each finalTasks.dummy.taskList as task}
			<Task bind:task bind:relative/>

	{/each}
</main>


<style>
    div {
        display: block;
        position: relative;
    }
	#stack {
		height: 10em;
	}
    main {
		margin: 1rem 0 1rem;
		padding-top: .25rem;
	}
	@media (min-width: 40em) {
		main{
			display: grid;
			grid-template-columns: 1fr 1fr;
			grid-gap: 1em;
			
		}
	}

	@media (min-width: 60em) {
		main {
			grid-template-columns: 1fr 1fr 1fr;
		}
	}
</style>
<script>

    import Task from "./Task.svelte"
	import TaskSelection from "./TaskSelection.svelte"
    import TaskStack from "./TaskStack.svelte"

    export let finalTasks
	export let isActive
	export let selection = []

	let dummy = true
	let group = false
	let gridTemplate = ""

</script>
<TaskSelection bind:selection bind:isActive bind:gridTemplate />

<main>
	<!--Svelte each-block. This loops through the array of data and feeds each entry to a "Task" component-->
    {#each finalTasks.tasks as group}
		<!-- Group can be used to stack cards for example -->
		<div id="stack" on:click|preventDefault={()=>{
			selection = group.taskList;
			console.log(selection)
			isActive = true
			if(selection.length == 2) {
				gridTemplate = "grid-template-columns: 1fr 1fr;"
			} else if (selection.length >= 3){
				gridTemplate = "grid-template-columns: 1fr 1fr 1fr;"
			}

			// Card shuffle

			// let clickedCard = group.taskList.shift()
			// group.taskList.push(clickedCard)
			// group = {
			// 	"title": group.title,
			// 	"taskList": group.taskList
			// }
		}}> 
			<TaskStack bind:group />
		</div>
    {/each}
	{#each finalTasks.dummy.taskList as task}
			<Task bind:task bind:dummy bind:group/>

	{/each}
</main>


<style>
	div {
        display: block;
        position: relative;
    }
	#stack {
		height: 10em;
		margin-bottom: 1.5em;
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
		#stack {
			margin-bottom: 1em;
		}	
	}

	@media (min-width: 60em) {
		main {
			grid-template-columns: 1fr 1fr 1fr;
		}
		#stack {
			margin-bottom: .5em;
		}	
	}
</style>
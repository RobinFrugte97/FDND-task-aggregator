<script>
	import { onMount } from "svelte"

	import TaskList from "./components/TaskList.svelte"

	let taskList = [] /*Original copy of the data.*/
	let displayTaskList = [] /*Copy of the data that is used to render the tasks.*/

	/*When App.svelte mounts, this function to fetch the data will run.*/
	onMount(async () => {
		const dataResponse = await fetch('data.json')
		taskList = await dataResponse.json()

		displayTaskList = taskList
		console.log(displayTaskList)
	})
</script>

<main>
	<h1>FDND Task Overview</h1>
	<!--Tasklist component, with a copy of the task data bound to it.-->
	<TaskList bind:displayTaskList/>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1em;
		margin: 0 auto;
	}

	h1 {
		color: white;
		font-family: sans-serif;
		font-size: 4em;
		font-weight: bold;
		margin-top: 0em;
	}
</style>
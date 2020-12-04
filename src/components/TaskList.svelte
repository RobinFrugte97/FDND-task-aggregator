<script>
    import Task from "./Task.svelte"
    export let displayTaskList
</script>


<ul>
    <!--Svelte each-block. This loops through the array of data and 
    feeds each entry to a "Task" component-->
    {#each displayTaskList as task}
	    <!--Task component, with a copy of the task data.-->
        <Task {task} />
    {:else}
        <!--This "else" is shown if displayTaskList is empty or otherwise not compatible 
        with the each-block.-->
        <p>Loading...</p>
    {/each}
</ul>

<style>
    ul {
        max-width: 80%;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 1.5em;
        margin: 0;
        margin-top: 4em;
        padding: 0;
    }
</style>
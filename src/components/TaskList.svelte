<script>
    import Task from "./Task.svelte"
    export let finalTasks
</script>


<!--Svelte each-block. This loops through the array of data and 
feeds each entry to a "Task" component-->
{#each finalTasks as task}
    <!--Task component, with a copy of the task data.-->
    <Task bind:task />
{:else}
    <!--This "else" is shown if displayTaskList is empty or otherwise not compatible 
    with the each-block.-->
    <p>No result...</p>
{/each}


<style>
    
    
</style>
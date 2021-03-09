<script>
    import Task from "./Task.svelte"
    
    export let group

    let dummy = false

</script>

{#each group.taskList as task}		
    <!--Task component, with a copy of the task data.-->
    <Task bind:task bind:group bind:dummy/>
{/each}
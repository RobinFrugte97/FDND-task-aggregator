<script>
    import Tags from "./Tags.svelte"
    export let task
    const supportLevels = ["Example", "Duplicate", "Experiment", "Extension", "Autonomous"]
</script>

<li>
    <h3>{task.title}</h3>

    <!-- semester and sprint spot Add later -->
    <!-- semester and sprint spot Add later -->
    <!-- semester and sprint spot Add later -->

    {#if task["support-level"] && typeof task["support-level"] === 'number'}
        <p>Level: {supportLevels[task["support-level"] -1]}</p>
    {:else if task.level}
        <p>Level: {supportLevels[task.level -1]}</p>
    {/if}
    <!--Tags component, with a copy of the taglist data.-->
    <Tags bind:task/>
    <a href={task.url}>Link to Github Repo</a>
</li>

<style>
    li {
        background-color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        list-style: none;
        padding: .5em 1.5em;
        border-radius: .4em;
        min-width: 15em;
    }
    
    h3 {
        font-size: 2em;
        color: purple;
        margin-top: 0;
        margin-bottom: .1em;
        text-align: center;
    }
</style>
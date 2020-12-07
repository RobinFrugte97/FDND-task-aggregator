<script>
    export let task
</script>

<h4>Tags:</h4>
<ul>
    <!--Svelte each-block looping through the tags.-->
    {#each task.tags as tag}
        <li>{tag}</li>
    {:else}
        <p>No tags</p>
    {/each}
</ul>

<style>
    h4 {
        margin: .5em;
    }

    ul {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: .5em;
        list-style: none;
        padding: 0;
        margin: 0;
        margin-bottom: 1em;
    }

    li {
        list-style-position: inside;
        margin-left: 0;
        text-align: center;
        text-decoration: underline;
    }
</style>
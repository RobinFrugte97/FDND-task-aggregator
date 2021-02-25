<script>
    export let task
</script>

<ul>
    <!--Svelte each-block looping through the tags.-->
    {#each task.tags as tag}
        <li>
            {tag}
        </li>
    {:else}
        <p>No tags</p>
    {/each}
</ul>



<style>
    ul {
        display: none;
        justify-content:flex-start;
        flex-wrap:wrap;
        list-style: none;
        padding: 0;
        margin: 1rem 0 0;
        padding-bottom:.5rem;
    }

    li {
        list-style-position: inside;
        margin-right:.5rem;  
        white-space:nowrap;
        background-color: var(--primary);
        padding:.25rem;
        border-radius:.25rem;
        margin-bottom: .25rem;
        color:var(--secondary);
    }
</style>
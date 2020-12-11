<script>
    import {createEventDispatcher} from "svelte"
    const dispatcher = createEventDispatcher()
    export let searchTerm
    export let taskTitles

</script>

<label for="searchBar">Search for a task:</label>
<input
    type="search"
    id="searchBar"
    aria-label="Search Input" 
    list="searchOptions"
    bind:value={searchTerm}
    on:keyup={() => {
        dispatcher('updateSearch')
}}/>
<datalist id="searchOptions">
    {#if searchTerm === ""}
        <option></option>
    {:else}
        {#each taskTitles as title}
            <option value={title}/>
        {/each}

    {/if}
</datalist>

<style>
    label {
        color: white;
        margin-bottom: .5em;
        font-size: 1.5em;
    }
    input {
        width: 25%;
    }
</style>
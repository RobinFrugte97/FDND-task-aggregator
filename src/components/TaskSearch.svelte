<script>
    import {createEventDispatcher} from "svelte"
    const dispatcher = createEventDispatcher()
    export let searchTerm
    export let taskTitles
</script>

<form action="#">
    <label for="searchBar">Search tasks</label>
    <input
        type="search"
        id="searchBar"
        aria-label="Search Input" 
        list="searchOptions"
        bind:value={searchTerm}
        on:keyup={() => {
            dispatcher('updateSearch')
    }}/>
    <!-- Datalist with options for input suggestion. 
    The amount of options is directly linked to the amount of results of the user input. -->
    <datalist id="searchOptions">
        {#if searchTerm === ""}
            <option></option>
        {:else}
            {#each taskTitles as title}
                <option value={title}/>
            {/each}

        {/if}
    </datalist>
</form>

<style>
    form {
        display:flex;
        justify-content: flex-end;
        align-items: center;
    }
    label {
        color: white;
        margin-right: .5em;
        margin-bottom: 0;
        white-space: nowrap;
    }
    input {
        width: 30vw;
        margin-bottom: 0;
    }
</style>

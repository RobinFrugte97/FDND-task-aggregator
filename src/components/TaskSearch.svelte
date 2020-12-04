<script>
    import {createEventDispatcher} from "svelte"
    const dispatcher = createEventDispatcher()
    export let searchTerm
</script>

<label for="searchBar">Search for a task:</label>
<input
    type="text"
    id="searchBar"
    aria-label="Search Input" 
    bind:value={searchTerm}
    on:keyup={() => {
        dispatcher('updateSearch')
}}/>

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
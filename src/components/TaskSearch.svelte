<script>
    import {createEventDispatcher} from "svelte"

    const dispatcher = createEventDispatcher()

    export let searchTerm
    export let taskTitles
    
</script>

<form action="#">
    <fieldset>
        <legend class="visually-hidden">Zoek taken</legend>
    
        <label for="searchBar">Zoek taken</label>
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
    </fieldset>

    <button>
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-search" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <circle cx="10" cy="10" r="7" />
            <line x1="21" y1="21" x2="15" y2="15" />
        </svg>
    </button>
</form>

<style>
    form {
        display:none;
        justify-content: center;
        align-items: center;
		position: absolute;
		top:-4.5rem;
		right:0rem;
    }
    fieldset {
        border:none;
        display:flex;
        align-items:center;
        margin-right:0;
        padding-right:0;
    }
    label {
        color: var(--highlight-secondary);
        margin-right: .5em;
        margin-bottom: 0;
        white-space: nowrap;
    }
    input {
        width: 30vw;
        margin-bottom: 0;
        border:none
    }
    form > button {
        border:none;
        border-radius:50%;
        width:2rem;
        height:2rem;
        position:relative;
        display:none;
    }
    svg {
        transition:.25s;
    }

    @media (min-width: 40em) {
        form {
            display:flex;
        }
    }

</style>

<script>
    import {createEventDispatcher} from "svelte"

    const dispatcher = createEventDispatcher()

    export let searchTerm
    export let taskTitles

    let isActive = false
    
</script>

<form action="#" class:active={isActive}>
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

    <button on:click|preventDefault={() => isActive = !isActive}>
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-search" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <circle cx="10" cy="10" r="7" />
            <line x1="21" y1="21" x2="15" y2="15" />
        </svg>

        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x" viewBox="3 3 18 18" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M10 10l4 4m0 -4l-4 4" />
          </svg>
    </button>
</form>

<style>
    form {
        display:flex;
        justify-content: flex-end;
        align-items: center;
		position: absolute;
		top:.5rem;
		right:2.5rem;
        width:calc(100% - 3rem)
    }
    fieldset {
        border:none;
        display:flex;
        align-items:center;
        margin-right:.5rem;
        margin-left:-2px;
        padding-right:0;
        opacity:0;
        transition:.25s;
        background-color: var(--secondary);
        justify-self: stretch;
        flex-grow: 1;
        flex-shrink:0;
    }
    form.active fieldset {
        opacity:1;
    }
    label {
        color: var(--primary);
        margin-right: .5em;
        margin-bottom: 0;
        white-space: nowrap;
    }
    input {
        margin-bottom: 0;
        border:none;
        width:100%;
        pointer-events:none;
    }
    form.active input {
        pointer-events:all
    }
    form > button {
        border:none;
        border-radius:50%;
        width:2rem;
        height:2rem;
        position:relative;
        background-color: transparent;
    }
    svg {
        position:absolute;
        right:0;
        top:.15rem;
        transition:.25s;
        stroke: var(--primary)
    }
    svg.icon-tabler-circle-x, 
    form.active svg.icon-tabler-search {
        opacity:0;
        pointer-events:none;
    }
    form.active svg.icon-tabler-circle-x {
        opacity:1;
    }

    @media (min-width: 45em) {
        form {
            top: .5rem;
            right: 3rem;
            width: auto;
        }
        fieldset {
            background-color: transparent;
        }
        input {
            width:30vw;
        }
    }

</style>

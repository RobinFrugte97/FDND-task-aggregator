<script>
    import Task from "./Task.svelte"

    export let selection
    export let isActive
    export let gridTemplate

    let relative = true
    
    
</script>
<section class:active={isActive}>
    <button on:click|preventDefault={() => isActive = !isActive}>Close</button>
    <div style={gridTemplate}>
        {#each selection as task}
        <a href="{task.url}">
            <Task bind:task bind:relative />
        </a>
        {/each}
    </div>
</section>

<style>
    a {
        color:var(--secondary);
    }
    a:hover {
        text-decoration: none;
    }
    div {
        display: grid;
        grid-gap: 1em;
    }
    section {
        position: fixed;
        z-index: 100;
        display: none;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        align-items: center;
        background-color: rgb(0 0 0 / 70%);
        box-shadow: 0px 0px 0px 2000px rgb(0 0 0 / 70%)
    }
    .active {
		display: block;
	}
</style> 
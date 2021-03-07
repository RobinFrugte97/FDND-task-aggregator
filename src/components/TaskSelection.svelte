<script>
    import Task from "./Task.svelte"

    export let selection
    export let isActive

    let relative = true
</script>
<section class:active={isActive}>
    <button on:click|preventDefault={() => {
        isActive = !isActive
        selection = []}}>
        Close</button>
    <div>
        {#each selection as task}
            <Task bind:task bind:relative />
        {/each}
    </div>
</section>

<style>
    div {
        grid-template-columns: 1fr 1fr 1fr;
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
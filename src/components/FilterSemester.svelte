<script>
    import FilterSprint from "./FilterSprint.svelte"
    
    export let semesters
	export let displayTaskList

</script>

{#each semesters as semester}
    <section>
        <h2>Semester {semester}: {displayTaskList.filter(task => task.semester === semester)[0].semesterName}</h2>
        <FilterSprint bind:semester bind:displayTaskList/>
    </section>
{/each}


<style>
    section {
        background-color: var(--highlight-secondary);
        border-radius:.4em;
        padding:1rem;
        margin:5rem 0 1rem;
        position:relative;
    }
    h2 {
        position: absolute;
        top: -4.7rem;
        background: var(--highlight-secondary);
        padding:1rem;
        border-radius: .4rem;
        margin-left: -1rem;
    }
</style>
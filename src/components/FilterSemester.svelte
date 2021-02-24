<script>
    export let semesters
	export let displayTaskList
    import FilterSprint from "./FilterSprint.svelte"

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
        padding:0 1rem 1rem;
        margin-bottom: 1rem;
    }
</style>
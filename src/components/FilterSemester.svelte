<script>
    export let semesters
	export let displayTaskList

    import FilterSprint from "./FilterSprint.svelte"

</script>

{#each semesters as semester}
    <details>
        <summary>Semester {semester}: {displayTaskList.filter(task => task.semester === semester)[0].semesterName}</summary>
        <FilterSprint bind:semester bind:displayTaskList />
    </details>
{/each}


<style>
    details {
        width: 90%;
        font-size: 1.5em;
        padding: 0 1em;
    }
</style>
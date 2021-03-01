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
        
        padding:0;
        
        position:relative;
    }
    h2 {
        background: var(--highlight-secondary);
        padding:1rem;
        border-radius: .4rem;
    }

    @media (min-width: 40em) {
		section {
			padding:1rem;
            border-radius:.4em;
            margin:5rem 0 1rem;
		}
        h2 {
            position: absolute;
            top: -4.7rem;
            margin-left: -1rem;
        }
	}
</style>
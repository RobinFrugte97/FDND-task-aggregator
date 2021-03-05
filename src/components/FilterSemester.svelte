<script>
    import Semester from "./Semester.svelte"
    
    export let semesters
	export let displayTaskList
    
</script>

{#each semesters as semester}
    <Semester bind:semester bind:displayTaskList />
{/each}

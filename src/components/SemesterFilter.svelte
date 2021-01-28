<script>
    export let semesters
    export let displayTaskList

    let sprintTitles
    let sprints
    let showSemesters = true
    let showSprints = false


    function loadSprints(semester, taskList) {
        sprints = []
        sprintTitles = []
        sprints = taskList.filter(task => task.semester === semester)
        sprints.map(sprint => sprintTitles.push(sprint.sprintName))
        showSemesters = !showSemesters
        showSprints = !showSprints

        console.log("semester " + showSemesters)
        console.log("sprint " + showSprints)

        console.log(sprints) // The sprints array contains all sprints that are a part of the selected semester.

        console.log(sprintTitles) // A list of sprintTitles that needs to be checked for duplicates.
    }
</script>
{#if showSemesters && !showSprints}
    {#each semesters as semester}
        <button on:click={loadSprints(semester, displayTaskList)}>
            Semester {semester}:
            {displayTaskList.filter(task => task.semester === semester)[0].semesterName}
        </button>
    {/each}
{:else if !showSemesters && showSprints}
        <!-- Sprint component -->
{/if}

<style>
    button {
        transition: ease .2s;
        font-size: 1.5em;
        min-width: 90%;
        margin: auto;
        margin-top: 2.5em;
        padding: 2em;
        text-align: left;
        background-color: transparent;
        border: black solid 2px;
    }

    button:hover, :focus {
        transform: scale(0.99);
    }

    button:active {
        transform: scale(0.98);
    }

    button::after {
        content: "";
        width: 0.8em;
        height: 0.5em;
        background-color: purple;
        clip-path: polygon(100% 0%, 0 0%, 50% 100%);
        pointer-events: none;
        position: absolute;
        margin-top: .35em;
        margin-left: .5em;
        transform: rotate(270deg)
    }

    button::after:active {
        transform: rotate(180deg)
    }
</style>
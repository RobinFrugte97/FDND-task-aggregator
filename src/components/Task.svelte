<script>
    import Tags from "./Tags.svelte"
    export let task
    
    const supportLevels = ["Voorbeeld", "Imitatie", "Experiment", "Uitbreiding", "Autonoom"]
</script>


<a href={task.url}>
    <article>
        <h4>{task.title}</h4>
        <p><strong>{task.client}</strong></p>
        <div>
            <p>{task.semesterName} /</p>
            <p> {task.sprintName}</p>
        </div>
        
        
        <p><em>{supportLevels[task["support-level"] -1]}</em></p>
        <!--Tags component, with a copy of the taglist data.-->
        <Tags bind:task/>
    </article>
</a>


<style>
    a {
        color:var(--secondary);
    }
    a:hover {
        text-decoration: none;
    }
    article {
        background-color:var(--highlight-primary);
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: .5em 1.5em;
        border-radius: .4em;
        transition:.25s;
        margin-bottom: 1em;
        
    }
    article:hover {
        transform: scale(1.025);
    }
    @media (min-width:40em) {
        a {
            align-self:stretch;
        }
        article {
            margin: 0;
            height:100%;
            
        }
    }
    
    h4 {
        font-size: 1.25em;
        color: var(--secondary);
        margin-top: 0;
        margin-bottom: .5rem;
    }
    p {
        margin: 0;
        color: inherit;
    }
    div {
        width:100%;
        display:flex;
        margin: .5rem 0 .25rem;
    }
        div p:first-child {
            margin-right:.25rem
        }
</style>
<script>
    import Tags from "./Tags.svelte"
    export let task

</script>

<li>
    <h3>{task.title}</h3>
    <p>{task.description}</p>
    <!--Tags component, with a copy of the taglist data.-->
    <Tags bind:task/>
    <a href={task.url}>Link to Github Repo</a>
</li>

<style>
    li {
        background-color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        list-style: none;
        padding: .5em 1.5em;
        border-radius: .4em;
        min-width: 15em;
    }
    
    h3 {
        font-size: 2em;
        color: purple;
        margin-top: 0;
        margin-bottom: .1em;
        text-align: center;
    }
</style>
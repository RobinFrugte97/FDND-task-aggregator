<script>
    import Tags from "./Tags.svelte"

    export let task
    export let group
    export let dummy

    const z = [5,4,3,2,1]
    const supportLevels = ["voorbeeld", "imitatie", "experiment", "uitbreiding", "autonoom"]
    
    let marginCalculator
    let indexCalculator
    let widthCalculator
    let variableWidth 
    
    if(group) {
        switch (group.taskList.length) {
        case 1:
            variableWidth = [100]
            break;
        case 2:
            variableWidth = [97.5, 98]
            break;
        case 3:
            variableWidth = [95, 95.5, 96]
            break;
        case 4:
            variableWidth = [92.5, 93, 93.5, 94]
            break;
        case 5:
            variableWidth = [90, 90.5, 91, 91.5, 92]
            break;
        }
        console.log(variableWidth)
        marginCalculator = z.indexOf(group.taskList.indexOf(task)+1)+1
        indexCalculator = group.taskList.indexOf(task)+1
        widthCalculator = group.taskList.indexOf(task)
        console.log(widthCalculator)
    }
    
    // Calculating stack css. Try not to gag...
    let stackStyles = `min-width: ${dummy ? "" : "16em"}; position: ${dummy ? "relative" : "absolute"}; margin-left: ${100-(90 + marginCalculator*2)}%; width: ${dummy ? "100" : variableWidth[widthCalculator]}%;margin-top: ${indexCalculator/4-.25}em; z-index: ${z[indexCalculator-1]};`



    function sanitizeClassName(className) {
        return className.replace(/ /g, "-").toLowerCase()
    }

    // Turned off to allow tasks tiles to update on search..
    // const {url, title, client, semesterName, sprintName} = task
</script>

<article class={dummy ? sanitizeClassName(task.title) : "stack"} style={stackStyles}>
    <h4>{task.title}</h4>
    <p><strong>{task.client}</strong></p>
    <div>
        <p>{task.semesterName} /</p>
        <p> {task.sprintName}</p>
    </div>
    
    <footer>


        <p>
            <svg class="task-level {supportLevels[task["support-level"] -1]}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 44 44">
                <path id="duplicate" d="M36.5,14.1c1.3,2.3,2,5,2,7.9c0,9.1-7.4,16.5-16.5,16.5S5.5,31.1,5.5,22c0-2.8,0.7-5.5,2-7.9"/>
                <path id="experiment" d="M38.5,22c0,9.1-7.4,16.5-16.5,16.5S5.5,31.1,5.5,22"/>
                <path id="extension" d="M36.3,30.2c-2.8,5-8.2,8.3-14.3,8.3c-6.1,0-11.5-3.4-14.3-8.3"/>
                <circle id="circle" cx="22" cy="22" r="16.5"/>
            </svg>
            <em>{supportLevels[task["support-level"] -1]}</em>
        </p>
        <ul>
            <li>
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-checkbox" viewBox="0 0 24 24">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <polyline points="9 11 12 14 20 6" />
                        <path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9" />
                    </svg>
                </button>
            </li>
            <li>
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-git-fork" viewBox="0 0 24 24">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <circle cx="12" cy="18" r="2" />
                        <circle cx="7" cy="6" r="2" />
                        <circle cx="17" cy="6" r="2" />
                        <path d="M7 8v2a2 2 0 0 0 2 2h6a2 2 0 0 0 2 -2v-2" />
                        <line x1="12" y1="12" x2="12" y2="16" />
                        </svg>
                </button>
            </li>
            <li>
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-tag"  viewBox="0 0 24 24">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M11 3l9 9a1.5 1.5 0 0 1 0 2l-6 6a1.5 1.5 0 0 1 -2 0l-9 -9v-4a4 4 0 0 1 4 -4h4" />
                        <circle cx="9" cy="9" r="2" />
                    </svg>
                </button>
            </li>
        </ul>
        <!--Tags component, with a copy of the taglist data.-->
        <Tags bind:task/>
    </footer>
    
</article>



<style>
    /* a {
        color:var(--secondary);
    }
    a:hover {
        text-decoration: none;
    } */
    article {
        background-color:var(--highlight-primary);
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: .5em 1rem;
        border-radius: .4em;
        transition:.25s;
        margin-bottom: 1em;
        box-shadow: 3px 3px 26px -13px rgba(0,0,0,0.75);
        cursor: pointer;
    }
    article:hover {
        transform: scale(1.025);
    }
    /* article.stack {

    } */
    article.task {
        filter:grayscale(1) brightness(2.5);
        opacity:.2;
    }
    article.task:hover {
        transform: scale(1);
    }
    article.task * {
        text-indent:-666em;
    }
    article.task svg {
        opacity:0
    }
    @media (min-width:40em) {
        /* a {
            align-self:stretch;
        } */
        article {
            margin: 0;
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
        margin: .5rem 0 1.25rem;
    }
    div p:first-child {
        margin-right:.25rem
    }
    footer {
        background-color: rgba(0,0,0,0.1);
        width:calc(100% + 2rem);
        margin:auto -1rem -.5rem;
        padding:.5em 1rem 0;
        display:flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 0 0 .4rem .4rem;
    }
    footer p {
        display:flex;
        align-items: center;
    }
    footer p em {
        font-style: normal;
        margin: .25rem;
    }
    footer ul {
        list-style: none;
        padding:0;
        margin:0;
        display:flex;
        align-items:center;
    }
    footer ul li {
        margin: .25rem;
    }
    footer button {
        background-color: transparent;
        border:none;
        padding:0;
        margin:0
    }
    footer svg.task-level {
        stroke-width: 3;
        stroke:var(--secondary);
        transform: translateY(-3px);
    }
    footer svg.voorbeeld {
        fill: var(--highlight-secondary)
    }
    footer svg.task-level path {
        opacity:0;
        fill:var(--highlight-secondary)
    }
    footer svg.imitatie path#duplicate,
    footer svg.experiment path#experiment,
    footer svg.uitbreiding path#extension {
        opacity:1;

    }
    footer svg.task-level path {
        opacity:0
    }
    footer svg.task-level path {
        opacity:0
    }
</style>

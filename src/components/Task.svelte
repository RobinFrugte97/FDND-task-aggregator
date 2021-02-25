<script>
    import Tags from "./Tags.svelte"
    export let task
    
    const supportLevels = ["voorbeeld", "imitatie", "experiment", "uitbreiding", "autonoom"]
</script>


<a href={task.url}>
    <article>
        <h4>{task.title}</h4>
        <p><strong>{task.client}</strong></p>
        <div>
            <p>{task.semesterName} /</p>
            <p> {task.sprintName}</p>
        </div>
        
        <footer>

            <p>
                <svg  class="task-level" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 44 44">
                    <path d="M38.3,21.8c0,9.1-7.4,16.5-16.5,16.5S5.3,30.9,5.3,21.8"/>
                    <circle cx="22" cy="22" r="16.5"/>
                    <path d="M5.5,22h33"/>
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
        padding: .5em 1rem;
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
    footer {
        background-color: rgba(0,0,0,0.1);
        /background-color: var(--highlight-secondary);
        width:calc(100% + 2rem);
        margin:1em -1rem -.5rem;
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
    svg {
        width:1.75rem;
        stroke: var(--secondary);
        stroke-width:1.5;
        fill:none;
        stroke-linecap:round; 
        stroke-linejoin: round;
    }
    footer svg.task-level {
        stroke-width: 3;
        transform: translateY(-3px)
    }
    footer svg.task-level path:first-of-type {
       fill: var(--highlight-secondary)
    }
    
    footer svg.task-level circle, 
    footer svg.task-level path:last-of-type{
        stroke:var(--secondary)
    }


</style>
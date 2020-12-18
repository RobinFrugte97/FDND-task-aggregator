# task-aggregation
Aggregates all tasks and task descriptions from organisation fdnd-task (work in progress)

## Description 🤓

![](https://user-images.githubusercontent.com/27618252/102607935-66da9e00-4129-11eb-9523-618480764725.png)

<!-- Edit this link with a new deployment after every new release or use your own deployment of choice ;) -->
[Live link](https://unruffled-mcnulty-9f3556.netlify.app/)

This project is a tool made for FDND-students. Its purpose is to gather all FDND-tasks and display them in a clear overview. 

The overview of tasks, together with a couple of [features](#features), makes it easy to find specific tasks.

## Table of Contents

- [Titel](#titel)
  * [Description](#description)
  * [Features](#features)
  * [Installation](#installation)
  * [Use](#use)
  * [To-Do list](#To-Do-list)
  * [Sources](#sources)
  * [License](#license)

## Features

### Svelte

This project is made in the framework [Svelte](https://www.svelte.dev). Svelte is different from other frameworks.
Where other frameworks like React and Vue do their work in the browser, Svelte does its work in the build-stage of the project. Svelte can be viewed as a compiler. Instead of using a virtual DOM like most frameworks, Svelte writes code to update the dom whenever the state of the application changes.

### Searchbar

You can search for specific tasks based on a couple of things:
- Task name
- Sprint name
- Semester name
- Any tag

Results are automatically displayed on user input.

### Datalist

Whilst typing, you are presented with suggestions using the html `<datalist>` element. The options inside the datalist are dynamicly calculated based on user input.

### Sorting

The tasks can be sorted based on `task-order` and `alphabetical-order`.

Sorting based on difficulty and the sorting interface are work-in-progress.

The default sorting is based on `task-order`.

## Installation

Clone this repository:
```bash
$ git clone https://github.com/fdnd/task-aggregation.git
```

Navigate to the folder:
```bash
$ cd task-aggregation
```

Install all necessary packages and use rollup to build the project:
```bash
$ npm install
$ npm run build
```

You will need a `.env`-file to be able to fetch the task data.

Create one with the following (replace everything after the "="):
```
GITHUB_PERSONAL_ACCESS_TOKEN=***Your personal access token from github.com/settings/tokens***
```

## Use

Make sure all packages are installed and fire up the script using:
```bash
$ npm install
$ npm start
```

Once everything the project is running, navigate to http://localhost:5000/ in your favourite web browser.

## To-Do list

- [ ] Finishing up sorting.
- [ ] Add a filtering function.
- [ ] Store user data in a cookie.
- [ ] Group tasks based on client.


## Sources

- [Svelte](https://svelte.dev)
- [Svelte docs](https://svelte.dev/tutorial/)
- [FDND-task github page](https://github.com/fdnd-task)
- [FDND](https://fdnd.nl/)

## License

![GNU GPL V3](https://www.gnu.org/graphics/gplv3-127x51.png)

This work is licensed under [GNU GPLv3](./LICENSE).

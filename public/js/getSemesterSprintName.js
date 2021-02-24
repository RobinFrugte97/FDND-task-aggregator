const semesters = ["Static Web", "Data-Driven Web", "Workflows, Tools and Frameworks", "Mastertest"]
const sprints = ["Your Tribe", "The Client", "All Human", "The Campaign", "Fix the Flow", "The Startup", "Connect Your Tribe", "Keep users in control", "The Web is for everyone", "Content first", "Connecting people", "Proof of concept", "Your Tribe for Life!", "Choices, choices..", "Team up", "Back to static", "Lose your head", "Let's JAM!", "Sprint X"]

// A function that adds the sprint and semester name to the existing task objects and pushes them into an empty array to return for display.
export function getSemesterSprintName(tasks) {
    let tasksWithNames = []
    tasks.map(task => {
        task.semesterName = semesters[task.semester - 1]
        task.sprintName = sprints[task.sprint - 1]
        tasksWithNames.push(task)
    })
    return tasksWithNames
}

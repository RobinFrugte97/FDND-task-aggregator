export function sortByTaskOrder(taskList) {
    taskList.sort((a, b) => {
            return a.sprint - b.sprint
    })
}
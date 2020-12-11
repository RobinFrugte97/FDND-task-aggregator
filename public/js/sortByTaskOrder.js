export function sortByTaskOrder(taskList) {
    return taskList.sort((a, b) => {
            return a.sprint - b.sprint
    })
}
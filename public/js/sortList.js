import { sortByTaskOrder } from "../js/sortByTaskOrder.js" 
import { sortByReverseTaskOrder } from "./sortByReverseTaskOrder.js" 
import { sortByAlphabeticalOrder } from "./sortByAlphabeticalOrder.js" 
import { sortByReverseAlphabeticalOrder } from "./sortByReverseAlphabeticalOrder.js" 
import { sortByDifficultyOrder } from "./sortByDifficultyOrder.js"
import { sortByReverseDifficultyOrder } from "./sortByReverseDifficultyOrder.js"


export function sortList(taskList, selected) {
	if(selected.id === 1) {
		return sortByAlphabeticalOrder(taskList)
	} else if(selected.id === 2) {
		return sortByReverseAlphabeticalOrder(taskList)
	} else if(selected.id === 3) {
		return sortByTaskOrder(taskList)
	} else if(selected.id === 4) {
		return sortByReverseTaskOrder(taskList)
	} else if(selected.id === 5) {
		return sortByDifficultyOrder(taskList)
	} else if(selected.id === 6) {
		return sortByReverseDifficultyOrder(taskList)
	}
}
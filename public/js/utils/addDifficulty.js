// Function that sorts the tasks based on task sprint.
/* 

5 criteria, values can be 0, 1, or 2
To make math easier i do the values * 10 so that if you sum up all the values the max value is 100

Support level has an impact of number times 4, so support-level 2 means: 8
Then decrease the behavior criteria value with the support level and you have the difficulty. 

Max values of support level mean
20+20+20+20+20 = 100
5*4 = 20
100-20= 80 difficulty

*/
export function addDifficulty(taskList) {
	taskList.forEach(item => 
		item['task-difficulty'] = 
		(item['behavior-criteria']['collaboration'] * 10) +
		(item['behavior-criteria']['learning-capacity'] * 10) +
		(item['behavior-criteria']['problem-solving'] * 10) +
		(item['behavior-criteria']['act-methodically'] * 10) +
		(item['behavior-criteria']['communicating'] * 10) -
		(item['support-level'] * 4)
		)
	return taskList
}
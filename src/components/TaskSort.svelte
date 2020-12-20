<script>
	const sortOptions = [
		{
			id: 1,
			text: 'A-Z'
		},
		{
			id: 2,
			text: 'Z-A'
		},
		{
			id: 3,
			text: 'Task descending'
		},
		{
			id: 4,
			text: 'Task ascending'
		},
		{
			id: 5,
			text: 'Difficulty ascending'
		},
		{
			id: 6,
			text: 'Difficulty descending'
		}
	]

	let selected

	function handleSubmit() {

	}
</script>

<form on:submit|preventDefault={handleSubmit}>
	<select value={selected}>
		{#each sortOptions as sortOption}
			<option value={sortOption}>
				{sortOption.text}
			</option>
		{/each}
	</select>
</form>


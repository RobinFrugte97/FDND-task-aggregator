<script>
	import {createEventDispatcher} from "svelte"
    const dispatcher = createEventDispatcher()
	const selectOptions = [
		{
			id: 1,
			text: 'A-Z',
		},
		{
			id: 2,
			text: 'Z-A'
		},
		{
			id: 3,
			text: 'Task descending',
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

	export let selected
</script>

<form action="#">
	<div class="select">
		<select bind:value={selected} on:blur={() => dispatcher('updateSort')}>
			{#each selectOptions as option}
				<option value={option}>
					{option.text}
				</option>
			{/each}
		</select>
		<span class="focus"></span>
	</div>
</form>

<style>
	form {
		display:none;
	}
	select {
		appearance: none;
		background-color: transparent;
		border: none;
		padding: 0;
		margin: 0;
		width: 100%;
		font-family: inherit;
		font-size: inherit;
		cursor: inherit;
		line-height: inherit;
		outline: none;
	}

	select::-ms-expand {
		display: none;
	}

	.select {
		width: 100%;
		min-width: 15ch;
		max-width: 30ch;
		border: 1px solid var(--select-border);
		border-radius: calc(var(--radius) / 2);
		font-size: 1.25rem;
		cursor: pointer;
		line-height: 1.1;
		background-color: var(--primary);
		position: relative;
		display: flex;
		align-items: center;
	}

	select {
		padding: 0.25em 2em 0.25em 0.5em;
	}
	.select::after {
		content: "";
		width: 0.8em;
		height: 0.5em;
		background-color:var(--secondary);
		clip-path: polygon(100% 0%, 0 0%, 50% 100%);
		pointer-events: none;
		position: absolute;
		right: 0.25em;
	}

	select:focus + .focus {
		position: absolute;
		top: -1px;
		left: -1px;
		right: -1px;
		bottom: -1px;
		border: 2px solid var(--select-focus);
		border-radius: inherit;
	}
</style>
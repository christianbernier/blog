<script lang="ts">
	import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	export let icon: IconDefinition;
	export let text: string;
	export let onClick: () => void = () => undefined;
</script>

<button on:click={() => onClick()}>
	<Fa {icon} />
	{text}
</button>

<style>
	button {
		display: flex;
		gap: var(--margin-md);
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}
</style>

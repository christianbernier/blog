<script lang="ts">
	import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa/src/fa.svelte';
	export let icon: IconDefinition;
	export let text: string;
	export let onClick: () => void = () => undefined;
</script>

<button on:click={() => onClick()}>
	<Fa {icon} color="#2F3B2B" />
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

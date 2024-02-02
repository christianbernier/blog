<script lang="ts">
	import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	export let description: string;
</script>

<div>
	<Fa icon={faTriangleExclamation} />
	{description}
</div>

<style>
	div {
		width: calc(100% - 2 * var(--margin-xl));
		background-color: var(--warning);
		color: var(--on-warning);
		padding: var(--margin-xl);
		border-radius: var(--margin-md);
		display: flex;
		flex-direction: row;
		gap: var(--margin-xl);
		align-items: center;
		font-size: var(--font-md);
	}
</style>

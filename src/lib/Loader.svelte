<script lang="ts">
	import Fa from 'svelte-fa';
	import { faSpinner } from '@fortawesome/free-solid-svg-icons';

	export let description = '';
</script>

<div class="spinner-container">
	<Fa icon={faSpinner} class="rotating" scale={2} />
	<span>{description}</span>
</div>

<style>
	.spinner-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 50px 0;
		gap: var(--margin-xl);
	}
</style>

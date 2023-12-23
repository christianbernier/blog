<script lang="ts">
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faSpinner } from '@fortawesome/free-solid-svg-icons';
</script>

<div class="spinner-container">
	<Fa icon={faSpinner} class="rotating" scale={2} />
</div>

<style>
	.spinner-container {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 50px 0;
	}
</style>

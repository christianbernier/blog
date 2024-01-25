<script lang="ts">
	import { faCamera } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa/src/fa.svelte';
</script>

<div id="top-bar"></div>
<div id="content">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<h2 id="site-name" on:click={() => (location.href = '/')}>
		<Fa icon={faCamera} color="#2F3B2B" />
		Christian IRL
	</h2>
	<slot />
</div>

<style>
	#top-bar {
		height: var(--topbar-height);
		width: 100vw;
		background-color: #475841;
		margin-bottom: var(--topbar-height);
	}

	#content {
		width: min(70vw, 1200px);
		min-height: calc(100vh - 2 * var(--topbar-height));
		margin: 0 auto;
	}

	@media only screen and (max-width: 600px) {
		#content {
			width: 90vw;
		}
	}

	#site-name {
		font-family: 'Averia Libre';
		cursor: pointer;
	}
</style>

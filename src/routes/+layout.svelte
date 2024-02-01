<script lang="ts">
	import { faCamera } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	export let data;
</script>

<svelte:head>
	<title>{data.config.site.title}</title>
	<link
		rel="stylesheet"
		href={`https://pub-1844ca77bffb49e2a458b2ed97135420.r2.dev/${data.siteKey}.css`}
	/>
</svelte:head>
<div id="top-bar"></div>
<div id="content">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<h2 id="site-name" on:click={() => (location.href = '/')}>
		<Fa icon={faCamera} />
		{data.config.site.title}
	</h2>
	<slot />
</div>

<style>
	#top-bar {
		height: var(--topbar-height);
		width: 100vw;
		background-color: var(--top-bar-color);
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
		font-family: var(--font-site-name);
		cursor: pointer;
	}
</style>

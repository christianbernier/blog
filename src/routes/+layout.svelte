<div id="top-bar"></div>
<div id="content">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<h2 id="site-name" on:click={() => (location.href = '/')}>Christian IRL</h2>
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
		height: calc(100vh - 2 * var(--topbar-height));
		margin: 0 auto;
	}

	#site-name {
		cursor: pointer;
	}
</style>

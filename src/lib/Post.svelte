<script lang="ts">
	import { getPrettyDateString } from './date';
	import Header from './Header.svelte';
	import Back from './Back.svelte';
	import Loader from './Loader.svelte';
	import { onMount } from 'svelte';

	export let title: string;
	export let dateString: string;
	export let caption: string;
	export let imageLocation: string | undefined;

	$: date = getPrettyDateString(dateString);
	$: imageLoaded = false;

	onMount(() => {
		const imageElement = document.querySelector('#post__image') as HTMLImageElement;
		if (!imageElement) {
			return;
		}

		if (imageElement.complete) {
			imageLoaded = true;
		}
	});
</script>

<div class="post">
	<Header {title}>
		<Back url="/posts" />
	</Header>
	<p class="date">{date}</p>
	{#if imageLocation}
		<img
			id="post__image"
			src={imageLocation}
			alt={caption}
			class={imageLoaded ? '' : 'invisible'}
			on:load={() => (imageLoaded = true)}
		/>
		{#if !imageLoaded}
			<Loader description="Loading..." />
		{/if}
	{/if}
	<p class="caption">{caption}</p>
</div>

<style>
	.post {
		margin-bottom: 100px;
	}

	.date {
		font-style: italic;
		margin-top: 0;
		font-weight: var(--font-thin);
	}

	p {
		font-size: var(--font-md);
	}

	img {
		max-width: 80%;
		border: 4px solid var(--on-background);
		border-radius: var(--margin-md);
		overflow: hidden;
	}
</style>

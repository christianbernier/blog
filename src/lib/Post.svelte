<script lang="ts">
	import { getPrettyDateString } from './date';
	import Header from './Header.svelte';
	import Back from './Back.svelte';
	import Loader from './Loader.svelte';
	import { onMount } from 'svelte';
	import Button from './Button.svelte';
	import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

	export let title: string;
	export let dateString: string;
	export let caption: string;
	export let imageLocation: string | undefined;
	export let previousPost: string | null;
	export let nextPost: string | null;

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
	<div class="next-prev-buttons-container">
		{#if previousPost}
			<Button
				icon={faArrowLeft}
				text="Previous"
				onClick={() => (location.href = `/posts/${previousPost}`)}
			/>
		{:else}
			<div></div>
		{/if}
		{#if nextPost}
			<Button
				icon={faArrowRight}
				text="Next"
				onClick={() => (location.href = `/posts/${nextPost}`)}
			/>
		{:else}
			<div></div>
		{/if}
	</div>
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

	.next-prev-buttons-container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
</style>

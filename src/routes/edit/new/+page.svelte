<script lang="ts">
	import Back from '$lib/Back.svelte';
	import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
	import Button from '$lib/Button.svelte';
	import Header from '$lib/Header.svelte';
	import { deserialize } from '$app/forms';
	import imageCompression from 'browser-image-compression';
	import { FormState } from '$lib/form-state';
	import Loader from '$lib/Loader.svelte';
	import type { EventHandler } from 'svelte/elements';
	import ImageFormElement from '$lib/ImageFormElement.svelte';

	const date = new Date().toISOString().slice(0, 10);
	let currentPost = {
		id: undefined,
		title: 'Title',
		published_on: date,
		caption: `Caption`,
	};

	$: formState = FormState.EDITING;

	const submitPost: EventHandler<SubmitEvent, HTMLFormElement> = async (event) => {
		if (!event.target) {
			return;
		}

		const formData = new FormData(event.target as HTMLFormElement);

		const originalImage = formData.get('image') as File | null;
		if (!originalImage) {
			return;
		}

		const options = {
			maxSizeMB: 1,
			useWebWorker: true,
		};

		formState = FormState.COMPRESSING;
		let compressedImage;
		try {
			compressedImage = await imageCompression(originalImage, options);
		} catch (error) {
			console.log(error);
			return;
		}

		formData.delete('image');
		formData.append('image', compressedImage);

		formState = FormState.UPLOADING;
		const response = await fetch((event.target as EventTarget & HTMLFormElement).action, {
			method: 'POST',
			body: formData,
		});

		const result = deserialize(await response.text());

		if (result.type === 'success') {
			location.href = `/posts/${currentPost.id}`;
		}
	};
</script>

<Header title="New Post">
	<Back url="/edit" />
</Header>

{#if formState === FormState.EDITING}
	<form method="POST" enctype="multipart/form-data" on:submit|preventDefault={submitPost}>
		<div class="form-input">
			<label for="id">ID</label>
			<input name="id" type="text" required bind:value={currentPost.id} />
		</div>
		<div class="form-input">
			<label for="title">Title</label>
			<input name="title" type="text" required bind:value={currentPost.title} />
		</div>
		<div class="form-input">
			<label for="published">Published on</label>
			<input name="published" type="date" required bind:value={currentPost.published_on} />
		</div>
		<ImageFormElement name="image" label="Image" required={true} />
		<div class="form-input">
			<label for="caption">Caption</label>
			<textarea name="caption" required bind:value={currentPost.caption}></textarea>
		</div>
		<Button icon={faPaperPlane} text="Publish" />
	</form>
{:else if formState === FormState.COMPRESSING}
	<Loader description="Compressing..." />
{:else}
	<Loader description="Uploading..." />
{/if}

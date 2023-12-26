<script lang="ts">
	import Back from '$lib/Back.svelte';
	import Button from '$lib/Button.svelte';
	import Header from '$lib/Header.svelte';
	import Loader from '$lib/Loader.svelte';
	import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

	export let data;
	let currentPost = {
		title: undefined,
		published_on: undefined,
		caption: undefined,
	};

	$: !currentPost.title &&
		(async () => {
			currentPost = await data.streamed.post;
		})();
</script>

<Header title="Edit post">
	<Back url="/edit" />
</Header>

{#await data.streamed.post}
	<Loader />
{:then}
	<form method="POST">
		<div class="form-input">
			<label for="title">Title</label>
			<input name="title" type="text" required bind:value={currentPost.title} />
		</div>
		<div class="form-input">
			<label for="published">Published on</label>
			<input name="published" type="date" required bind:value={currentPost.published_on} />
		</div>
		<div class="form-input">
			<label for="caption">Caption</label>
			<textarea name="caption" required bind:value={currentPost.caption}></textarea>
		</div>
		<Button icon={faPaperPlane} text="Publish" />
	</form>
{/await}

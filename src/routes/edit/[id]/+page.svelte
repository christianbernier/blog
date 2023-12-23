<script lang="ts">
	import Back from '$lib/Back.svelte';
	import Button from '$lib/Button.svelte';
	import Header from '$lib/Header.svelte';
	import Loader from '$lib/Loader.svelte';
	import Post from '$lib/Post.svelte';
	import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

	export let data;
	let currentPost = {
		title: undefined,
		published_on: undefined,
		content: undefined,
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
	<Loader/>
{:then}
	<form method="POST">
		<label for="title">Title</label>
		<input name="title" type="text" bind:value={currentPost.title} />
		<br />
		<label for="published">Published on</label>
		<input name="published" type="date" bind:value={currentPost.published_on} />
		<br />
		<textarea name="content" bind:value={currentPost.content}></textarea>
		<br />
		<Button icon={faPaperPlane} text="Publish" />
	</form>
	<hr />
	<Post
		title={currentPost.title || ''}
		dateString={currentPost.published_on || ''}
		content={currentPost.content || ''}
	/>
{/await}

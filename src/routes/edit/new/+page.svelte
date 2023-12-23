<script lang="ts">
	import Back from '$lib/Back.svelte';
	import Post from '$lib/Post.svelte';
	import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
	import Button from '$lib/Button.svelte';
	import Header from '$lib/Header.svelte';

	const date = new Date().toISOString().slice(0, 10);
	let currentPost = {
		id: undefined,
		title: 'Title',
		published_on: date,
		content: `<p>\n\tContent\n</p>`,
	};
</script>

<Header title="New Post">
	<Back url="/edit" />
</Header>
<form method="POST">
	<label for="id">ID</label>
	<input name="id" type="text" bind:value={currentPost.id} />
	<br />
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

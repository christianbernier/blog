<script lang="ts">
	import Back from '$lib/Back.svelte';
	import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
	import Button from '$lib/Button.svelte';
	import Header from '$lib/Header.svelte';

	const date = new Date().toISOString().slice(0, 10);
	let currentPost = {
		id: undefined,
		title: 'Title',
		published_on: date,
		caption: `Caption`,
	};
</script>

<Header title="New Post">
	<Back url="/edit" />
</Header>
<form method="POST" enctype="multipart/form-data">
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
	<div class="form-input">
		<label for="image">Image</label>
		<input name="image" type="file" required />
	</div>
	<div class="form-input">
		<label for="caption">Caption</label>
		<textarea name="caption" required bind:value={currentPost.caption}></textarea>
	</div>
	<Button icon={faPaperPlane} text="Publish" />
</form>

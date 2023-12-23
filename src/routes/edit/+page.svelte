<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { getPrettyDateString } from '$lib/date.js';
	import { faPlus } from '@fortawesome/free-solid-svg-icons';
	import Button from '$lib/Button.svelte';
	import Header from '$lib/Header.svelte';

	export let data;

	const onDelete = async (postId: string): Promise<void> => {
		const confirm = window.confirm(`Are you sure you want to delete '${postId}'?`);
		if (!confirm) {
			return;
		}

		await fetch(`/api/posts/${postId}`, {
			method: 'DELETE',
		});

		invalidateAll();
	};
</script>

<div id="posts-container">
	<Header title="Posts">
		<Button icon={faPlus} text="New" onClick={() => (location.href = '/edit/new')} />
	</Header>
	<table>
		<thead>
			<th>Title</th>
			<th>Published Date</th>
			<th>Actions</th>
		</thead>
		{#await data.posts then posts}
			{#each posts as post}
				<tr>
					<td>
						<a href={`/posts/${post.id}`}>{post.title}</a>
					</td>
					<td>{getPrettyDateString(post.published_on)}</td>
					<td>
						<a href={`/edit/${post.id}`}>Edit</a>
						<!-- svelte-ignore a11y-invalid-attribute -->
						<a href="#" on:click={() => onDelete(post.id)}>Delete</a>
					</td>
				</tr>
			{/each}
		{/await}
	</table>
</div>

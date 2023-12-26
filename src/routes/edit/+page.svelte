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

<Header title="Posts">
	<Button icon={faPlus} text="New" onClick={() => (location.href = '/edit/new')} />
</Header>
{#await data.posts then posts}
	{#if posts.length > 0}
		<table>
			<thead>
				<th>Title</th>
				<th>Published Date</th>
				<th>Actions</th>
			</thead>
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
		</table>
	{:else}
		<p class="no-posts">No posts</p>
	{/if}
{/await}

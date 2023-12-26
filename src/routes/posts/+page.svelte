<script lang="ts">
	import Header from '$lib/Header.svelte';
	import { getPrettyDateString } from '$lib/date.js';

	export let data;
</script>

<Header title="Posts" />

{#await data.posts then posts}
	{#if posts.length > 0}
		<table>
			<thead>
				<th>Title</th>
				<th>Date</th>
			</thead>
			{#each posts as post}
				<tr>
					<td>
						<a href={`/posts/${post.id}`}>{post.title}</a>
					</td>
					<td>{getPrettyDateString(post.published_on)}</td>
				</tr>
			{/each}
		</table>
	{:else}
		<p class="no-posts">No posts</p>
	{/if}
{/await}

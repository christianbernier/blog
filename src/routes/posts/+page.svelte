<script lang="ts">
	import Header from '$lib/Header.svelte';
	import { getPrettyDateString } from '$lib/date.js';

	export let data;
</script>

<Header title="Posts" />
<table>
	<thead>
		<th>Title</th>
		<th>Date</th>
	</thead>
	{#await data.posts then posts}
		{#each posts as post}
			<tr>
				<td>
					<a href={`/posts/${post.id}`}>{post.title}</a>
				</td>
				<td>{getPrettyDateString(post.published_on)}</td>
			</tr>
		{/each}
	{/await}
</table>

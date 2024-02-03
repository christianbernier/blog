<script lang="ts">
	import Post from '$lib/Post.svelte';
	import Loader from '$lib/Loader.svelte';
	export let data;
</script>

{#await data.post}
	<Loader />
{:then post}
	<Post
		title={post.title}
		dateString={post.published_on}
		caption={post.caption}
		imageLocation={post.image_location}
		previousPost={post.previous_post}
		nextPost={post.next_post}
	/>
{/await}

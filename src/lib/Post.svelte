<script lang="ts">
	import { getPrettyDateString } from './date';
	import Header from './Header.svelte';
	import Back from './Back.svelte';

	export let title: string;
	export let dateString: string;
	export let content: string;

	$: date = getPrettyDateString(dateString);
</script>

<Header {title}>
	<Back url="/posts" />
</Header>
<p class="date">{date}</p>
{@html content}

<style>
	.date {
		font-style: italic;
		margin-top: 0;
		font-weight: var(--font-thin);
	}

	p {
		font-size: var(--font-md);
	}
</style>

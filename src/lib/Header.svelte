<script lang="ts">
	export let title: string;
</script>

<div>
	<h1>{title}</h1>
	<slot />
</div>

<style>
	div {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: var(--margin-lg) 0;
	}

	h1 {
		margin: 0;
	}
</style>

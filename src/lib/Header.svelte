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
	}

	h1 {
		margin-bottom: 0;
	}
</style>

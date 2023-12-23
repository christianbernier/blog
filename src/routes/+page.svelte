<script>
	import Button from '$lib/Button.svelte';
	import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';
</script>

<div class="container">
	<div class="left">
		<h1>Welcome!</h1>
	</div>
	<div class="right">
		<p>
			Christian IRL is a daily blog where I post a photo and brief caption about my activities every
			day. Click the button below to see what I've posted. Let me know what you think!
		</p>

		<Button icon={faDoorOpen} text="Enter" onClick={() => (location.href = '/posts')} />
	</div>
</div>

<style>
	.container {
		margin-top: 20%;
	}

	.right {
		max-width: 60%;
	}
</style>

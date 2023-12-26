<script>
	import Button from '$lib/Button.svelte';
	import Profile from '$lib/assets/profile.jpg';
	import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';
</script>

<div class="container">
	<div class="left">
		<img class="profile" src={Profile} alt="Christian Bernier" />
		<h1 class="welcome">Welcome!</h1>
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

	.left {
		height: 80px;
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: var(--margin-xl);
	}

	.profile {
		width: 80px;
		height: 80px;
		border-radius: 50%;
	}

	.welcome {
		font-family: "Rubik Doodle Shadow";
		font-size: var(--font-xl);
		margin: 0;
	}

	.right {
		max-width: 60%;
	}
</style>

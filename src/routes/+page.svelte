<script>
	import Button from '$lib/Button.svelte';
	import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';
	export let data;
</script>

<div class="container">
	<div class="left">
		<img
			class="profile"
			src={`https://pub-1844ca77bffb49e2a458b2ed97135420.r2.dev/${data.siteKey}.profile.jpg`}
			alt="Profile"
		/>
		<h1 class="welcome">{data.config.homepage.header}</h1>
	</div>
	<div class="right">
		<p>{data.config.homepage.description}</p>

		<Button
			icon={faDoorOpen}
			text={data.config.homepage.button}
			onClick={() => (location.href = '/posts')}
		/>
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

	@media only screen and (max-width: 600px) {
		.left {
			height: fit-content;
			flex-direction: column;
			align-items: flex-start;
		}
	}

	.profile {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		object-fit: cover;
	}

	.welcome {
		font-family: var(--font-welcome);
		font-size: var(--font-xl);
		margin: 0;
	}

	.right {
		max-width: 60%;
	}
</style>

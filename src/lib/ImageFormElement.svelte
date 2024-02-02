<script lang="ts">
	import type { ChangeEventHandler } from 'svelte/elements';

	export let name = '';
	export let label = '';
	export let defaultValue = 'https://pub-1844ca77bffb49e2a458b2ed97135420.r2.dev/placeholder.png';
	export let required = false;

	let currentImage = defaultValue || '';

	const imageChanged: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
		if (!target) {
			return;
		}
		const files = (target as HTMLFormElement).files;
		if (files && files[0]) {
			const reader = new FileReader();
			reader.onload = ({ target }) => {
				if (!target) {
					return;
				}

				currentImage = target.result as string;
			};

			reader.readAsDataURL(files[0]);
		}
	};
</script>

<div class="form-input">
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label>{label}</label>
	<div>
		<img src={currentImage} alt="Profile" />
		<div>
			<label for={name} class="fake-button">Change</label>
			<input {name} id={name} type="file" on:change={imageChanged} {required} />
		</div>
	</div>
</div>

<style>
	.form-input {
		display: flex;
		flex-direction: column;
	}

	.form-input > div {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: var(--margin-lg);
	}

	input {
		visibility: hidden;
	}

	img {
		max-width: 300px;
		max-height: 300px;
		width: auto;
		height: auto;
	}
</style>

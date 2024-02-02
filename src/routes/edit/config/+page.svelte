<script lang="ts">
	import { deserialize } from '$app/forms';
	import Back from '$lib/Back.svelte';
	import Button from '$lib/Button.svelte';
	import Header from '$lib/Header.svelte';
	import ImageFormElement from '$lib/ImageFormElement.svelte';
	import Loader from '$lib/Loader.svelte';
	import Warning from '$lib/Warning.svelte';
	import { FormState } from '$lib/form-state.js';
	import type { EditableSiteConfig } from '$lib/site-config.js';
	import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
	import imageCompression from 'browser-image-compression';
	import { onMount } from 'svelte';
	import type { EventHandler } from 'svelte/elements';

	export let data;
	let currentConfig: EditableSiteConfig = {
		site: {
			title: '',
		},
		homepage: {
			header: '',
			description: '',
			button: '',
		},
		styles: {
			colors: {
				background: '#ffffff',
				onBackground: '',
				primary: '',
				onPrimary: '',
				secondary: '',
				onSecondary: '',
				topBar: '',
			},
			fonts: {
				default: '',
				welcome: '',
				siteName: '',
			},
		},
	};

	$: formState = FormState.EDITING;

	onMount(async () => {
		currentConfig = await data.streamed.config;
	});

	const submitConfig: EventHandler<SubmitEvent, HTMLFormElement> = async (event) => {
		if (!event.target) {
			return;
		}

		const formData = new FormData(event.target as HTMLFormElement);

		const originalImage = formData.get('homepage__profile') as File | null;
		if (originalImage && originalImage.size > 0) {
			const options = {
				maxSizeMB: 0.5,
				useWebWorker: true,
			};

			formState = FormState.COMPRESSING;
			let compressedImage;
			try {
				compressedImage = await imageCompression(originalImage, options);
			} catch (error) {
				console.log(error);
				return;
			}

			formData.delete('homepage__profile');
			formData.append('homepage__profile', compressedImage);
		}

		formState = FormState.UPLOADING;
		const response = await fetch((event.target as EventTarget & HTMLFormElement).action, {
			method: 'POST',
			body: formData,
		});

		const result = deserialize(await response.text());

		if (result.type === 'success') {
			location.href = `/`;
		}
	};
</script>

<Header title="Site configuration">
	<Back url="/edit" />
</Header>

{#await data.streamed.config}
	<Loader description="Loading current site config..." />
{:then}
	{#if formState === FormState.EDITING}
		<Warning
			description="Changes will take place immediately when this page is submitted, but may take a few minutes to appear."
		/>
		<form method="POST" enctype="multipart/form-data" on:submit|preventDefault={submitConfig}>
			<div class="form-input-group">
				<p class="form-input-group-header">Site</p>
				<div class="form-input">
					<label for="site__title">Title</label>
					<input name="site__title" type="text" required bind:value={currentConfig.site.title} />
				</div>
			</div>

			<div class="form-input-group">
				<p class="form-input-group-header">Homepage</p>
				<div class="form-input">
					<label for="homepage__header">Header</label>
					<input
						name="homepage__header"
						type="text"
						required
						bind:value={currentConfig.homepage.header}
					/>
				</div>
				<div class="form-input">
					<label for="homepage__description">Description</label>
					<textarea
						name="homepage__description"
						required
						bind:value={currentConfig.homepage.description}
					></textarea>
				</div>
				<div class="form-input">
					<label for="homepage__button_text">Button text</label>
					<input
						name="homepage__button_text"
						type="text"
						required
						bind:value={currentConfig.homepage.button}
					/>
				</div>
				<ImageFormElement
					name="homepage__profile"
					label="Profile picture"
					defaultValue={`https://pub-1844ca77bffb49e2a458b2ed97135420.r2.dev/${data.siteKey}.profile.jpg`}
				/>
			</div>

			<div class="form-input-group">
				<p class="form-input-group-header">Colors</p>
				<div class="form-input form-input-color">
					<label for="colors__background">Background</label>
					<input
						name="colors__background"
						type="color"
						required
						bind:value={currentConfig.styles.colors.background}
					/>
				</div>
				<div class="form-input form-input-color">
					<label for="colors__on_background">On background</label>
					<input
						name="colors__on_background"
						type="color"
						required
						bind:value={currentConfig.styles.colors.onBackground}
					/>
				</div>
				<div class="form-input form-input-color">
					<label for="colors__primary">Primary</label>
					<input
						name="colors__primary"
						type="color"
						required
						bind:value={currentConfig.styles.colors.primary}
					/>
				</div>
				<div class="form-input form-input-color">
					<label for="colors__on_primary">On primary</label>
					<input
						name="colors__on_primary"
						type="color"
						required
						bind:value={currentConfig.styles.colors.onPrimary}
					/>
				</div>
				<div class="form-input form-input-color">
					<label for="colors__secondary">Secondary</label>
					<input
						name="colors__secondary"
						type="color"
						required
						bind:value={currentConfig.styles.colors.secondary}
					/>
				</div>
				<div class="form-input form-input-color">
					<label for="colors__on_secondary">On secondary</label>
					<input
						name="colors__on_secondary"
						type="color"
						required
						bind:value={currentConfig.styles.colors.onSecondary}
					/>
				</div>
				<div class="form-input form-input-color">
					<label for="colors__top_bar">Top bar</label>
					<input
						name="colors__top_bar"
						type="color"
						required
						bind:value={currentConfig.styles.colors.topBar}
					/>
				</div>
			</div>

			<div class="form-input-group">
				<p class="form-input-group-header">Fonts</p>
				<p class="form-input-help">
					Note: Only certain fonts are installed on the site and they must be entered as CSS values.
					Please ask Christian if you would like a new font.
				</p>
				<div class="form-input">
					<label for="fonts__default">Default</label>
					<input
						name="fonts__default"
						type="text"
						required
						bind:value={currentConfig.styles.fonts.default}
					/>
				</div>
				<div class="form-input">
					<label for="fonts__welcome">Welcome</label>
					<input
						name="fonts__welcome"
						type="text"
						required
						bind:value={currentConfig.styles.fonts.welcome}
					/>
				</div>
				<div class="form-input">
					<label for="fonts__site_name">Site name</label>
					<input
						name="fonts__site_name"
						type="text"
						required
						bind:value={currentConfig.styles.fonts.siteName}
					/>
				</div>
			</div>

			<Button icon={faPaperPlane} text="Publish" />
		</form>
	{:else if formState === FormState.COMPRESSING}
		<Loader description="Compressing..." />
	{:else}
		<Loader description="Uploading..." />
	{/if}
{/await}

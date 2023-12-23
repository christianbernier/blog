<script>
	import Header from '$lib/Header.svelte';
	import { page } from '$app/stores';
	import Button from '$lib/Button.svelte';
	import { faHome } from '@fortawesome/free-solid-svg-icons';
</script>

<Header title={`${$page.error?.message || 'Error'} (${$page.status})`} />

<p>
	There was an error handling your request. Please try again, or return to the homepage by clicking
	the button below.
</p>

<Button icon={faHome} text="Home" onClick={() => (location.href = '/')} />

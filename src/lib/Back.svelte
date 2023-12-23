<script lang="ts">
	export let url: string;
	import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
	import Button from './Button.svelte';
</script>

<Button icon={faArrowLeft} text="Back" onClick={() => (location.href = url)} />

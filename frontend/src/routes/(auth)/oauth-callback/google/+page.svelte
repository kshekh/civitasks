<script lang="ts">
	import { handleGoogleCallback } from '$utils/auth/supertokens';
	import { onMount } from 'svelte';
	onMount(() => {
		handleGoogleCallback();
	});
</script>

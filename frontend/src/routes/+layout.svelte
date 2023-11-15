<script lang="ts">
	import { Toasts } from 'svoast';
	import AppHeader from '$components/reusable/AppHeader.svelte';
	import '../app.css';
	import { toastPosition } from '$stores';
</script>

<svelte:head><title>Solana Hyperdrive Hackathon</title></svelte:head>
<Toasts position={$toastPosition} />
<AppHeader />
<slot />

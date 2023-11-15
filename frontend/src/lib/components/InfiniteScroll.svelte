<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	export let hasMore = true;
	let loadingRef: HTMLElement | undefined;
	const dispatch = createEventDispatcher();
	onMount(() => {
		if (!loadingRef) {
			return;
		}
		const loadingObserver = new IntersectionObserver((entries) => {
			const element = entries[0];
			if (element.isIntersecting && hasMore) {
				dispatch('load-more');
			}
		});

		loadingObserver.observe(loadingRef);
	});
</script>

<!-- TODO consider adding a loading spinner -->
<div bind:this={loadingRef} class="h-px w-full" />

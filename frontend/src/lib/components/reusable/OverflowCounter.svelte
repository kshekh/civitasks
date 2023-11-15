<script lang="ts">
	import Button from './Button.svelte';
	let container: HTMLDivElement;
	let overflowingChildrenCount = 0;
	function checkOverflow() {
		const isOverflowing = container.clientWidth < container.scrollWidth;
		if (isOverflowing) {
			container.removeChild(container.lastElementChild!);
			overflowingChildrenCount++;
			checkOverflow();
		}
	}
	$: if (container) checkOverflow();
</script>

<div
	bind:this={container}
	class="relative flex w-full max-w-full items-center gap-x-2 overflow-hidden"
>
	<slot />
	{#if overflowingChildrenCount > 0}
		<Button tertiary class="flex !h-6 !w-fit !justify-start whitespace-nowrap {$$props.class}">
			+{overflowingChildrenCount}
		</Button>
	{/if}
</div>

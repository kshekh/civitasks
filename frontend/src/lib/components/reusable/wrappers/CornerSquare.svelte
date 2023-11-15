<script lang="ts">
	import { slide } from 'svelte/transition';

	export let primary = false;
</script>

<div
	transition:slide={{ axis: 'x' }}
	on:click={(e) => {
		e.stopPropagation();
	}}
	class:primary
	class="w-full relative h-screen sm:h-fit max-h-screen {$$props.class}"
>
	<div class="square top-0 left-0" />
	<div class="square top-0 right-0" />
	<div class="square bottom-0 left-0" />
	<div class="square bottom-0 right-0" />
	<div class="vertical-line left-0" />
	<div class="vertical-line right-0" />
	<div class="horizontal-line top-0" />
	<div class="horizontal-line bottom-0" />
	<slot />
</div>

<style lang="postcss">
	.square {
		@apply w-2xs h-2xs absolute bg-gray-dark-11;
	}
	.vertical-line {
		@apply w-0.5 absolute inset-y-3 bg-gray-dark-2;
	}
	.horizontal-line {
		@apply h-0.5 absolute inset-x-3 bg-gray-dark-2;
	}
	.primary > .square {
		@apply bg-mint-dark-9;
	}
	.primary > .horizontal-line,
	.primary > .vertical-line {
		@apply bg-mint-dark-4;
	}
</style>

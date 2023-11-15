<script lang="ts">
	let image: HTMLImageElement;
	let loadFailed = false;
	let imageLoaded = false;
	export let src: string | undefined;
	export let alt = '';
</script>

<div class="aspect-square w-full {$$props.class}">
	<img
		bind:this={image}
		on:error={() => {
			loadFailed = true;
		}}
		on:load={() => {
			imageLoaded = true;
		}}
		{src}
		{alt}
		class:sr-only={!image?.complete || !imageLoaded}
		class="aspect-square w-full object-contain object-center"
	/>
	<div
		class:hidden={image?.complete || loadFailed || imageLoaded}
		class="bg-gray-dark-4 h-full w-full animate-pulse rounded-sm"
	></div>
</div>

<script lang="ts">
	import TriangleCornerIcon from '$icons/TriangleCornerIcon.svelte';

	export let tabs: { name: string; icon?: any }[] = [];
	export let selectedTab = 0;
</script>

<div class="flex items-center justify-start gap-x-2xs bg-gray-dark-0 p-[3px]">
	{#if tabs?.length > 0}
		{#each tabs as tab, i}
			{@const selected = selectedTab == i}
			<button
				class:selected
				class="relative flex items-center gap-x-sm px-lg h-10 text-base font-architekt font-normal leading-6 text-gray-dark-12"
				on:click={() => (selectedTab = i)}
			>
				<div class="triangles absolute inset-0 bg-transparent border-none">
					<TriangleCornerIcon class="text-gray-dark-0 absolute top-0 right-0" />
					<TriangleCornerIcon class="text-gray-dark-0 absolute bottom-0 right-0 rotate-90" />
					<TriangleCornerIcon class="text-gray-dark-0 absolute bottom-0 left-0 rotate-180" />
					<TriangleCornerIcon class="text-gray-dark-0 absolute top-0 left-0 -rotate-90" />
				</div>
				{#if tab.icon}
					<svelte:component this={tab.icon} />
				{/if}
				<span>{tab.name}</span>
			</button>
		{/each}
	{/if}
</div>

<style lang="postcss">
	button:hover {
		@apply bg-gray-dark-2;
	}
	.selected {
		@apply bg-gray-dark-3;
	}

	button:focus {
		@apply border border-mint-dark-8 ring-[3px] ring-mint-dark-4 rounded;
	}
	button:focus > .triangles {
		@apply hidden;
	}
</style>

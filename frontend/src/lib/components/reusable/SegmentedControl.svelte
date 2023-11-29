<script lang="ts">
	export let items: { [key: string]: string | number | boolean }[] = [];
	export let size: 'sm' | 'md' = 'sm';
	export let label = '';
	export let description = '';
	export let value: string | number | boolean = true;
</script>

<!-- TODO make this a radio group -->
<div>
	<div>
		<p class="font-architekt text-sm text-gray-dark-12 leading-5 font-normal">{label}</p>
		<p class="text-xs text-gray-dark-11 mb-sm">
			{description}
		</p>
	</div>
	<div class="w-full flex items-center gap-x-xs p-3xs mt-2 bg-gray-dark-1">
		{#if items?.length > 0}
			{#each items as item}
				{@const [key, itemValue] = Object.entries(item)?.[0]}
				<button
					type="button"
					class:sm={(size = 'sm')}
					class:md={(size = 'md')}
					class:active={value === itemValue}
					class="flex-1 flex items-center justify-center text-xs leading-4 font-medium text-gray-dark-11 border border-transparent ring-[3px] ring-transparent"
					on:click={() => (value = itemValue)}
				>
					{key}
				</button>
			{/each}
		{/if}
	</div>
</div>

<style lang="postcss">
	.sm {
		@apply h-8;
	}
	.md {
		@apply h-10;
	}
	button:hover {
		@apply text-gray-dark-12;
	}
	button:focus {
		@apply border-mint-dark-8 ring-mint-dark-4 rounded;
	}
	.active {
		@apply text-mint-dark-11 border-mint-dark-8 bg-mint-dark-2 rounded;
	}
</style>

<script lang="ts">
	import { slide } from 'svelte/transition';
	import CheckboxGroup from '../checkbox/CheckboxGroup.svelte';
	export let icon = null;
	export let dropdownOpen = false;
	export let items: string[] = [];
	export let multiple = false;
	export let selectedValue = '';
	export let selectedValues: string[] = [];
</script>

<div
	transition:slide
	class="max-h-[188px] h-fit py-2xs bg-gray-dark-3 rounded absolute z-10 inset-0 overflow-y-scroll"
>
	{#if items?.length > 0}
		{#if multiple}
			<div class="px-lg">
				<CheckboxGroup direction="vertical" bind:items bind:checked={selectedValues} on:change />
			</div>
		{:else}
			{#each items as item}
				<button
					type="button"
					on:click={() => {
						selectedValue = item;
						dropdownOpen = false;
					}}
					class="w-full py-2 px-lg flex items-center gap-x-2 text-gray-dark-12 leading-5 text-sm hover:bg-gray-dark-2 border border-transparent ring-[3px] ring-transparent focus:border-mint-dark-8 focus-within:ring-mint-dark-4"
				>
					{#if icon}
						<svelte:component this={icon} />
					{/if}
					<span>{item}</span>
				</button>
			{/each}
		{/if}
	{/if}
</div>

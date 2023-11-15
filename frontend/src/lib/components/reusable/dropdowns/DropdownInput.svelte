<script lang="ts">
	import { browser } from '$app/environment';
	import Chevron from '$icons/Chevron.svelte';
	import ErrorWarningAlertIcon from '$icons/ErrorWarningAlertIcon.svelte';
	import { createEventDispatcher } from 'svelte';
	import DropdownBody from './DropdownBody.svelte';
	import { clickOutside } from '$utils';
	const dispatch = createEventDispatcher();
	export let label = '';
	export let description = '';
	export let errors: string[] = [];
	export let items: string[];
	let searchableItems = items;
	let dropdownOpen = false;
	export let icon: any = null;
	export let selectedValue: string = '';
	export let selectedValues: string[] = [];
	export let multiple = false;
	$: id = crypto.randomUUID();
	export let disabled = false;
	$: disabled = items?.length === 0;
	$: placeholder = selectedValue || selectedValues?.length > 0 ? '' : 'Select';
	let inputElement: HTMLInputElement;
	let filterPhrase = '';
	$: {
		if (browser && dropdownOpen && inputElement) {
			inputElement?.focus();
		}
		if (!dropdownOpen) {
			filterPhrase = '';
			searchableItems = items;
		}
		if (filterPhrase) {
			searchableItems = items.filter((item) => {
				if (item.toLowerCase().includes(filterPhrase.toLowerCase())) {
					return item;
				}
			});
		} else {
			searchableItems = items;
		}
	}
</script>

<div
	class="w-full flex flex-col items-start font-inter text-xs leading-4 font-normal relative {$$props.class}"
	use:clickOutside={() => {
		dropdownOpen = false;
	}}
>
	<label for={id} class="">
		<p class="font-architekt text-sm text-gray-dark-12 leading-5 font-normal mb-1">{label}</p>
		<p class="text-gray-dark-11 mt-1 mb-2">
			{description}
		</p>
	</label>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		on:click={() => (dropdownOpen = true)}
		class="input-container {errors?.length > 0 ? 'border-red-dark-10' : 'border-gray-dark-4'}"
		class:focus={dropdownOpen}
	>
		<div class="flex items-center">
			{#if selectedValue || selectedValues?.length > 0}
				<span class="whitespace-nowrap">
					{#if selectedValues?.length >= 3}
						{selectedValues[0]} and {selectedValues?.length - 1} more
					{:else if selectedValues?.length > 0 && selectedValues?.length < 3}
						{selectedValues?.join(', ')}
					{:else if selectedValue}
						{selectedValue}
					{/if}
				</span>
			{/if}
			{#if dropdownOpen}
				<input
					bind:this={inputElement}
					bind:value={filterPhrase}
					on:keydown={(e) => {
						if (e.key == 'Backspace' && filterPhrase?.length == 0) {
							selectedValues = [];
							selectedValue = '';
						}
					}}
					type="text"
					class="bg-transparent outline-none flex-1 ml-2"
					{placeholder}
				/>
			{/if}
		</div>
		<button
			type="button"
			on:click|stopPropagation|preventDefault={() => (dropdownOpen = !dropdownOpen)}
		>
			<Chevron
				class="text-gray-dark-9 float-right duration-500 transform {dropdownOpen
					? '-rotate-180'
					: 'rotate-0'}"
			/>
		</button>
	</div>

	{#if dropdownOpen && searchableItems?.length > 0}
		<div class="relative w-full">
			<div class="absolute inset-x-0">
				<DropdownBody
					bind:dropdownOpen
					bind:items={searchableItems}
					bind:selectedValue
					bind:selectedValues
					bind:multiple
					bind:icon
					on:change={() => {
						filterPhrase = '';
						dispatch('change');
					}}
				/>
			</div>
		</div>
	{/if}
	{#if errors?.length > 0}
		{#each errors as error}
			{#if error}
				<div class="text-red-dark-10 flex justify-start items-center gap-x-1 gap-y-0.5 mt-2">
					<ErrorWarningAlertIcon />
					<p class="text-red-dark-10">{error}</p>
				</div>
			{/if}
		{/each}
	{/if}
</div>

<style>
	.input-container {
		@apply w-full h-10 px-lg flex items-center justify-between gap-x-lg relative bg-transparent outline-none text-gray-dark-12  caret-mint-dark-11 border rounded ring-[3px] ring-transparent cursor-pointer;
	}
	.input-container:disabled {
		@apply bg-gray-dark-3 cursor-not-allowed;
	}

	.focus {
		@apply border-mint-dark-8 ring-mint-dark-4;
	}
	.input-container:hover {
		@apply border-gray-dark-5;
	}
</style>

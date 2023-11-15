<script lang="ts">
	import SettingsHorizontalIcon from '$icons/SettingsHorizontalIcon.svelte';
	import Button from '$components/reusable/Button.svelte';
	import Modal from '$components/reusable/Modal.svelte';
	import DropdownInput from '$components/reusable/dropdowns/DropdownInput.svelte';
	import SlideOver from '$components/reusable/SlideOver.svelte';
	import { HYPERDRIVE_SUBMISSION_COUNTRIES, TRACKS } from '$utils/constants';
	import { page } from '$app/stores';
	import { goto, invalidateAll } from '$app/navigation';
	import type { IProjectSearchParams } from '$utils/interfaces/project';
	import MagnifyingGlass from '$icons/MagnifyingGlass.svelte';
	import TextInput from './reusable/TextInput.svelte';
	import { slide } from 'svelte/transition';
	import ShuffleIcon from '$icons/ShuffleIcon.svelte';

	let showProjectFilterModal = false;
	let projectSearchParams: IProjectSearchParams = $page.data.projectSearchParams ?? {};

	let searchPhrase = '';
	let searchResults: string[] = [];
	let searchInputId: string = 'searchInputBox';
	let searchTimeout: NodeJS.Timeout | number | undefined;

	const handlerFilter = async (adding: boolean = true) => {
		resetSearchQueryParams();
		if (adding) {
			Object.entries(projectSearchParams).forEach(([key, value]) => {
				if (!value) return;
				if (!Array.isArray(value)) $page.url.searchParams.set(key, value!.toString());
				else if (value?.length > 0) $page.url.searchParams.set(key, value!.join(','));
			});
		} else projectSearchParams = {};
		showProjectFilterModal = false;
		await goto(`?${$page.url.searchParams.toString()}`, { invalidateAll: true });
	};

	const resetSearchQueryParams = () => {
		Array.from($page.url.searchParams.keys()).forEach((key) => {
			Object.keys(projectSearchParams).includes(key) && $page.url.searchParams.delete(key);
		});
	};

	const search = async (ke: KeyboardEvent) => {
		clearTimeout(searchTimeout);
		searchTimeout = setTimeout(async () => {
			resetSearchQueryParams();
			if (
				searchPhrase?.length > 2 ||
				ke.key === 'Enter' ||
				ke.key === 'Backspace' ||
				ke.key === 'Delete'
			) {
				$page.url.searchParams.set('nameQuery', searchPhrase);
				await goto(`?${$page.url.searchParams.toString()}`, {
					invalidateAll: true,
					keepFocus: true
				});
			} else {
				$page.url.searchParams.delete('nameQuery');
			}
			document.getElementById(searchInputId)?.focus();
		}, 400);
	};

	const randomize = async () => {
		$page.url.searchParams.set('randomize', 'true');
		await goto(`?${$page.url.searchParams.toString()}`, { invalidateAll: true });
	};
</script>

<div class="mt-md gap-md relative flex w-full flex-col items-center justify-center md:flex-row">
	<TextInput
		bind:id={searchInputId}
		placeholder="Search by project name"
		bind:value={searchPhrase}
		on:keyup={(ke) => {
			search(ke);
		}}
		class="-mt-2"
	>
		<MagnifyingGlass slot="right-icon" />
	</TextInput>
	<div class="gap-x-md flex w-full md:w-min">
		<Button secondary size="md" class="flex-1" on:click={() => (showProjectFilterModal = true)}>
			<SettingsHorizontalIcon class="h-4 w-4" />
			<span>Filter</span>
		</Button>
		<Button secondary size="md" class="flex-1" on:click={randomize}>
			<ShuffleIcon class="h-4 w-4" />
			<span>Shuffle</span>
		</Button>
	</div>

	{#if searchPhrase && searchResults?.length > 0}
		<ul
			transition:slide
			class="bg-gray-dark-3 gap-y-3xs absolute top-14 z-10 flex w-fit flex-col rounded py-1"
		>
			{#each searchResults as result}
				<li class="px-lg hover:bg-gray-dark-2 py-2">
					<button
						on:click={async () => {
							searchPhrase = '';
							$page.url.searchParams.delete('nameQuery');
							$page.url.searchParams.set('role', result);
							await goto(`?${$page.url.searchParams.toString()}`);
							await invalidateAll();
							searchResults = [];
						}}
						class="text-paragraph !text-gray-dark-12 w-full text-left">{result}</button
					>
				</li>
			{/each}
		</ul>
	{/if}
</div>
<!-- Desktop Filter modal -->
<Modal bind:modalOpen={showProjectFilterModal} title="Filter Projects" class="hidden md:block">
	<div class="gap-y-lg flex flex-col">
		<DropdownInput
			label="Hackathon track"
			items={TRACKS}
			bind:selectedValue={projectSearchParams.track}
		/>
		<DropdownInput
			label="Country"
			items={HYPERDRIVE_SUBMISSION_COUNTRIES}
			bind:selectedValue={projectSearchParams.country}
		/>
		<div class="gap-x-lg flex items-center">
			<Button tertiary size="md" class="flex-1" on:click={() => handlerFilter(false)}>Cancel</Button
			>
			<Button secondary size="md" class="flex-1" on:click={() => handlerFilter(true)}>Save</Button>
		</div>
	</div>
</Modal>
<!-- Mobile Filter Slideover -->
<SlideOver
	bind:slideOverOpen={showProjectFilterModal}
	title="Filter Projects"
	class="block !h-screen md:hidden"
>
	<div class="gap-y-lg flex flex-col">
		<DropdownInput
			label="Hackathon track"
			items={TRACKS}
			bind:selectedValue={projectSearchParams.track}
		/>
		<DropdownInput
			label="Country"
			items={HYPERDRIVE_SUBMISSION_COUNTRIES}
			bind:selectedValue={projectSearchParams.country}
		/>
		<div class="gap-x-lg flex items-center">
			<Button tertiary size="md" class="flex-1" on:click={() => handlerFilter(false)}>Cancel</Button
			>
			<Button secondary size="md" class="flex-1" on:click={() => handlerFilter(true)}>Save</Button>
		</div>
	</div>
</SlideOver>

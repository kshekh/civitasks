<script lang="ts">
	import MagnifyingGlass from '$icons/MagnifyingGlass.svelte';
	import SettingsHorizontalIcon from '$icons/SettingsHorizontalIcon.svelte';
	import { slide } from 'svelte/transition';
	import Button from '$components/reusable/Button.svelte';
	import Modal from '$components/reusable/Modal.svelte';
	import TextInput from '$components/reusable/TextInput.svelte';
	import Checkbox from '$components/reusable/checkbox/Checkbox.svelte';
	import DropdownInput from '$components/reusable/dropdowns/DropdownInput.svelte';
	import SlideOver from '$components/reusable/SlideOver.svelte';
	import { COUNTRIES, LANGUAGES, ROLES, SKILLS, TRACKS } from '$utils/constants';
	import { page } from '$app/stores';
	import { goto, invalidateAll } from '$app/navigation';
	import type { ISearchParams } from '$utils/interfaces/search';

	let searchPhrase = '';
	let searchResults: string[] = [];
	let showFilterModal = false;
	let searchParams: Partial<ISearchParams> = {};
	let searchInputId: string;
	const search = async () => {
		if (searchPhrase) {
			resetSearchQueryParams();
			const result = ROLES.filter((role) =>
				role.toLowerCase().includes(searchPhrase.toLowerCase())
			);
			if (result?.length > 0) {
				searchResults = result;
			} else {
				$page.url.searchParams.set('nameQuery', searchPhrase);
				await goto(`?${$page.url.searchParams.toString()}`, { invalidateAll: true });
			}
		} else {
			$page.url.searchParams.delete('role');
			$page.url.searchParams.delete('nameQuery');
		}
		document.getElementById(searchInputId)?.focus();
	};
	const handlerFilter = async () => {
		resetSearchQueryParams();
		Object.entries(searchParams).forEach(([key, value]) => {
			if (!value) return;
			if (!Array.isArray(value)) $page.url.searchParams.set(key, value!.toString());
			else if (value?.length > 0) $page.url.searchParams.set(key, value!.join(','));
		});
		if ($page.url.searchParams.toString()) {
			searchParams = {};
			showFilterModal = false;
			await goto(`?${$page.url.searchParams.toString()}`, { invalidateAll: true });
		}
	};
	const resetSearchQueryParams = () => {
		Array.from($page.url.searchParams.keys()).forEach((key) => {
			Object.keys(searchParams).includes(key) && $page.url.searchParams.delete(key);
		});
	};
</script>

<div class="mt-md gap-x-md relative flex w-full items-center">
	<TextInput
		bind:id={searchInputId}
		placeholder="Search by name or role"
		bind:value={searchPhrase}
		on:keyup={search}
	>
		<MagnifyingGlass slot="right-icon" />
	</TextInput>
	<Button quinary icon size="md" on:click={() => (showFilterModal = true)}
		><SettingsHorizontalIcon /></Button
	>
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
<Modal bind:modalOpen={showFilterModal} title="Refine Search" class="hidden md:block">
	<div class="gap-y-lg flex flex-col">
		<DropdownInput
			label="Skills"
			multiple
			items={SKILLS}
			bind:selectedValues={searchParams.skills}
		/>
		<DropdownInput
			label="Hackathon tracks"
			multiple
			items={TRACKS}
			bind:selectedValues={searchParams.tracks}
		/>
		<DropdownInput
			label="Languages spoken"
			multiple
			items={Object.values(LANGUAGES).flatMap((language) => language.name)}
			bind:selectedValues={searchParams.languages}
		/>
		<div class="gap-x-lg flex items-center">
			<DropdownInput label="Country" items={COUNTRIES} bind:selectedValue={searchParams.country} />
			<TextInput label="City" bind:value={searchParams.city} />
		</div>
		<Checkbox label="Open to collaborate" bind:checked={searchParams.lookingForCollab} />
		<Checkbox label="University student" bind:checked={searchParams.isUniversityStudent} />
		<div class="gap-x-lg flex items-center">
			<Button tertiary size="md" class="flex-1">Cancel</Button>
			<Button secondary size="md" class="flex-1" on:click={handlerFilter}>Save</Button>
		</div>
	</div>
</Modal>
<!-- Mobile Filter Slideover -->
<SlideOver
	bind:slideOverOpen={showFilterModal}
	title="Refine Search"
	class="block !h-screen md:hidden"
>
	<div class="gap-y-lg flex flex-col">
		<DropdownInput
			label="Skills"
			multiple
			items={SKILLS}
			bind:selectedValues={searchParams.skills}
		/>
		<DropdownInput
			label="Hackathon tracks"
			multiple
			items={TRACKS}
			bind:selectedValues={searchParams.tracks}
		/>
		<DropdownInput
			label="Languages spoken"
			multiple
			items={Object.values(LANGUAGES).flatMap((language) => language.name)}
			bind:selectedValues={searchParams.languages}
		/>
		<div class="gap-x-lg flex items-center">
			<DropdownInput label="Country" items={COUNTRIES} bind:selectedValue={searchParams.country} />
			<TextInput label="City" bind:value={searchParams.city} />
		</div>
		<Checkbox label="Open to collaborate" bind:checked={searchParams.lookingForCollab} />
		<Checkbox label="University student" bind:checked={searchParams.isUniversityStudent} />
		<div class="gap-x-lg flex items-center">
			<Button tertiary size="md" class="flex-1">Cancel</Button>
			<Button secondary size="md" class="flex-1" on:click={handlerFilter}>Save</Button>
		</div>
	</div>
</SlideOver>

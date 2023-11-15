<script lang="ts">
	import DotGrid from '$components/reusable/DotGrid.svelte';
	import ProjectCard from '$components/reusable/ProjectCard.svelte';
	import MagnifyingGlass from '$icons/MagnifyingGlass.svelte';
	import SearchMenuIcon from '$icons/SearchMenuIcon.svelte';
	import type { ListedProject } from '$utils/interfaces/project';
	import type { PageData } from './$types';
	import InfiniteScroll from '$components/InfiniteScroll.svelte';
	import { client } from '$lib/api/Client';
	import ProjectSearch from '$components/ProjectSearch.svelte';
	import ProjectPreview from './project-preview.svelte';
	import Notification from '$components/reusable/Notification.svelte';
	import Button from '$components/reusable/Button.svelte';
	import Chevron from '$icons/Chevron.svelte';
	import { browser } from '$app/environment';

	export let data: PageData;
	const DEFAULT_PAGE_SIZE = 18;
	$: ({ projects, projectSearchParams } = data);
	let projectsLoading = data.projectsLoading ?? true;
	let showProjectPreviewModal = false;
	let previewedProject: ListedProject;

	export const handleProjectPreview = (project: ListedProject) => {
		previewedProject = project;
		showProjectPreviewModal = true;
	};

	const loadMoreProjects = async () => {
		let loadRequestParams = { ...projectSearchParams };
		// Load the next page of ids from our list
		loadRequestParams.projectIds = projects?.projectIds?.slice(0, DEFAULT_PAGE_SIZE);
		projects!.projectIds = projects?.projectIds?.slice(DEFAULT_PAGE_SIZE);

		const loadedProjects = await client.hyperdrive.list(loadRequestParams);
		projects!.pageData = [...projects!.pageData, ...loadedProjects.pageData];
	};

	let scrolled = false;
	const scrolledBy = 500;
	$: if (browser) {
		window.onscroll = () => {
			if (document.body.scrollTop > scrolledBy || document.documentElement.scrollTop > scrolledBy) {
				scrolled = true;
			} else {
				scrolled = false;
			}
		};
	}
</script>

<!-- Project slideover -->
<ProjectPreview bind:showProjectPreviewModal bind:previewedProject />

<main class="p-2xl mt-xl lg:mt-2xl flex w-full justify-center lg:p-0">
	<div class="gap-2xl relative flex w-full flex-col lg:w-[1080px]">
		<Notification
			informational
			title="The Hackathon Winners Have Been Announced!"
			class="w-full"
		/>
		<div>
			<p class="text-base font-medium leading-5 text-gray-dark-12">
				Thanks again to everyone who participated.
				And congratulations to our <a href="https://solana.com/news/solana-hyperdrive-hackathon-winners" class="text-indigo-dark-11">Hyperdrive Hackathon 2023 winners</a>! 🚀🚀🚀
			</p>
		</div>
		<div>
			<div
				class="px-md gap-x-md bg-gray-dark-2 flex !h-9 !min-h-[36px] items-center overflow-hidden rounded"
			>
				<div class="gap-x-sm text-gray-dark-12 flex items-center">
					<MagnifyingGlass />
					<h2 class="font-architekt whitespace-nowrap text-base leading-4">
						Explore All Hyperdrive Projects
					</h2>
				</div>
				<DotGrid />
			</div>
			<ProjectSearch />
		</div>
		<!-- PROFILES -->
		{#if !projectsLoading}
			{#if projects && projects.pageData.length > 0}
				<div class="gap-lg relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
					{#each projects.pageData as project}
						<ProjectCard bind:project on:click={() => handleProjectPreview(project)} />
					{/each}
				</div>
				<InfiniteScroll
					hasMore={projects.projectIds && projects.projectIds?.length > 0}
					on:load-more={async () => {
						await loadMoreProjects();
					}}
				/>
			{:else}
				<div class="text-gray-dark-12 flex flex-col items-center">
					<SearchMenuIcon />
					<h2 class="mt-xl mb-1 text-sm">No results found.</h2>
					<p class="text-center">Try another search query or change your filter settings.</p>
				</div>
			{/if}
		{/if}
	</div>
	{#if scrolled}
		<Button
			secondary
			icon
			class="shadow-mint-dark-5 fixed bottom-8 right-8 !h-10 w-10 shadow-lg sm:!h-12 sm:w-12"
			on:click={() => {
				window.scrollTo({
					top: 0,
					behavior: 'smooth'
				});
			}}
		>
			<Chevron class="rotate-180" />
		</Button>
	{/if}
</main>

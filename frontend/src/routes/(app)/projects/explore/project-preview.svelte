<script lang="ts">
	import ImageRender from '$components/ImageRender.svelte';
	import Button from '$components/reusable/Button.svelte';
	import ExpandableText from '$components/reusable/ExpandableText.svelte';
	import SectionTitle from '$components/reusable/SectionTitle.svelte';
	import SlideOver from '$components/reusable/SlideOver.svelte';
	import Tag from '$components/reusable/Tag.svelte';
	import Tooltip from '$components/reusable/Tooltip.svelte';
	import Chevron from '$icons/Chevron.svelte';
	import CornerIcon from '$icons/CornerIcon.svelte';
	import FolderGit2Icon from '$icons/FolderGit2Icon.svelte';
	import PinIcon from '$icons/PinIcon.svelte';
	import PresentationIcon from '$icons/PresentationIcon.svelte';
	import LinkTwoIcon from '$icons/links/LinkTwoIcon.svelte';
	import XLogo from '$icons/logos/XLogo.svelte';
	import UserGroupIcon from '$icons/users/UserGroupIcon.svelte';
	import BookIcon from '$icons/BookIcon.svelte';
	import type { ListedProject } from '$utils/interfaces/project';
	import Carousel from 'svelte-carousel';
	import LongPaperIcon from '$icons/LongPaperIcon.svelte';
	import ImageIcon from '$icons/files/ImageIcon.svelte';

	export let showProjectPreviewModal = false;
	export let previewedProject: ListedProject;
</script>

<SlideOver bind:slideOverOpen={showProjectPreviewModal} title="// PROJECT DETAILS">
	<div class="h-full overflow-y-scroll">
		<div class="-m-2 p-3">
			<div
				class="border-gray-dark-1 rounded-3xs gap-x-lg bg-gray-dark-1 relative flex w-full flex-row gap-y-3 border p-3"
			>
				<CornerIcon class="text-gray-dark-12 absolute right-0 top-0 -m-0.5" />
				<CornerIcon class="text-gray-dark-12 absolute bottom-0 left-0 -m-0.5 rotate-180 " />
				<div class=" flex flex-col items-start gap-y-1">
					<h2>{previewedProject?.name}</h2>
					<div class="text-gray-dark-11 flex items-center justify-end gap-x-2 mt-1">
						<PinIcon />
						<p>{previewedProject?.country}</p>
					</div>
					<div class="gap-lg mt-md flex flex-wrap">
						{#each previewedProject.tracks as track}
							<Tag primary>{track}</Tag>
						{/each}
					</div>
				</div>
			</div>
		</div>
		<div class="my-lg gap-y-2xl flex w-full flex-col items-start">
			<div>
				<SectionTitle icon={BookIcon} title="Description" />
				<ExpandableText text={previewedProject.description} />
			</div>

			<div>
				<SectionTitle icon={UserGroupIcon} title="Team Details" />
				<ExpandableText text={previewedProject.teamDetails} />
			</div>
			<div class="w-full">
				<SectionTitle icon={LinkTwoIcon} title="LINKS" />
				<div class="gap-xl mt-2 flex items-center justify-center">
					{#if previewedProject?.repoLink}
						<div class="tooltip-container relative max-w-fit">
							<div class="tooltip invisible absolute -right-1/2 -top-10">
								<Tooltip tooltipContent="Repository" />
							</div>
							<Button quinary size="sm" href={previewedProject.repoLink} icon
								><FolderGit2Icon /></Button
							>
						</div>
					{/if}
					{#if previewedProject?.presentationLink}
						<div class="tooltip-container relative max-w-fit">
							<div class="tooltip invisible absolute -right-1/2 -top-10">
								<Tooltip tooltipContent="Presentation" />
							</div>
							<Button quinary size="sm" href={previewedProject.presentationLink} icon>
								<PresentationIcon />
							</Button>
						</div>
					{/if}
					{#if previewedProject?.twitterHandle}
						<div class="tooltip-container relative max-w-fit">
							<div class="tooltip invisible absolute -right-1/2 -top-10">
								<Tooltip tooltipContent="X (Twitter)" />
							</div>
							<Button quinary size="sm" href={previewedProject.twitterHandle} icon>
								<XLogo />
							</Button>
						</div>
					{/if}
				</div>
			</div>
			{#if previewedProject.additionalInfo}
				<div>
					<SectionTitle icon={LongPaperIcon} title="Additional Information" />
					<ExpandableText text={previewedProject.additionalInfo} />
				</div>
			{/if}
				<SectionTitle icon={ImageIcon} title="Logos and Graphics" />
				{#if previewedProject?.images?.length == 1}
				<ImageRender src={previewedProject?.images[0]} alt="project" />
				{:else if previewedProject?.images?.length > 1}
				<Carousel dots={false} class="px-2">
					<div slot="prev" let:showPrevPage class="flex min-h-full items-center px-2">
						<Button quinary icon on:click={showPrevPage}><Chevron class="rotate-90" /></Button>
					</div>
					{#each previewedProject?.images as image}
					<ImageRender src={image} alt="project" />
					{/each}
					<div slot="next" let:showNextPage class="flex min-h-full items-center px-2">
						<Button quinary icon on:click={showNextPage}><Chevron class="-rotate-90" /></Button>
					</div>
				</Carousel>
				{/if}
			</div>
	</div>
</SlideOver>

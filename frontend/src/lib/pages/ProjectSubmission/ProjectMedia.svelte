<script lang="ts">
	import Button from '$components/reusable/Button.svelte';
	import FileUpload from '$components/reusable/FileUpload.svelte';
	import Notification from '$components/reusable/Notification.svelte';
	import SectionTitle from '$components/reusable/SectionTitle.svelte';
	import TextInput from '$components/reusable/TextInput.svelte';
	import DeleteIcon from '$icons/DeleteIcon.svelte';
	import MediaIcon from '$icons/MediaIcon.svelte';
	import QuestionIcon from '$icons/QuestionIcon.svelte';
	import CircleCheckIcon from '$icons/checks/CircleCheckIcon.svelte';
	import ImageIcon from '$icons/files/ImageIcon.svelte';
	import XLogo from '$icons/logos/XLogo.svelte';
	import type { ISubmitProjectParams, ISubmitProjectParamsErrors } from '$utils/interfaces/project';
	import { slide } from 'svelte/transition';
	export let project: Partial<ISubmitProjectParams>;
	export let errors: Partial<ISubmitProjectParamsErrors> = {};
	let isUploading = false;
	export let disabled;
	$: disabled =
		!project.presentationLink || !project.imageIds || project.imageIds.length < 1 || isUploading;
</script>

<section transition:slide class="mt-10 flex flex-col gap-y-6">
	<SectionTitle title="Project Media" icon={MediaIcon} />
	<div>
		<FileUpload
			label="Logo or Graphics"
			maxFiles={5}
			accept={['image/jpg', 'image/jpeg', 'image/png']}
			bind:imageIds={project.imageIds}
			bind:isUploading
			bind:errors={errors.imageIds}
		/>
	</div>
	<div class="space-y-2 -mt-3">
		{#if project.images && project.images.length > 0}
			{#each project.images as image}
				<div class=" rounded p-3 flex items-start justify-between gap-x-2 relative bg-gray-dark-2">
					<div>
						<ImageIcon class="w-5 h-5 text-gray-dark-12" />
					</div>
					<div class="flex-1 flex items-start gap-1.5">
						<div
							class=" flex flex-col gap-y-1.5 font-inter text-sm font-medium leading-4 text-gray-dark-12"
						>
							<span>{image.originalName}</span>
							{#if image.size / (1024 * 1024) >= 1}
								<span>{(image.size / (1024 * 1024)).toFixed()} MB</span>
							{:else if image.size / 1024 >= 1}
								<span>{(image.size / 1024).toFixed()} KB</span>
							{:else}
								<span>{image.size.toFixed()} B</span>
							{/if}
						</div>
						<div class="!w-4 !h-4 text-mint-dark-11">
							<CircleCheckIcon />
						</div>
					</div>
					<Button
						quaternary
						size="xs"
						icon
						on:click={() => {
							project.imageIds = project.imageIds?.filter((id) => id != image.id);
							project.images = project.images?.filter((i) => i.id != image.id);
						}}><DeleteIcon class="text-gray-dark-12" /></Button
					>
				</div>
			{/each}
		{/if}
	</div>
	<TextInput
		label="Link to presentation video or slide deck"
		description="You can add additional links in the final section if necessary."
		bind:value={project.presentationLink}
		bind:errors={errors.presentationLink}
	/>
	<Notification
		icon={QuestionIcon}
		title="Please include this info"
		description="Why you built your project, why your team's background is well suited to developing this product, how you built it, and a demo of the main features. Please keep video presentations to under 3 minutes."
		class="w-full"
	/>
	<TextInput
		optional
		label="Link to Project Twitter account"
		bind:value={project.twitterHandle}
		bind:errors={errors.twitterHandle}
	>
		<XLogo slot="left-icon" class="w-4 h-4" />
	</TextInput>
</section>

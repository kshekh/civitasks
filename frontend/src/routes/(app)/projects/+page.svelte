<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Button from '$components/reusable/Button.svelte';
	import DotGrid from '$components/reusable/DotGrid.svelte';
	import Stepper from '$components/reusable/Stepper.svelte';
	import Hyperdrive from '$components/reusable/project-headers/Hyperdrive/Hyperdrive.svelte';
	import { client } from '$lib/api/Client';
	import AdditionalInfo from '$lib/pages/ProjectSubmission/AdditionalInfo.svelte';
	import ProjectAndTeam from '$lib/pages/ProjectSubmission/ProjectAndTeam.svelte';
	import ProjectMedia from '$lib/pages/ProjectSubmission/ProjectMedia.svelte';
	import { clearLocalStorageForm, persistLocalStorageForm, retrieveLocalStorageForm } from '$utils';
	import { projectFilesLocalStorageKey, projectFormLocalStorageKey } from '$utils/constants';
	import type { ISubmitProjectParams, ISubmitProjectParamsErrors } from '$utils/interfaces/project';
	import { validateData } from '$utils/schemas';
	import { projectSchema } from '$utils/schemas/projects';
	import { toastError } from '$utils/toasts';
	import type { PageData } from './$types';
	export let data: PageData;
	let isEditing = $page.url.searchParams.get('edit') === 'true' ? true : false;
	let steps = ['Project & Team', 'Media', 'Others'];
	let disabledSteps = ['Media', 'Others'];
	let currentStep = 0;
	let project: Partial<ISubmitProjectParams> = isEditing ? data.project ?? {} : {};
	let errors: ISubmitProjectParamsErrors = isEditing ? data.errors ?? {} : {};
	const next = async () => {
		try {
			// Validate form
			// Check for every step if there are errors relevant to the step (Don't proceed to next step if there are any errors in current step)
			// Reset any errors in any other step
			// If there are no validation errors on the submit step, submit the project
			errors = (await validateData(project, projectSchema))?.errors?.fieldErrors;
			if (currentStep == 0) {
				if (
					(errors?.name?.length ?? 0 > 0) ||
					(errors?.description?.length ?? 0 > 0) ||
					(errors?.tracks?.length ?? 0 > 0) ||
					(errors?.country?.length ?? 0 > 0) ||
					(errors?.repoLink?.length ?? 0 > 0) ||
					(errors?.teamDetails?.length ?? 0 > 0)
				)
					return;
				if (project.images && project.images.length > 0) {
					// TODO - there has to be a better way to do this
					project.imageIds = Array.from(
						new Set([
							...(project.imageIds ?? []),
							...(project.images?.flatMap((image) => image.id) ?? [])
						])
					);
				}
				enableStep('Media');
			} else if (currentStep == 1) {
				if (project.images && project.images.length > 0) {
					project.imageIds = Array.from(
						new Set([
							...(project.imageIds ?? []),
							...(project.images?.flatMap((image) => image.id) ?? [])
						])
					);
				}
				if (
					(errors?.imageIds?.length ?? 0 > 0) ||
					(errors?.presentationLink?.length ?? 0 > 0) ||
					(errors?.twitterHandle?.length ?? 0 > 0)
				)
					return;
				enableStep('Others');
			} else {
				if (errors && Object.entries(errors).every((error) => error.length > 0)) {
					return;
				}
				errors = {};

				delete project['images'];
				if (isEditing) await client.hyperdrive.update(JSON.stringify(project));
				else await client.hyperdrive.create(JSON.stringify(project));

				clearLocalStorageForm(projectFormLocalStorageKey);
				// TODO extract this as a constant
				clearLocalStorageForm(projectFilesLocalStorageKey);
				await goto('/projects/success');
			}
			errors = {};
			currentStep++;
		} catch (error) {
			toastError(error);
		}
	};
	const enableStep = (step: 'Project & Team' | 'Media' | 'Others') => {
		disabledSteps = disabledSteps?.filter((disabledStep) => disabledStep != step);
	};
	let disabled: boolean;
	$: persistLocalStorageForm(projectFormLocalStorageKey, project as ISubmitProjectParams);
	$: project = retrieveLocalStorageForm(projectFormLocalStorageKey) ?? {};
</script>

<main class="w-full flex justify-center p-2xl md:p-0 mt-xl md:mt-8 mb-9 relative">
	<div class="absolute top-24 left-28 hidden xl:flex">
		<Stepper {steps} bind:currentStep bind:disabledSteps direction="vertical" />
	</div>
	<div class="w-full md:w-[720px] relative">
		<h1 class="text-[28px] leading-9 text-gray-dark-12 font-architekt mb-6">Submit project</h1>
		<div class="flex xl:hidden mt-4">
			<Stepper {steps} bind:currentStep bind:disabledSteps direction="horizontal" />
		</div>
		<!-- <div class="mt-6 mb-3 w-full !h-12 !min-h-[48px] flex items-center gap-x-md overflow-hidden">
			<h2 class="font-architekt text-gray-dark-12 text-lg text-normal leading-6 whitespace-nowrap">
				// Solana Hyperdrive
			</h2>
			<DotGrid class="text-gray-dark-6" />
		</div> -->
		<!-- Header -->
		<Hyperdrive />
		{#if currentStep === 0}
			<ProjectAndTeam bind:project bind:errors bind:disabled />
		{:else if currentStep === 1}
			<ProjectMedia bind:project bind:errors bind:disabled />
		{:else if currentStep === 2}
			<AdditionalInfo bind:project bind:errors bind:disabled />
		{/if}

		<Button secondary {disabled} size="md" class="w-full sm:w-fit mt-3xl" on:click={next}>
			{#if currentStep == steps?.length - 1}
				Submit Project
			{:else}
				NEXT
			{/if}
		</Button>
	</div>
</main>

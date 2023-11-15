<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import Button from '$components/reusable/Button.svelte';
	import ArrowRight from '$icons/arrows/ArrowRight.svelte';
	import { client } from '$lib/api/Client';
	import AboutYou from '$lib/pages/OnBoarding/AboutYou.svelte';
	import CollaborationDetails from '$lib/pages/OnBoarding/CollaborationDetails.svelte';
	import Survey from '$lib/pages/OnBoarding/Survey.svelte';
	import type {
		IAboutYou,
		IAboutYouErrors,
		IInterestsAndSkillsParams,
		IInterestsAndSkillsParamsErrors,
		IOnboardingParams,
		ISourceAndReferralParams,
		ISourceAndReferralParamsErrors
	} from '$utils/interfaces/onboarding';
	import {
		aboutYouSchema,
		interestsAndSkillsSchema,
		sourceAndReferralsSchema,
		validateData
	} from '$utils/schemas';
	import { toastError } from '$utils/toasts';

	let currentStep = 1;
	let steps = 3;
	let aboutYou: Partial<IAboutYou>;
	let interestsAndSkills: Partial<IInterestsAndSkillsParams>;
	let aboutYouErrors: Partial<IAboutYouErrors> = {};
	let interestsAndSkillsErrors: Partial<IInterestsAndSkillsParamsErrors> = {};
	let sourceAndReferrals: ISourceAndReferralParams = {
		primarySource: {},
		agreedToTerms: false,
		referralCode: ''
	};
	let sourceAndReferralsErrors: Partial<ISourceAndReferralParamsErrors> = {};
	const next = async () => {
		try {
			if (currentStep == 1) {
				const { errors } = await validateData(aboutYou, aboutYouSchema);
				if (errors) aboutYouErrors = errors?.fieldErrors;
				else currentStep++;
			} else if (currentStep == 2) {
				interestsAndSkillsErrors = (
					await validateData(interestsAndSkills, interestsAndSkillsSchema)
				).errors?.fieldErrors;
				if (interestsAndSkillsErrors) return;
				currentStep++;
			} else if (currentStep == 3) {
				sourceAndReferralsErrors = (
					await validateData(sourceAndReferrals, sourceAndReferralsSchema)
				).errors?.fieldErrors;
				if (sourceAndReferralsErrors) return;
				const onboarding: Partial<IOnboardingParams> = Object.assign(
					aboutYou,
					interestsAndSkills,
					sourceAndReferrals
				);
				try {
					await client.users.create(onboarding as BodyInit);
					await invalidateAll();
					goto('/');
				} catch (error) {
					toastError(error);
				}
			}
		} catch (error) {
			toastError(error);
		}
	};
	let disabled: boolean;
</script>

<main class="w-full flex justify-center p-2xl md:p-0 mt-0 sm:mt-9 mb-0 sm:mb-36">
	<div class="w-full sm:w-[520px]">
		<div class="w-full flex items-center justify-between">
			<p class="text-sm text-gray-dark-11 font-architekt leading-5">Step {currentStep} / {steps}</p>
			<div class="flex items-center gap-x-md">
				{#if currentStep > 1}
					<Button tertiary icon on:click={() => currentStep--}>
						<ArrowRight class="text-gray-dark-9 rotate-180" />
					</Button>
				{/if}
				{#if currentStep < steps}
					<Button tertiary icon {disabled} on:click={next}>
						<ArrowRight class="text-gray-dark-9 " />
					</Button>
				{/if}
			</div>
		</div>
		{#if currentStep === 1}
			<AboutYou bind:aboutYou bind:fieldErrors={aboutYouErrors} bind:disabled />
		{:else if currentStep === 2}
			<CollaborationDetails
				bind:interestsAndSkills
				bind:fieldErrors={interestsAndSkillsErrors}
				bind:disabled
			/>
		{:else if currentStep === 3}
			<Survey bind:sourceAndReferrals bind:fieldErrors={sourceAndReferralsErrors} bind:disabled />
		{/if}
		<Button secondary {disabled} class="w-full mt-3xl" on:click={next}>
			{#if currentStep == steps}
				FINISH
			{:else}
				NEXT
			{/if}
		</Button>
	</div>
</main>

<script lang="ts">
	import Chip from '$components/reusable/Chip.svelte';
	import RadioGroup from '$components/reusable/RadioGroup.svelte';
	import SectionTitle from '$components/reusable/SectionTitle.svelte';
	import TextArea from '$components/reusable/TextArea.svelte';
	import TextInput from '$components/reusable/TextInput.svelte';
	import CheckboxGroup from '$components/reusable/checkbox/CheckboxGroup.svelte';
	import ErrorWarningAlertIcon from '$icons/ErrorWarningAlertIcon.svelte';
	import AddDocumentIcon from '$icons/files/AddDocumentIcon.svelte';
	import { HYPERDRIVE_MARKETING_CHANNELS, SOLANA_INITIATIVES } from '$utils/constants';
	import type { ISubmitProjectParams, ISubmitProjectParamsErrors } from '$utils/interfaces/project';
	import { slide } from 'svelte/transition';
	export let project: Partial<ISubmitProjectParams>;
	export let errors: Partial<ISubmitProjectParamsErrors> = {};
	export let disabled = false;
	$: disabled =
		!project.solanaDeveloperExperience ||
		!project.howDidYouHear ||
		project.howDidYouHear.length === 0 ||
		!(typeof project.lookingToRaise === 'boolean') ||
		!(typeof project.attendedWorkshop === 'boolean');
</script>

<section transition:slide class="mt-10 flex flex-col gap-y-6">
	<SectionTitle title="Additional info" icon={AddDocumentIcon} />
	<RadioGroup
		label="Do you intend to continue building full-time and raise funding?"
		description="If so, we can connect you to our partners."
		items={[{ No: false }, { Yes: true }]}
		bind:checked={project.lookingToRaise}
		bind:errors={errors.lookingToRaise}
	/>
	<div>
		<p class="font-architekt text-sm text-gray-dark-12 leading-5 font-normal">
			Rate your developer experience building on SolanA
		</p>
		<div class="flex items-center justify-between gap-x-1.5 w-full pt-3">
			{#each Array(5) as _, i}
				<Chip
					class="flex-1 !justify-center"
					value={i + 1}
					primary={project.solanaDeveloperExperience == i + 1}
					on:click={() => (project.solanaDeveloperExperience = i + 1)}
				/>
			{/each}
		</div>
		{#if errors.solanaDeveloperExperience && errors.solanaDeveloperExperience.length > 0}
			{#each errors.solanaDeveloperExperience as error}
				{#if error}
					<div class="text-red-dark-10 flex justify-start items-center gap-x-1 gap-y-0.5 mt-2">
						<ErrorWarningAlertIcon />
						<p class="text-red-dark-10">{error}</p>
					</div>
				{/if}
			{/each}
		{/if}
	</div>
	<CheckboxGroup
		direction="vertical"
		label="How did you hear about the hackathon?"
		description="This helps us improve our initiatives to bring more builders like you to the ecosystem."
		items={HYPERDRIVE_MARKETING_CHANNELS}
		bind:checked={project.howDidYouHear}
		bind:errors={errors.howDidYouHear}
	/>
	<CheckboxGroup
		optional
		direction="vertical"
		label="Did any of the following organizations or initiatives significantly contribute to your decision to participate in the hackathon?"
		items={SOLANA_INITIATIVES}
		bind:checked={project.otherSources}
		bind:errors={errors.otherSources}
	/>
	<RadioGroup
		label="Did you or any of your teammates attend a solana workshop or bootcamp?"
		items={[{ No: false }, { Yes: true }]}
		bind:checked={project.attendedWorkshop}
		bind:errors={errors.attendedWorkshop}
	/>
	<TextArea
		limitEnforced={false}
		optional
		label="Additional information"
		description="Please provide any additional links or information you’d like us to know about the project."
		bind:value={project.additionalInfo}
		bind:errors={errors.additionalInfo}
	/>
	<TextInput
		optional
		label="Do you have a referral code? If so, enter below"
		bind:value={project.referralCode}
		bind:errors={errors.referralCode}
	/>
</section>

<script lang="ts">
	import Notification from '$components/reusable/Notification.svelte';
	import RadioGroup from '$components/reusable/RadioGroup.svelte';
	import SegmentedControl from '$components/reusable/SegmentedControl.svelte';
	import TextArea from '$components/reusable/TextArea.svelte';
	import CheckboxGroup from '$components/reusable/checkbox/CheckboxGroup.svelte';
	import DropdownInput from '$components/reusable/dropdowns/DropdownInput.svelte';
	import { ENGINEERING_ROLES, ROLES, SKILLS, TRACKS } from '$utils/constants';
	import type {
		IInterestsAndSkillsParams,
		IInterestsAndSkillsParamsErrors
	} from '$utils/interfaces/onboarding';
	let interestedTracks: string[];
	let yourRoles: string[];
	let rolesLookingFor: string[];
	let yourSkills: string[];
	export let fieldErrors: Partial<IInterestsAndSkillsParamsErrors> = {};
	export let interestsAndSkills: Partial<IInterestsAndSkillsParams> = {
		interestedTracks: [],
		lookingForCollab: false,
		hasTeam: false
	};
	export let disabled: boolean;
	const updateTracks = () => {
		interestsAndSkills.interestedTracks = [];
		interestedTracks?.forEach((name) => {
			interestsAndSkills.interestedTracks = interestsAndSkills.interestedTracks?.concat({ name });
		});
	};
	const updateYourRoles = () => {
		interestsAndSkills.yourRoles = [];
		yourRoles?.forEach((name) => {
			interestsAndSkills.yourRoles = interestsAndSkills.yourRoles?.concat({ name });
		});
	};
	const updateYourSkills = () => {
		interestsAndSkills.yourSkills = [];
		yourSkills?.forEach((name) => {
			interestsAndSkills.yourSkills = interestsAndSkills.yourSkills?.concat({ name });
		});
	};
	const updateRolesLookingFor = () => {
		interestsAndSkills.rolesLookingFor = [];
		rolesLookingFor?.forEach((name) => {
			interestsAndSkills.rolesLookingFor = interestsAndSkills.rolesLookingFor?.concat({ name });
		});
	};
	$: disabled = interestedTracks?.length < 1 || !interestsAndSkills.lookingToBuild;
</script>

<div class="my-3xl w-full">
	<h2>// what do you want to build?</h2>
	<p class="mt-2 mb-3xl">This will help potential collaborators discover you.</p>
	<div class=" flex flex-col gap-y-lg">
		<CheckboxGroup
			direction="vertical"
			label="Hackathon tracks you're interested in"
			items={TRACKS}
			bind:checked={interestedTracks}
			on:change={updateTracks}
			bind:errors={fieldErrors.interestedTracks}
		/>
		<DropdownInput
			multiple
			label="YOUR ROLE"
			items={ROLES}
			bind:selectedValues={yourRoles}
			bind:errors={fieldErrors.yourRoles}
			on:change={updateYourRoles}
		/>
		{#if yourRoles?.some(role => ENGINEERING_ROLES.has(role))}
			<DropdownInput
				multiple
				label="YOUR SKILLS"
				items={SKILLS}
				bind:selectedValues={yourSkills}
				bind:errors={fieldErrors.yourSkills}
				on:change={updateYourSkills}
			/>
		{/if}
		<TextArea
			label="Describe what you're interested in building"
			bind:value={interestsAndSkills.lookingToBuild}
			bind:errors={fieldErrors.lookingToBuild}
		/>
		<SegmentedControl
			label="Are you already working with a cofounder or a team?"
			bind:value={interestsAndSkills.hasTeam}
			items={[{ No: false }, { Yes: true }]}
		/>
		{#if !interestsAndSkills.hasTeam}
			<RadioGroup
				label="Are you interested in finding a cofounder?"
				items={[{ No: false }, { Yes: true }]}
				bind:checked={interestsAndSkills.lookingForCollab}
			/>
		{/if}
		{#if interestsAndSkills.hasTeam}
			<Notification
				informational
				title="please make sure each team member creates an account."
				class="w-full"
			/>
		{/if}
		<div class:hidden={!interestsAndSkills.lookingForCollab}>
			<DropdownInput
				multiple
				label="Roles you're looking for"
				items={ROLES}
				bind:selectedValues={rolesLookingFor}
				bind:errors={fieldErrors.rolesLookingFor}
				on:change={updateRolesLookingFor}
			/>
		</div>
	</div>
</div>

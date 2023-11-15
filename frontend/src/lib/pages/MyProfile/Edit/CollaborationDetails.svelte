<script lang="ts">
	import TextArea from '$components/reusable/TextArea.svelte';
	import DropdownInput from '$components/reusable/dropdowns/DropdownInput.svelte';
	import RadioGroup from '$components/reusable/RadioGroup.svelte';
	import type { IUser } from '$utils/interfaces/onboarding';
	import { ENGINEERING_ROLES, ROLES, SKILLS, TRACKS } from '$utils/constants';
	export let user: Partial<IUser>;
</script>

<form class="space-y-2xl p-[3px]">
	<DropdownInput
		multiple
		label="Hackathon tracks you're interested in"
		items={TRACKS}
		bind:selectedValues={user.interestedTracks}
	/>
	<DropdownInput multiple label="YOUR ROLE" items={ROLES} bind:selectedValues={user.yourRoles} />
	{#if user.yourRoles?.some(role => ENGINEERING_ROLES.has(role))}
		<DropdownInput
			multiple
			label="YOUR SKILLS"
			items={SKILLS}
			bind:selectedValues={user.yourSkills}
		/>
	{/if}
	<TextArea label="Describe what you're interested in building" bind:value={user.lookingToBuild} />

	<RadioGroup
		label="Are you interested in finding a cofounder?"
		items={[{ No: false }, { Yes: true }]}
		bind:checked={user.lookingForCollab}
	/>
	<div class:hidden={!user.lookingForCollab}>
		<DropdownInput
			multiple
			label="Roles you're looking for"
			items={ROLES}
			bind:selectedValues={user.rolesLookingFor}
		/>
	</div>
</form>

<script lang="ts">
	import TextArea from '$components/reusable/TextArea.svelte';
	import TextInput from '$components/reusable/TextInput.svelte';
	import Checkbox from '$components/reusable/checkbox/Checkbox.svelte';
	import DropdownInput from '$components/reusable/dropdowns/DropdownInput.svelte';
	import AvatarInput from '$components/reusable/AvatarInput.svelte';
	import type { IUser } from '$utils/interfaces/onboarding';
	import { COUNTRIES, LANGUAGES } from '$utils/constants';
	let avatar: FileList;
	export let user: Partial<IUser>;
</script>

<form class="space-y-2xl p-[3px]">
	<AvatarInput bind:avatar />
	<div class="flex items-start gap-x-lg">
		<TextInput label="First name" bind:value={user.firstName} />
		<TextInput label="Last name" bind:value={user.lastName} />
	</div>
	<div class="flex items-center gap-x-lg">
		<TextInput label="City" bind:value={user.city} />
		<DropdownInput label="Country" items={COUNTRIES} bind:selectedValue={user.country} />
	</div>
	<DropdownInput
		label="Languages spoken"
		items={Object.values(LANGUAGES).flatMap((language) => language.name)}
		multiple
		bind:selectedValues={user.languages}
	/>
	<TextArea
		label="About You"
		description="A short description about yourself and your experience."
		bind:value={user.aboutYou}
	/>
	<TextInput label="Current Position" bind:value={user.currentPosition} />
	<Checkbox label="Currently a university student" bind:checked={user.isUniversityStudent} />
</form>

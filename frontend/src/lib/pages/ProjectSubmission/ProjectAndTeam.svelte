<script lang="ts">
	import Avatar from '$components/reusable/Avatar.svelte';
	import Button from '$components/reusable/Button.svelte';
	import Notification from '$components/reusable/Notification.svelte';
	import SectionTitle from '$components/reusable/SectionTitle.svelte';
	import TextArea from '$components/reusable/TextArea.svelte';
	import TextInput from '$components/reusable/TextInput.svelte';
	import CheckboxGroup from '$components/reusable/checkbox/CheckboxGroup.svelte';
	import DropdownInput from '$components/reusable/dropdowns/DropdownInput.svelte';
	import DeleteIcon from '$icons/DeleteIcon.svelte';
	import InfoSquareIcon from '$icons/InfoSquareIcon.svelte';
	import MagnifyingGlass from '$icons/MagnifyingGlass.svelte';
	import SharedFolderIcon from '$icons/SharedFolderIcon.svelte';
	import GithubLogo from '$icons/logos/GithubLogo.svelte';
	import UserGroupIcon from '$icons/users/UserGroupIcon.svelte';
	import { COUNTRIES, TRACKS } from '$utils/constants';
	import type { ISubmitProjectParams, ISubmitProjectParamsErrors } from '$utils/interfaces/project';
	import { slide } from 'svelte/transition';
	export let project: Partial<ISubmitProjectParams>;
	export let errors: Partial<ISubmitProjectParamsErrors> = {};
	export let disabled;
	$: disabled =
		!project.name ||
		!project.description ||
		!project.tracks ||
		project.tracks.length === 0 ||
		!project.country ||
		!project.repoLink ||
		!project.teamDetails;
</script>

<section transition:slide class="mt-10 flex flex-col gap-y-6">
	<SectionTitle title="About Project" icon={InfoSquareIcon} />
	<TextInput label="Project Name" bind:value={project.name} bind:errors={errors.name} />
	<TextArea
		label="Short Description"
		limitEnforced={false}
		bind:value={project.description}
		bind:errors={errors.description}
	/>
	<CheckboxGroup
		label="Prize track"
		items={TRACKS}
		direction="vertical"
		description="You can choose up to two tracks."
		limitEnforced
		maxOptions={2}
		bind:checked={project.tracks}
		bind:errors={errors.tracks}
	/>
	<DropdownInput
		label="Where are you primarily based?"
		items={COUNTRIES}
		bind:selectedValue={project.country}
		bind:errors={errors.country}
	/>
	<TextInput label="Link to Code repo" bind:value={project.repoLink} bind:errors={errors.repoLink}>
		<GithubLogo slot="left-icon" class="w-4 h-4" />
	</TextInput>
	<Notification
		informational
		icon={SharedFolderIcon}
		title="Please ensure we can access the repo!"
		description="While we encourage projects to open-source their code, you may keep it private and share it with hackathon@solana.org so only the judges can review."
		class="w-full"
	/>
	<SectionTitle title="Your Team" icon={UserGroupIcon} class="mt-5" />
	<div class="w-full space-y-3 hidden">
		<TextInput placeholder="Search using name or email">
			<MagnifyingGlass slot="left-icon" class="w-4 h-4" />
		</TextInput>
		<!-- TODO use actual team members -->
		{#each Array(4) as _, i}
			{@const myProfile = i == 0}
			<div class="flex items-center gap-x-2 justify-between py-3 px-2 bg-gray-dark-2 rounded">
				<div class="flex items-center gap-x-2 font-architekt text-sm leading-5 text-gray-dark-12">
					<Avatar class="w-6 h-6" />
					<h3>Some Longname</h3>
					{#if myProfile}
						<div class="square bg-gray-dark-6" />
						<h3 class="text-gray-dark-11">You</h3>
					{/if}
				</div>
				{#if !myProfile}
					<Button quinary icon size="xs"><DeleteIcon /></Button>
				{/if}
			</div>
		{/each}
	</div>
	<div>
		<TextArea
			label="Please tell us your name(s) and a brief background"
			limitEnforced={false}
			bind:value={project.teamDetails}
			bind:errors={errors.teamDetails}
		/>
	</div>
</section>

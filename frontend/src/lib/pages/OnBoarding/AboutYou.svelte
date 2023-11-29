<script lang="ts">
	import AvatarInput from '$components/reusable/AvatarInput.svelte';
	import TextArea from '$components/reusable/TextArea.svelte';
	import TextInput from '$components/reusable/TextInput.svelte';
	import Checkbox from '$components/reusable/checkbox/Checkbox.svelte';
	import DropdownInput from '$components/reusable/dropdowns/DropdownInput.svelte';
	import CheckboxIcon from '$icons/CheckboxIcon.svelte';
	import DiscordLogo from '$icons/logos/DiscordLogo.svelte';
	import GithubLogo from '$icons/logos/GithubLogo.svelte';
	import TelegramLogo from '$icons/logos/TelegramLogo.svelte';
	import XLogo from '$icons/logos/XLogo.svelte';
	import { COUNTRIES, LANGUAGES } from '$utils/constants';
	import type { IAboutYou, IAboutYouErrors } from '$utils/interfaces/onboarding';
	let avatar: FileList;
	export let fieldErrors: Partial<IAboutYouErrors> = {};
	export let aboutYou: Partial<IAboutYou> = {};
	export let disabled: boolean;
	$: disabled =
		!aboutYou.firstName ||
		!aboutYou.lastName ||
		!aboutYou.city ||
		!aboutYou.country ||
		!aboutYou.languages ||
		!aboutYou.aboutYou ||
		!aboutYou.currentPosition;
</script>

<div class="my-3xl w-full">
	<h2 class="text-xl font-architekt text-gray-dark-12">// About You</h2>
	<p class="mt-2 mb-3xl">This will help potential collaborators get in touch with you.</p>
	<div class=" flex flex-col gap-y-lg">
		<AvatarInput bind:avatar />
		<div class="flex items-start gap-x-lg">
			<TextInput
				label="First name"
				bind:value={aboutYou.firstName}
				bind:errors={fieldErrors.firstName}
			/>
			<TextInput
				label="Last name"
				bind:value={aboutYou.lastName}
				bind:errors={fieldErrors.lastName}
			/>
		</div>
		<div class="flex items-start gap-x-lg">
			<TextInput label="City" bind:value={aboutYou.city} bind:errors={fieldErrors.city} />
			<DropdownInput
				label="Country"
				items={COUNTRIES}
				bind:selectedValue={aboutYou.country}
				bind:errors={fieldErrors.country}
			/>
		</div>
		<DropdownInput
			label="Languages spoken"
			items={Object.values(LANGUAGES).flatMap((language) => language.name)}
			multiple
			icon={CheckboxIcon}
			bind:selectedValues={aboutYou.languages}
			bind:errors={fieldErrors.languages}
		/>
		<TextArea
			label="About You"
			description="A short description about yourself and your experience."
			bind:value={aboutYou.aboutYou}
			bind:errors={fieldErrors.aboutYou}
		/>
		<TextInput
			label="Current Position"
			bind:value={aboutYou.currentPosition}
			bind:errors={fieldErrors.currentPosition}
		/>
		<Checkbox label="Currently a university student" bind:checked={aboutYou.isUniversityStudent} />
		<!-- Socials -->
		<h2 class="mt-lg text-[18px]">Social links</h2>
		<TextInput label="Github" bind:value={aboutYou.githubHandle}>
			<GithubLogo slot="left-icon" class="w-4 h-4" />
		</TextInput>
		<TextInput label="Discord" bind:value={aboutYou.discordHandle}>
			<DiscordLogo slot="left-icon" class="w-4 h-4" />
		</TextInput>
		<TextInput label="Telegram" bind:value={aboutYou.telegramHandle}>
			<TelegramLogo slot="left-icon" class="w-4 h-4" />
		</TextInput>
		<TextInput label="X (TWITTER)" bind:value={aboutYou.twitterHandle}>
			<XLogo slot="left-icon" class="w-4 h-4" />
		</TextInput>
	</div>
</div>

<script lang="ts">
	import TextInput from '$components/reusable/TextInput.svelte';
	import DiscordLogo from '$icons/logos/DiscordLogo.svelte';
	import GithubLogo from '$icons/logos/GithubLogo.svelte';
	import LinkedInLogo from '$icons/logos/LinkedInLogo.svelte';
	import TelegramLogo from '$icons/logos/TelegramLogo.svelte';
	import XLogo from '$icons/logos/XLogo.svelte';
	import type { IUser } from '$utils/interfaces/onboarding';
	export let user: Partial<IUser>;
</script>

<form class="space-y-2xl p-[3px]">
	<TextInput label="Github" bind:value={user.githubHandle}>
		<GithubLogo slot="left-icon" class="w-4 h-4" />
	</TextInput>
	<TextInput label="Discord" bind:value={user.discordHandle}>
		<DiscordLogo slot="left-icon" class="w-4 h-4" />
	</TextInput>
	<TextInput label="Telegram" bind:value={user.telegramHandle}>
		<TelegramLogo slot="left-icon" class="w-4 h-4" />
	</TextInput>
	<TextInput label="X (TWITTER)" bind:value={user.twitterHandle}>
		<XLogo slot="left-icon" class="w-4 h-4" />
	</TextInput>
</form>

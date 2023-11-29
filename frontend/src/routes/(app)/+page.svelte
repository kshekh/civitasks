<script lang="ts">
	import { goto } from '$app/navigation';
	import ProfileSearch from '$components/ProfileSearch.svelte';
	import ShowEmail from '$components/ShowEmail.svelte';
	import AvatarGroup from '$components/reusable/AvatarGroup.svelte';
	import Button from '$components/reusable/Button.svelte';
	import DotGrid from '$components/reusable/DotGrid.svelte';
	import ProfileCard from '$components/reusable/ProfileCard.svelte';
	import SectionTitle from '$components/reusable/SectionTitle.svelte';
	import SlideOver from '$components/reusable/SlideOver.svelte';
	import Tag from '$components/reusable/Tag.svelte';
	import Tooltip from '$components/reusable/Tooltip.svelte';
	import Hyperdrive from '$components/reusable/project-headers/Hyperdrive/Hyperdrive.svelte';
	import CornerSquare from '$components/reusable/wrappers/CornerSquare.svelte';
	import CalendarIcon from '$icons/CalendarIcon.svelte';
	import CornerIcon from '$icons/CornerIcon.svelte';
	import GlobeIcon from '$icons/GlobeIcon.svelte';
	import LuggageIcon from '$icons/LuggageIcon.svelte';
	import OpenNewIcon from '$icons/OpenNewIcon.svelte';
	import MagnifyingGlass from '$icons/MagnifyingGlass.svelte';
	import MessageBubbleIcon from '$icons/MessageBubbleIcon.svelte';
	import PinIcon from '$icons/PinIcon.svelte';
	import SearchMenuIcon from '$icons/SearchMenuIcon.svelte';
	import SignalIcon from '$icons/SignalIcon.svelte';
	import SparkleIcon from '$icons/SparkleIcon.svelte';
	import UserIcon from '$icons/UserIcon.svelte';
	import ArrowTopRight from '$icons/arrows/ArrowTopRight.svelte';
	import DiscordLogo from '$icons/logos/DiscordLogo.svelte';
	import GithubLogo from '$icons/logos/GithubLogo.svelte';
	import TelegramLogo from '$icons/logos/TelegramLogo.svelte';
	import XLogo from '$icons/logos/XLogo.svelte';
	import type { IUser } from '$utils/interfaces/onboarding';
	import { slide } from 'svelte/transition';
	import { hyperdriveDeadline } from '$utils/constants';
	import { client } from '$lib/api/Client';
	import { toastError } from '$utils/toasts';

	export let data;
	let showProfilePreviewModal = false;
	let aboutExpanded = false;
	$: ({ profiles } = data);
	let previewedProfile: IUser;
	export const handleProfilePreview = async (urlSlug: string) => {
		try {
			// TODO use actual urlSlug
			previewedProfile = await client.users.getOne();
			showProfilePreviewModal = true;
		} catch (error) {
			toastError(error);
		}
	};
	let showEmail = false;
</script>

<!-- Profile slideover -->
<SlideOver bind:slideOverOpen={showProfilePreviewModal} title="// View Profile">
	<div class="h-full overflow-y-scroll">
		<div
			class="w-full border border-gray-dark-6 hover:border-gray-dark-9 hover:bg-gray-dark-1 rounded p-3xs"
		>
			<div
				class="w-full border border-gray-dark-2 rounded p-md text-gray-dark-11 text-xs leading-4"
			>
				<!-- Details -->
				<div
					class="w-full border border-gray-dark-1 rounded-3xs p-1 flex flex-row gap-y-3 gap-x-lg relative bg-gray-dark-1"
				>
					<CornerIcon class="-m-0.5 absolute top-0 right-0 text-gray-dark-12" />
					<CornerIcon class="-m-0.5 absolute bottom-0 left-0 rotate-180 text-gray-dark-12 " />
					<div class="flex justify-between">
						<div class="w-12 h-12 rounded-px overflow-hidden">
							<img
								src="https://picsum.photos/4000"
								alt="avatar"
								class="w-full aspect-square object-cover object-center"
							/>
						</div>
					</div>
					<div class=" flex flex-col items-start gap-y-1">
						<h2>{previewedProfile?.firstName} {previewedProfile?.lastName}</h2>

						<div class="flex items-center gap-x-2">
							<PinIcon />
							<span>{previewedProfile.city}</span>
						</div>
					</div>
				</div>
				<div class="my-lg flex flex-col items-start gap-y-md w-full">
					<div class="flex items-center gap-x-2">
						<LuggageIcon />
						<span>{previewedProfile?.currentPosition || ''}</span>
					</div>
					<div class="flex items-center gap-x-2">
						<GlobeIcon />
						<span>{previewedProfile?.languages?.join(', ')}</span>
					</div>
				</div>
				<div class="flex flex-col sm:flex-row gap-md">
					<Button secondary class="flex-1 min-h-[32px]" on:click={() => (showEmail = true)}>
						<MessageBubbleIcon slot="left-icon" />
						<span>message</span>
					</Button>
					<Button
						tertiary
						class="flex-1 min-h-[32px]"
						on:click={() => goto(`/profile/${previewedProfile.urlSlug}`)}
					>
						<ArrowTopRight slot="left-icon" />
						<span>View full profile</span>
					</Button>
				</div>
				<div class="flex items-center gap-x-2 mt-2">
					{#if previewedProfile?.telegramHandle}
						<div class="relative max-w-fit tooltip-container">
							<div class="absolute -top-10 -right-1/2 invisible tooltip">
								<Tooltip tooltipContent="Telegram" />
							</div>
							<Button quinary size="sm" icon><TelegramLogo /></Button>
						</div>
					{/if}
					{#if previewedProfile?.discordHandle}
						<div class="relative max-w-fit tooltip-container">
							<div class="absolute -top-10 -right-1/2 invisible tooltip">
								<Tooltip tooltipContent="Discord" />
							</div>
							<Button quinary size="sm" icon><DiscordLogo /></Button>
						</div>
					{/if}
					{#if previewedProfile?.githubHandle}
						<div class="relative max-w-fit tooltip-container">
							<div class="absolute -top-10 -right-1/2 invisible tooltip">
								<Tooltip tooltipContent="Github" />
							</div>
							<Button quinary size="sm" icon><GithubLogo /></Button>
						</div>
					{/if}
					{#if previewedProfile?.twitterHandle}
						<div class="relative max-w-fit tooltip-container">
							<div class="absolute -top-10 -right-1/2 invisible tooltip">
								<Tooltip tooltipContent="X (TWITTER)" />
							</div>
							<Button quinary size="sm" icon><XLogo /></Button>
						</div>
					{/if}
				</div>
			</div>
		</div>
		{#if previewedProfile?.lookingForCollab}
			<CornerSquare primary class="mt-8 !h-fit">
				<div
					class="!py-md px-lg w-full !h-12 !min-h-[48px] flex items-center gap-x-md overflow-hidden bg-mint-dark-1 border-b-2 border-mint-dark-4"
				>
					<h2
						class="font-architekt text-mint-dark-12 text-lg text-normal leading-6 whitespace-nowrap"
					>
						// OPEN TO BUILD
					</h2>
					<DotGrid class="text-mint-dark-6" />
				</div>
				<div class="py-xl px-2xl bg-mint-dark-1 text-mint-dark-11">
					<p class="text-sm leading-5">
						{previewedProfile?.lookingToBuild}
					</p>
					<div class="mt-lg font-architekt text-mint-dark-11 text-sm leading-5 space-y-5">
						{#if previewedProfile?.yourRoles?.filter((role) => role != null)?.length > 0}
							<div class="flex flex-col md:flex-row md:flex-wrap gap-2">
								<div class="flex items-center gap-x-2">
									<div class="square" />
									<span>I am a</span>
								</div>
								{#each previewedProfile.yourRoles as role}
									<Tag size="xs" primary>{role}</Tag>
								{/each}
							</div>
						{/if}
						{#if previewedProfile?.rolesLookingFor?.filter((role) => role != null)?.length > 0}
							<div class="flex flex-col md:flex-row md:flex-wrap gap-2">
								<div class="flex items-center gap-x-2">
									<div class="square" />
									<span>Looking for</span>
								</div>

								{#each previewedProfile.rolesLookingFor as role}
									<Tag size="xs" primary>{role}</Tag>
								{/each}
							</div>
						{/if}
						{#if previewedProfile?.interestedTracks?.filter((track) => track != null)?.length > 0}
							<div class="flex flex-col md:flex-row md:flex-wrap gap-2">
								<div class="flex items-center gap-x-2">
									<div class="square" />
									<span>To build in</span>
								</div>

								{#each previewedProfile.interestedTracks as track}
									<Tag size="xs" primary>{track}</Tag>
								{/each}
							</div>
						{/if}
					</div>
				</div>
			</CornerSquare>
		{/if}
		{#if previewedProfile?.yourSkills?.filter((skill) => skill != null)?.length > 0}
			<div class="my-8 md:my-12">
				<SectionTitle icon={SparkleIcon} title="SKILLS" />
				<div class="mt-lg flex gap-2 flex-wrap">
					{#each previewedProfile?.yourSkills as skill}
						<Tag tertiary>{skill}</Tag>
					{/each}
				</div>
			</div>
		{/if}
		<div class="my-8 md:my-12">
			<SectionTitle icon={UserIcon} title="ABOUT" />
			<div class="mt-lg flex flex-col items-start gap-2 relative">
				<p
					transition:slide
					class="text-sm leading-5 text-gray-dark-12 overflow-hidden {aboutExpanded
						? 'h-fit'
						: 'h-[120px] md:h-[60px]'}"
				>
					{previewedProfile?.aboutYou ?? ''}
				</p>
			</div>
		</div>
	</div>
</SlideOver>
<!-- Send message -->
{#if previewedProfile}
	<ShowEmail bind:showEmail bind:email={previewedProfile.email} />
{/if}
<main class="w-full flex justify-center p-2xl md:p-0 mt-xl md:mt-2xl">
	<div class="w-full md:w-[720px] flex flex-col gap-2xl relative">
		<!-- PROJECT -->
		<div class="border border-gray-dark-2 rounded flex flex-col gap-3 bg-gray-dark-0 p-3">
			<Hyperdrive />
			<div>
				<div class="mb-2.5 w-full p flex items-center gap-x-md overflow-hidden">
					<h2
						class="font-architekt text-gray-dark-12 text-base text-normal leading-6 whitespace-nowrap"
					>
						// Solana Hyperdrive
					</h2>
					<DotGrid class="text-gray-dark-6" />
				</div>
				<div class="flex items-center gap-x-4 text-gray-dark-11 text-sm leading-4">
					<div class="flex items-center gap-x-1.5">
						<SignalIcon class="text-red-dark-11" />
						<span>Live</span>
					</div>
					<div class="flex items-center gap-x-1.5">
						<CalendarIcon />
						<!-- TODO add correct end date -->
						<span
							>Submission ends Oct 15, 2023
						</span>
					</div>
				</div>
			</div>
			<div class=" flex items-center justify-between">
				<Button
					tertiary
					size="md"
					on:click={() => {
						goto('/projects?edit=true');
					}}>EDIT SUBMISSION</Button
				>
				<div class="flex items-center gap-x-2">
					<div class="hidden sm:flex">
						<AvatarGroup />
					</div>
					<Button quinary size="md" icon href="https://solana.com/hyperdrive">
						<OpenNewIcon />
					</Button>
				</div>
			</div>
			<div class="flex sm:hidden">
				<AvatarGroup />
			</div>
		</div>
		<!-- DEVELOPER EXPERIENCE SURVEY CTA -->
		<div>
			<div
				class="p-2.5 border border-gray-dark-4 flex items-center gap-x-sm overflow-hidden bg-gray-dark-2 rounded"
			>
				<div class="flex items-center flex-wrap [@media(min-width:690px)]:flex-nowrap gap-3 pl-1 text-gray-dark-12 w-full">
					<h1 class="hidden [@media(min-width:430px)]:flex font-architekt text-s text-normal leading-4 whitespace-nowrap">
						// Please take a moment to fill out our
					</h1>
					<h1 class="[@media(min-width:430px)]:hidden font-architekt text-s text-normal leading-4 whitespace-nowrap">
						// Please take a moment
					</h1>
					<h1 class="[@media(min-width:430px)]:hidden font-architekt text-s text-normal leading-4 whitespace-nowrap">
						// To fill out our
					</h1>
					<Button
						primary
						class="w-full"
						on:click={() => {
							window.open('https://solanafoundation.typeform.com/to/qq2yNWWS', '_blank');
						}}>DEVELOPER EXPERIENCE SURVEY</Button
					>
				</div>
			</div>
		</div>
		<!-- SEARCH -->
		<!-- <div>
			<div
				class="!h-9 !min-h-[36px] px-md flex items-center gap-x-md overflow-hidden bg-gray-dark-2 rounded"
			>
				<div class="flex items-center gap-x-sm text-gray-dark-12">
					<MagnifyingGlass />
					<h2 class="font-architekt text-xs text-normal leading-4 whitespace-nowrap">
						Search for Collaborators
					</h2>
				</div>
				<DotGrid />
			</div>
			<ProfileSearch />
		</div> -->
		<!-- PROFILES -->
		<!-- {#if profiles && profiles.length > 0}
			<div class="grid grid-cols-1 md:grid-cols-2 gap-lg">
				{#each profiles as profile}
					<ProfileCard bind:profile on:click={() => handleProfilePreview(profile.urlSlug)} />
				{/each}
			</div>
		{:else}
			<div class="flex flex-col items-center text-gray-dark-12">
				<SearchMenuIcon />
				<h2 class="text-sm mt-xl mb-1">No results found.</h2>
				<p class="text-center">Try another search query or change your filter settings.</p>
			</div>
		{/if} -->
	</div>
</main>

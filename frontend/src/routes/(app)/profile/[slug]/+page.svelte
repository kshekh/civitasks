<script lang="ts">
	import Button from '$components/reusable/Button.svelte';
	import DotGrid from '$components/reusable/DotGrid.svelte';
	import Modal from '$components/reusable/Modal.svelte';
	import SectionTitle from '$components/reusable/SectionTitle.svelte';
	import SlideOver from '$components/reusable/SlideOver.svelte';
	import Tabs from '$components/reusable/Tabs.svelte';
	import Tag from '$components/reusable/Tag.svelte';
	import Tooltip from '$components/reusable/Tooltip.svelte';
	import CornerSquare from '$components/reusable/wrappers/CornerSquare.svelte';
	import CopyIcon from '$icons/CopyIcon.svelte';
	import CornerIcon from '$icons/CornerIcon.svelte';
	import GlobeIcon from '$icons/GlobeIcon.svelte';
	import LuggageIcon from '$icons/LuggageIcon.svelte';
	import PinIcon from '$icons/PinIcon.svelte';
	import SparkleIcon from '$icons/SparkleIcon.svelte';
	import UserIcon from '$icons/UserIcon.svelte';
	import DiscordLogo from '$icons/logos/DiscordLogo.svelte';
	import GithubLogo from '$icons/logos/GithubLogo.svelte';
	import TelegramLogo from '$icons/logos/TelegramLogo.svelte';
	import XLogo from '$icons/logos/XLogo.svelte';
	import LinkDetails from '$lib/pages/MyProfile/Edit/LinkDetails.svelte';
	import PersonalDetails from '$lib/pages/MyProfile/Edit/PersonalDetails.svelte';
	import { slide } from 'svelte/transition';
	import type { PageData } from './$types';
	import { invalidateAll } from '$app/navigation';
	import EditPencilIcon from '$icons/edit/EditPencilIcon.svelte';
	import CollaborationDetails from '$lib/pages/MyProfile/Edit/CollaborationDetails.svelte';
	import { page } from '$app/stores';
	import MessageBubbleIcon from '$icons/MessageBubbleIcon.svelte';
	import ShowEmail from '$components/ShowEmail.svelte';
	import { client } from '$lib/api/Client';
	import { toastError } from '$utils/toasts';
	export let data: PageData;
	let selectedTab = 0;
	let tabs = [
		{
			name: 'Personal'
		},
		{
			name: 'Collaboration'
		},
		{
			name: 'Links'
		}
	];
	let aboutExpanded = false;
	let showEmail = false;
	export let isEditingProfile = false;
	$: user = data.profile;
	const updateUser = async () => {
		try {
			let userToUpdate = {
				firstName: user.firstName,
				lastName: user.lastName,
				country: user.country,
				city: user.city,
				languages: user.languages,
				aboutYou: user.aboutYou,
				currentPosition: user.currentPosition,
				isUniversityStudent: user.isUniversityStudent,
				githubHandle: user.githubHandle,
				discordHandle: user.discordHandle,
				twitterHandle: user.twitterHandle,
				telegramHandle: user.telegramHandle,
				interestedTracks: user.interestedTracks
					?.filter((track) => track != null)
					?.map((track) => {
						if (track != 'null') return { name: track };
					}),
				yourRoles: user.yourRoles
					?.filter((role) => role != null)
					?.map((role) => {
						if (role != 'null') return { name: role };
					}),
				yourSkills: user.yourSkills
					?.filter((skill) => skill != null)
					?.map((skill) => {
						if (skill != 'null') return { name: skill };
					}),
				lookingToBuild: user.lookingToBuild,
				rolesLookingFor: user.rolesLookingFor
					?.filter((role) => role != null)
					?.map((role) => {
						if (role != 'null') return { name: role };
					}),
				hasTeam: user.hasTeam,
				lookingForCollab: user.lookingForCollab
			};
			await client.users.update(userToUpdate as BodyInit);
			isEditingProfile = false;
			await invalidateAll();
		} catch (error) {
			toastError(error);
		}
	};
</script>

{#if user}
	<SlideOver title="Edit profile" bind:slideOverOpen={isEditingProfile}>
		<div class="h-full flex flex-col gap-y-lg justify-between overflow-y-scroll pt-[3px]">
			<div class="w-full overflow-y-scroll">
				<Tabs bind:tabs bind:selectedTab />
			</div>
			<div class="flex-1 relative">
				<div class="sm:absolute inset-0 overflow-y-scroll">
					{#if selectedTab == 0}
						<PersonalDetails bind:user />
					{:else if selectedTab == 1}
						<CollaborationDetails bind:user />
					{:else if selectedTab == 2}
						<LinkDetails bind:user />
					{/if}
				</div>
			</div>
			<div class="flex items-center gap-x-lg">
				<Button tertiary size="md" class="flex-1" on:click={() => (isEditingProfile = false)}
					>Cancel</Button
				>
				<Button secondary size="md" class="flex-1" on:click={updateUser}>Save Changes</Button>
			</div>
		</div>
	</SlideOver>

	<ShowEmail bind:showEmail bind:email={user.email} />
	<main class="w-full flex justify-center p-md md:p-0 mt-0 md:mt-6">
		<div class="w-full md:w-[720px]">
			<div class="w-full border border-transparent md:border-gray-dark-6 rounded-2xs p-0 md:p-3xs">
				<div class="w-full border border-transparent md:border-gray-dark-2 rounded-2xs md:p-md">
					<!-- Details -->
					<div
						class="w-full bg-gray-dark-1 border border-gray-dark-1 rounded-3xs p-2xs flex flex-col md:flex-row gap-y-3 gap-x-lg relative"
					>
						<CornerIcon class="-m-0.5 absolute top-0 right-0 text-gray-dark-12" />
						<CornerIcon class="-m-0.5 absolute bottom-0 left-0 rotate-180 text-gray-dark-12 " />
						<div class="flex justify-between">
							<div class="w-[88px] h-[88px]">
								<img
									src="https://picsum.photos/4000"
									alt="avatar"
									class="w-full aspect-square object-cover object-center"
								/>
							</div>
						</div>
						<div class="flex-1 flex flex-col items-start">
							<h2 class="font-architekt font-normal text-2xl text-gray-dark-12">
								{user?.firstName || ''}
								{user?.lastName || ''}
							</h2>
							<div class="flex items-center gap-x-2 mt-1 mb-2 text-gray-dark-11 text-xs leading-4">
								<LuggageIcon />
								<span>{user?.currentPosition || ''}</span>
							</div>
							<div class="flex items-center gap-x-md mt-1 mb-2 text-gray-dark-11 text-xs leading-4">
								<div class="flex items-center gap-x-2">
									<PinIcon />
									<span>{user?.city || ''}, {user?.country || ''}</span>
								</div>
								<div class="flex items-center gap-x-2">
									<GlobeIcon />
									<span>{user?.languages?.join(', ') || ''}</span>
								</div>
							</div>
						</div>
					</div>
					<!-- Socials -->
					<div class="my-md flex flex-col md:flex-row-reverse items-center justify-between gap-xl">
						{#if $page.params.slug == $page.data.urlSlug}
							<Button
								secondary
								size="md"
								class="w-full md:w-fit"
								on:click={() => (isEditingProfile = !isEditingProfile)}
							>
								<EditPencilIcon slot="left-icon" />
								<span>Edit Profile</span>
							</Button>
						{:else}
							<Button
								secondary
								size="md"
								class="w-full md:w-fit"
								on:click={() => (showEmail = !showEmail)}
							>
								<MessageBubbleIcon slot="left-icon" />
								<span>Message</span>
							</Button>
						{/if}
						<div class="flex items-center gap-x-2">
							{#if user?.telegramHandle}
								<div class="relative max-w-fit tooltip-container">
									<div class="absolute -top-10 -right-1/2 invisible tooltip">
										<Tooltip tooltipContent="Telegram" />
									</div>
									<Button quinary size="sm" icon><TelegramLogo /></Button>
								</div>
							{/if}
							{#if user?.discordHandle}
								<div class="relative max-w-fit tooltip-container">
									<div class="absolute -top-10 -right-1/2 invisible tooltip">
										<Tooltip tooltipContent="Discord" />
									</div>
									<Button quinary size="sm" icon><DiscordLogo /></Button>
								</div>
							{/if}
							{#if user?.githubHandle}
								<div class="relative max-w-fit tooltip-container">
									<div class="absolute -top-10 -right-1/2 invisible tooltip">
										<Tooltip tooltipContent="Github" />
									</div>
									<Button quinary size="sm" icon><GithubLogo /></Button>
								</div>
							{/if}
							{#if user?.twitterHandle}
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
			</div>

			<!-- OPEN TO BUILD -->
			{#if user?.lookingForCollab}
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
							{user?.lookingToBuild}
						</p>
						<div class="mt-lg font-architekt text-mint-dark-11 text-sm leading-5 space-y-5">
							{#if user?.yourRoles?.filter((role) => role != null)?.length > 0}
								<div class="flex flex-col md:flex-row md:flex-wrap gap-2">
									<div class="flex items-center gap-x-2">
										<div class="square" />
										<span>I am a</span>
									</div>
									{#each user.yourRoles as role}
										<Tag size="xs" primary>{role}</Tag>
									{/each}
								</div>
							{/if}
							{#if user?.rolesLookingFor?.filter((role) => role != null)?.length > 0}
								<div class="flex flex-col md:flex-row md:flex-wrap gap-2">
									<div class="flex items-center gap-x-2">
										<div class="square" />
										<span>Looking for</span>
									</div>

									{#each user.rolesLookingFor as role}
										<Tag size="xs" primary>{role}</Tag>
									{/each}
								</div>
							{/if}
							{#if user?.interestedTracks?.filter((track) => track != null)?.length > 0}
								<div class="flex flex-col md:flex-row md:flex-wrap gap-2">
									<div class="flex items-center gap-x-2">
										<div class="square" />
										<span>To build in</span>
									</div>

									{#each user.interestedTracks as track}
										<Tag size="xs" primary>{track}</Tag>
									{/each}
								</div>
							{/if}
						</div>
					</div>
				</CornerSquare>
			{/if}
			{#if user?.yourSkills?.filter((skill) => skill != null)?.length > 0}
				<div class="my-8 md:my-12">
					<SectionTitle icon={SparkleIcon} title="SKILLS" />
					<div class="mt-lg flex gap-2 flex-wrap">
						{#each user?.yourSkills as skill}
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
						{user?.aboutYou ?? ''}
					</p>
					<!-- <div
						class:hidden={aboutExpanded}
						class="w-full h-[60px] text-background absolute bottom-0"
					/> -->
				</div>
				<!-- <Button quinary on:click={() => (aboutExpanded = !aboutExpanded)}>
					<Chevron class=" transform duration-500 {aboutExpanded ? 'rotate-180' : 'rotate-0'}" />
					<span>
						{#if aboutExpanded}
							See less
						{:else}
							See more
						{/if}
					</span>
				</Button> -->
			</div>
		</div>
	</main>
{/if}

<style>
</style>

<script lang="ts">
	import CornerIcon from '$icons/CornerIcon.svelte';
	import GlobeIcon from '$icons/GlobeIcon.svelte';
	import LuggageIcon from '$icons/LuggageIcon.svelte';
	import PinIcon from '$icons/PinIcon.svelte';
	import type { IUser } from '$utils/interfaces/onboarding';
	import OverflowCounter from './OverflowCounter.svelte';
	import Tag from './Tag.svelte';
	let hover = false;
	export let profile: Partial<IUser>;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<button
	on:mouseenter={() => (hover = true)}
	on:mouseleave={() => (hover = false)}
	on:click
	class="w-full border border-gray-dark-6 hover:border-gray-dark-9 hover:bg-gray-dark-1 rounded p-3xs"
>
	<div class="w-full border border-gray-dark-2 rounded p-md text-gray-dark-11 text-xs leading-4">
		<!-- Details -->
		<div
			class="w-full border border-gray-dark-1 rounded-3xs p-1 flex flex-row gap-y-3 gap-x-lg relative {hover
				? 'bg-gray-dark-2'
				: 'bg-gray-dark-1'}"
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
				<h2>{profile?.firstName} {profile?.lastName}</h2>

				<div class="flex items-center gap-x-2">
					<PinIcon />
					<span>{profile?.city}</span>
				</div>
			</div>
		</div>
		<div class="mt-md flex flex-col items-start gap-y-md w-full">
			<!-- TODO update to yourRoles in the from the backend -->
			{#if profile?.roles?.length > 0}
				<OverflowCounter>
					{#each profile?.roles as role}
						<span><Tag tertiary size="xs">{role}</Tag></span>
					{/each}
				</OverflowCounter>
			{/if}
			<div class="flex items-center gap-x-2">
				<LuggageIcon />
				<span>{profile?.currentPosition || ''}</span>
				<!-- TODO handle Company -->
				<!-- <span>{user?.currentPosition || ''} at Solana Labs</span> -->
			</div>
			<div class="flex items-center gap-x-2">
				<GlobeIcon />
				<span>{profile?.languages?.join(', ')}</span>
			</div>
		</div>
	</div>
</button>

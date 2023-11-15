<script lang="ts">
	import DotGrid from '$components/reusable/DotGrid.svelte';
	import Notification from '$components/reusable/Notification.svelte';
	import CornerSquare from '$components/reusable/wrappers/CornerSquare.svelte';
	import type { ISubmitProjectParams } from '$utils/interfaces/project';
	import type { PageData } from './$types';

	export let data: PageData;
	let project: Partial<ISubmitProjectParams> = data.project ?? {};
</script>

<div class="flex w-full h-screen-minus-header justify-center items-center">
	<video
		loop
		muted
		playsInline
		disablepictureinpicture
		autoPlay
		class="absolute w-full h-full object-cover -z-10"
	>
		<source
			src="https://player.vimeo.com/progressive_redirect/playback/855402035/rendition/720p/file.mp4?loc=external&signature=25efff13a9fa9901af9a2a96ebfbca57cd27facd2b3b5e67c2a7b75e506a2f3c"
			type="video/mp4"
		/>
	</video>
	<CornerSquare class="w-full md:w-[720px]">
		<div
		class="py-md px-lg w-full flex items-center gap-x-md overflow-hidden bg-gray-dark-1 border-b-2 border-gray-dark-2"
		>
			{#if Object.keys(project).length !== 0}
				<h2 class="font-architekt text-gray-dark-12 text-lg text-normal leading-6 whitespace-nowrap">
					// WE HAVE RECEIVED YOUR SUBMISSION
				</h2>
			{:else}
				<h2 class="font-architekt text-gray-dark-12 text-lg text-normal leading-6 whitespace-nowrap">
					// PROJECT SUBMISSION HAS ENDED
				</h2>
			{/if}
			<DotGrid />
		</div>
		<div class="w-full py-xl px-2xl space-y-2xl">
			<Notification
				informational
				title="Hyperdrive Hackathon Project submissions are now closed!"
				description="Thank you for participating in the Hyperdrive Hackathon. Submissions and edits are now closed so the judges can review all projects fairly and efficiently."
				class="w-full"
			/>
			<div>
				<p class="text-sm font-medium leading-5 text-gray-dark-12">
					Please stay tuned the week of October 30th for the announcement of the winners!
				</p>
				<p class="text-xs mt-2">
					It's not too late to buy tickets to <a href="https://solana.com/breakpoint" class="text-indigo-dark-11">Solana Breakpoint 2023</a>, where the winners will be announced live in Amsterdam.
				</p>
			</div>
		</div>
	</CornerSquare>
</div>
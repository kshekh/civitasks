<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$components/reusable/Button.svelte';
	import DotGrid from '$components/reusable/DotGrid.svelte';
	import Notification from '$components/reusable/Notification.svelte';
	import CornerSquare from '$components/reusable/wrappers/CornerSquare.svelte';
</script>

<div class="pt-0 sm:pt-20 flex justify-center">
	<CornerSquare class="w-full md:w-[720px] ">
		<div
			class="py-md px-lg w-full flex items-center gap-x-md overflow-hidden bg-gray-dark-1 border-b-2 border-gray-dark-2"
		>
			<h2 class="font-architekt text-gray-dark-12 text-lg text-normal leading-6 whitespace-nowrap">
				// SUCCESS
			</h2>
			<DotGrid />
		</div>
		<div class="w-full py-xl px-2xl space-y-2xl">
			<Notification
				positive
				title="Your project has been submitted."
				description="Thank you for participating in the Hyperdrive Hackathon!
After all the submissions are collected, projects will be reviewed by the judges. Winners will be announced live at Breakpoint, and online the week of October 30th."
				class="w-full"
			/>
			<div>
				<p class="text-sm font-medium leading-5 text-gray-dark-12">
					In case you need to make any updates
				</p>
				<p class="text-xs mt-2">
					You will be able to do so until the end of the submission period on October 15, 2023.
				</p>
			</div>
			<Button secondary size="md" on:click={() => goto('/')}>Go to dashboard</Button>
		</div>
	</CornerSquare>
</div>

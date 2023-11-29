<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$components/reusable/Button.svelte';
	import DotGrid from '$components/reusable/DotGrid.svelte';
	import Notification from '$components/reusable/Notification.svelte';
	import CornerSquare from '$components/reusable/wrappers/CornerSquare.svelte';
</script>

<div class="pt-0 sm:pt-20 flex justify-center">
	<CornerSquare class="w-full sm:w-[420px] ">
		<div
			class="py-md px-lg w-full flex items-center gap-x-md overflow-hidden bg-gray-dark-1 border-b-2 border-gray-dark-2"
		>
			<h2 class="font-architekt text-gray-dark-12 text-lg text-normal leading-6 whitespace-nowrap">
				// SUCCESS
			</h2>
			<DotGrid />
		</div>
		<div class="w-full py-xl px-2xl">
			<Notification
				positive
				title="Your password has been reset."
				description="Please be sure to save your new password somewhere secure."
				class="w-full"
			>
				<Button secondary size="sm" class="w-full" on:click={() => goto('/signin')}
					>GO TO LOGIN</Button
				>
			</Notification>
		</div>
	</CornerSquare>
</div>

<script lang="ts">
	import { page } from '$app/stores';
	import DotGrid from '$components/reusable/DotGrid.svelte';
	import Notification from '$components/reusable/Notification.svelte';
	import CornerSquare from '$components/reusable/wrappers/CornerSquare.svelte';
	import { emailAddress } from '$stores';
	import { consumeVerificationCode } from '$utils/auth/supertokens';
	import { onMount } from 'svelte';
	onMount(async () => {
		if ($page.url.searchParams.has('token')) {
			await consumeVerificationCode();
		}
	});
</script>

<div class="pt-0 sm:pt-20 flex justify-center">
	<CornerSquare class="w-full sm:w-[420px] ">
		<div
			class="py-md px-lg w-full flex items-center gap-x-md overflow-hidden bg-gray-dark-1 border-b-2 border-gray-dark-2"
		>
			<h2 class="font-architekt text-gray-dark-12 text-lg text-normal leading-6 whitespace-nowrap">
				// activate your account
			</h2>
			<DotGrid />
		</div>
		<div class="w-full py-xl px-2xl">
			{#if $page.url.searchParams.has('token')}
				<Notification
					informational
					title="Verifying email"
					description={`Please hold on as we verify your email address.`}
					class="w-full"
				/>
			{:else}
				<Notification
					positive
					title="we sent a confirmation email"
					description={`We sent a confirmation email to your email at ${$emailAddress}. Click on the confirmation link to activate your account.`}
					class="w-full"
				/>
			{/if}
		</div>
	</CornerSquare>
</div>

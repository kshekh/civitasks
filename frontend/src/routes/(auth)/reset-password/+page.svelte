<script lang="ts">
	import Button from '$components/reusable/Button.svelte';
	import Divider from '$components/reusable/Divider.svelte';
	import DotGrid from '$components/reusable/DotGrid.svelte';
	import TextInput from '$components/reusable/TextInput.svelte';
	import CornerSquare from '$components/reusable/wrappers/CornerSquare.svelte';
	import { emailAddress } from '$stores';
	import { sendResetPasswordLink } from '$utils/auth/supertokens';
	let email: string;
	$: disabled = !email;
	let emailErrors: string[] = [];
	const sendLink = async () => {
		$emailAddress = email;
		emailErrors = (await sendResetPasswordLink(email)) as string[];
	};
</script>

<div class="pt-0 sm:pt-20 flex justify-center">
	<CornerSquare class="w-full sm:w-[420px] ">
		<div
			class="py-md px-lg w-full flex items-center gap-x-md overflow-hidden bg-gray-dark-1 border-b-2 border-gray-dark-2"
		>
			<h2 class="font-architekt text-gray-dark-12 text-lg text-normal leading-6 whitespace-nowrap">
				// RESET PASSWORD
			</h2>
			<DotGrid />
		</div>
		<div class="w-full py-xl px-2xl">
			<div class="flex flex-col gap-y-lg">
				<p class="text-sm leading-4 text-gray-dark-12 font-normal">
					Enter your email and we’ll send you a link to reset your password.
				</p>
				<TextInput label="Email Address" bind:value={email} bind:errors={emailErrors} />
				<Button secondary {disabled} class="w-full" on:click={sendLink}>Send link to Email</Button>
			</div>
		</div>
	</CornerSquare>
</div>

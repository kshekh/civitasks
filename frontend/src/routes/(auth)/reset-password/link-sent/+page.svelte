<script lang="ts">
	import Button from '$components/reusable/Button.svelte';
	import Divider from '$components/reusable/Divider.svelte';
	import DotGrid from '$components/reusable/DotGrid.svelte';
	import Notification from '$components/reusable/Notification.svelte';
	import TextInput from '$components/reusable/TextInput.svelte';
	import CornerSquare from '$components/reusable/wrappers/CornerSquare.svelte';
	import ShowEyeIcon from '$icons/ShowEyeIcon.svelte';
	import GithubLogo from '$icons/logos/GithubLogo.svelte';
	import GoogleLogo from '$icons/logos/GoogleLogo.svelte';
	import { emailAddress } from '$stores';
	let email: string;
	let password: string;
	export let passwordInput: HTMLInputElement;
	$: disabled = !email || !password;
	let showPassword = false;
	const toggleShowPassword = () => {
		showPassword = !showPassword;
		showPassword && passwordInput
			? (passwordInput.type = 'text')
			: (passwordInput.type = 'password');
	};
</script>

<div class="pt-0 sm:pt-20 flex justify-center">
	<CornerSquare class="w-full sm:w-[420px] ">
		<div
			class="py-md px-lg w-full flex items-center gap-x-md overflow-hidden bg-gray-dark-1 border-b-2 border-gray-dark-2"
		>
			<h2 class="font-architekt text-gray-dark-12 text-lg text-normal leading-6 whitespace-nowrap">
				// CHECK YOUR EMAIL
			</h2>
			<DotGrid />
		</div>
		<div class="w-full py-xl px-2xl">
			<Notification
				positive
				title="PASSWORD RESENT link set"
				description={`Check your email ${$emailAddress} and open the password reset link we sent to continue.`}
				class="w-full"
			/>
		</div>
	</CornerSquare>
</div>

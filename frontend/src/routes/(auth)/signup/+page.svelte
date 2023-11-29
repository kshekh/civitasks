<script lang="ts">
	import Button from '$components/reusable/Button.svelte';
	import Divider from '$components/reusable/Divider.svelte';
	import DotGrid from '$components/reusable/DotGrid.svelte';
	import TextInput from '$components/reusable/TextInput.svelte';
	import CornerSquare from '$components/reusable/wrappers/CornerSquare.svelte';
	import HideEyeIcon from '$icons/HideEyeIcon.svelte';
	import ShowEyeIcon from '$icons/ShowEyeIcon.svelte';
	import GithubLogo from '$icons/logos/GithubLogo.svelte';
	import GoogleLogo from '$icons/logos/GoogleLogo.svelte';
	import { googleLogin, signupWithEmailAndPassword } from '$utils/auth/supertokens';
	let email: string;
	let password: string;
	let passwordInput: HTMLInputElement;
	let showPassword = false;
	const toggleShowPassword = () => {
		showPassword = !showPassword;
		showPassword && passwordInput
			? (passwordInput.type = 'text')
			: (passwordInput.type = 'password');
	};
	$: disabled = !email || !password;
	type SignupErrors = { emailErrors?: string[]; passwordErrors?: string[] };
	let fieldErrors: SignupErrors = {
		emailErrors: [],
		passwordErrors: []
	};
	const signUp = async () => {
		fieldErrors = (await signupWithEmailAndPassword(email, password)) as SignupErrors;
	};
</script>

<div class="pt-0 sm:pt-20 flex justify-center">
	<CornerSquare class="w-full sm:w-[420px] ">
		<div
			class="py-md px-lg w-full flex items-left flex-col gap-x-md overflow-hidden bg-gray-dark-1 border-b-2 border-gray-dark-2"
		>
			<div class="flex flex-row items-center gap-x-md">
				<h2 class="font-architekt text-gray-dark-12 text-lg text-normal leading-6">
					// PLEASE CREATE AN ACCOUNT
				</h2>
				<DotGrid />
			</div>
			<div class="flex flex-row items-center gap-x-md">
				<h2 class="font-architekt text-gray-dark-12 text-lg text-normal leading-6">
					// TO SUBMIT YOUR PROJECT
				</h2>
				<DotGrid />
			</div>
		</div>
		<form class="w-full py-xl px-2xl">
			<div class="flex flex-col gap-y-lg">
				<TextInput label="Email Address" bind:value={email} bind:errors={fieldErrors.emailErrors} />
				<TextInput
					label="Password"
					type="password"
					bind:value={password}
					bind:passwordInput
					bind:errors={fieldErrors.passwordErrors}
				>
					<button slot="right-icon" tabindex="-1" on:click={toggleShowPassword}>
						{#if showPassword}
							<HideEyeIcon />
						{:else}
							<ShowEyeIcon />
						{/if}
					</button>
				</TextInput>
				<div>
					<Button secondary {disabled} class="w-full" on:click={signUp}>Continue with email</Button>
					<p class="mt-md font-semibold text-xs leading-5 text-gray-dark-11 text-center">
						Already have an account? <span class="text-gray-dark-12 underline"
							><a href="/signin">Login</a></span
						>
					</p>
				</div>
			</div>
			<!-- <Divider class="my-3xl" />
			<div class="w-full">
				<Button tertiary class="w-full" on:click={googleLogin}>
					<GoogleLogo slot="left-icon" class="w-6 h-6" />
					<span>Continue with Google</span>
				</Button>
				<Button tertiary class="w-full mt-md mb-3xl">
					<GithubLogo slot="left-icon" class="w-6 h-6" />
					<span>Continue with GitHub</span>
				</Button>
			</div> -->
			<p class="text-xs mt-3xl leading-4 font-normal text-gray-dark-11 text-center">
				By creating your account, you agree to the <span class="text-gray-dark-12 underline"
					><a href="https://solana.com/tos">Terms of Service</a></span
				>
				and
				<span class="text-gray-dark-12 underline"
					><a href="https://solana.com/privacy-policy">Privacy Policy</a></span
				>.
			</p>
		</form>
	</CornerSquare>
</div>

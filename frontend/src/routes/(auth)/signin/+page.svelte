<script lang="ts">
	import Button from '$components/reusable/Button.svelte';
	import Divider from '$components/reusable/Divider.svelte';
	import Modal from '$components/reusable/Modal.svelte';
	import Notification from '$components/reusable/Notification.svelte';
	import SlideOver from '$components/reusable/SlideOver.svelte';
	import TextInput from '$components/reusable/TextInput.svelte';
	import HideEyeIcon from '$icons/HideEyeIcon.svelte';
	import ShowEyeIcon from '$icons/ShowEyeIcon.svelte';
	import GithubLogo from '$icons/logos/GithubLogo.svelte';
	import GoogleLogo from '$icons/logos/GoogleLogo.svelte';
	import { googleLogin, signinWithEmailAndPassword } from '$utils/auth/supertokens';
	let email: string;
	let password: string;
	let step: 'email' | 'password' = 'email';
	let passwordInput: HTMLInputElement;
	let showPassword = false;

	let noAccount = false;
	const toggleShowPassword = () => {
		showPassword = !showPassword;
		showPassword && passwordInput
			? (passwordInput.type = 'text')
			: (passwordInput.type = 'password');
	};
	$: emailDisabled = !email;
	$: passwordDisabled = !password;
	type SigninErrors = { emailErrors?: string[]; passwordErrors?: string[] };
	let fieldErrors: SigninErrors = {
		emailErrors: [],
		passwordErrors: []
	};
	const signIn = async () => {
		fieldErrors = (await signinWithEmailAndPassword(email, password)) as SigninErrors;
		if (fieldErrors?.emailErrors?.length > 0) {
			step = 'email';
			console.log(fieldErrors);
		}
	};
</script>

<div class="hidden sm:block fixed inset-0">
	<Modal clickoutCloseDisabled title="// LOGIN">
		<form class="w-full">
			{#if step == 'email'}
				<div class="flex flex-col gap-y-lg">
					<TextInput
						label="Email Address"
						bind:value={email}
						bind:errors={fieldErrors.emailErrors}
					/>

					<div>
						<Button
							secondary
							bind:disabled={emailDisabled}
							class="w-full"
							on:click={() => (step = 'password')}>Continue with email</Button
						>
						<p class="mt-md font-semibold text-xs leading-5 text-gray-dark-11 text-center">
							Don’t have an account yet? <span class="text-gray-dark-12 underline"
								><a href="/signup">Create an account</a></span
							>
						</p>
					</div>
				</div>
			{:else if step == 'password'}
				<div class="flex flex-col gap-y-lg">
					<TextInput
						label="Password"
						type="password"
						bind:value={password}
						bind:passwordInput
						bind:errors={fieldErrors.passwordErrors}
					>
						<button slot="right-icon" on:click={toggleShowPassword}>
							{#if showPassword}
								<HideEyeIcon />
							{:else}
								<ShowEyeIcon />
							{/if}
						</button>
					</TextInput>

					<div>
						<Button secondary bind:disabled={passwordDisabled} class="w-full" on:click={signIn}
							>Login</Button
						>
						<p class="mt-md font-semibold text-xs leading-5 text-gray-dark-11 text-center">
							Forgot your password? <span class="text-gray-dark-12 underline"
								><a href="/reset-password">Reset password</a></span
							>
						</p>
					</div>
				</div>
			{/if}
			<!-- <Divider class="my-3xl" />
			{#if step == 'email'}
				<div class="w-full">
					<Button tertiary class="w-full" on:click={googleLogin}>
						<GoogleLogo slot="left-icon" class="w-6 h-6" />
						<span>Continue with Google</span>
					</Button>
					<Button tertiary class="w-full mt-md mb-3xl">
						<GithubLogo slot="left-icon" class="w-6 h-6" />
						<span>Continue with GitHub</span>
					</Button>
				</div>
			{:else if (step = 'password')}
				<Notification
					noIcon
					title="Request one-time login link"
					description={`We’ll send a login link to ${email}`}
					class="w-full"
				>
					<Button secondary class="w-full">Send login link</Button>
				</Notification>
			{/if} -->
		</form>
	</Modal>
	{#if noAccount}
		<div class="z-10 absolute inset-0 flex items-end justify-center pb-6">
			<Notification
				negative
				title="Account not found."
				description="We couldn't find an account associated with this Google account."
			/>
		</div>
	{/if}
</div>

<div class="block sm:hidden fixed inset-0">
	<SlideOver clickoutCloseDisabled title="// LOGIN">
		{#if noAccount}
			<Notification
				negative
				title="Account not found."
				description="We couldn't find an account associated with this Google account."
				class=""
			/>
		{/if}
		<form class="w-full">
			{#if step == 'email'}
				<div class="flex flex-col gap-y-lg">
					<TextInput label="Email Address" bind:value={email} />

					<div>
						<Button
							secondary
							bind:disabled={emailDisabled}
							class="w-full"
							on:click={() => (step = 'password')}>Continue with email</Button
						>
						<p class="mt-md font-semibold text-xs leading-5 text-gray-dark-11 text-center">
							Don’t have an account yet? <span class="text-gray-dark-12 underline"
								><a href="/signup">Create an account</a></span
							>
						</p>
					</div>
				</div>
			{:else if step == 'password'}
				<div class="flex flex-col gap-y-lg">
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
						<Button secondary bind:disabled={passwordDisabled} class="w-full" on:click={signIn}
							>Login</Button
						>
						<p class="mt-md font-semibold text-xs leading-5 text-gray-dark-11 text-center">
							Forgot your password? <span class="text-gray-dark-12 underline"
								><a href="/reset-password">Reset password</a></span
							>
						</p>
					</div>
				</div>
			{/if}
			<!-- <Divider class="my-3xl" />
			{#if step == 'email'}
				<div class="w-full">
					<Button tertiary class="w-full" on:click={googleLogin}>
						<GoogleLogo slot="left-icon" class="w-6 h-6" />
						<span>Continue with Google</span>
					</Button>
					<Button tertiary class="w-full mt-md mb-3xl">
						<GithubLogo slot="left-icon" class="w-6 h-6" />
						<span>Continue with GitHub</span>
					</Button>
				</div>
			{:else if (step = 'password')}
				<Notification
					noIcon
					title="Request one-time login link"
					description={`We’ll send a login link to ${email}`}
					class="w-full"
				>
					<Button secondary class="w-full">Send login link</Button>
				</Notification>
			{/if} -->
		</form>
	</SlideOver>
</div>

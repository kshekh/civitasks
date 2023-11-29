<script lang="ts">
	import Button from '$components/reusable/Button.svelte';
	import DotGrid from '$components/reusable/DotGrid.svelte';
	import TextInput from '$components/reusable/TextInput.svelte';
	import CornerSquare from '$components/reusable/wrappers/CornerSquare.svelte';
	import HideEyeIcon from '$icons/HideEyeIcon.svelte';
	import ShowEyeIcon from '$icons/ShowEyeIcon.svelte';
	import { newPasswordEntered } from '$utils/auth/supertokens';
	let password: string;
	let confirmPassword: string;
	let passwordErrors: string[] = [];
	let confirmPasswordErrors: string[] = [];
	let fieldErrors = {
		confirmPasswordErrors
	};
	let passwordInput: HTMLInputElement;
	let confirmPasswordInput: HTMLInputElement;
	let showPassword = false;
	const toggleShowPassword = () => {
		showPassword = !showPassword;
		showPassword && passwordInput
			? (passwordInput.type = 'text')
			: (passwordInput.type = 'password');
		showPassword && confirmPasswordInput
			? (confirmPasswordInput.type = 'text')
			: (confirmPasswordInput.type = 'password');
	};
	$: disabled = !confirmPassword || !password;
	$: {
		if (confirmPassword && password && confirmPassword !== password) {
			fieldErrors.confirmPasswordErrors = fieldErrors.confirmPasswordErrors.filter(
				(error) => error !== 'The passwords do not match.'
			);
			fieldErrors.confirmPasswordErrors = fieldErrors.confirmPasswordErrors.concat(
				'The passwords do not match.'
			);
		} else {
			fieldErrors.confirmPasswordErrors = fieldErrors.confirmPasswordErrors.filter(
				(error) => error !== 'The passwords do not match.'
			);
		}
	}
	const changePassword = async () => {
		passwordErrors = (await newPasswordEntered(password)) as string[];
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
				<TextInput
					label="Password"
					type="password"
					bind:value={password}
					bind:passwordInput
					bind:errors={passwordErrors}
				>
					<button slot="right-icon" tabindex="-1" on:click={toggleShowPassword}>
						{#if showPassword}
							<HideEyeIcon />
						{:else}
							<ShowEyeIcon />
						{/if}
					</button>
				</TextInput>
				<TextInput
					label="Confirm Password"
					type="password"
					bind:value={confirmPassword}
					bind:passwordInput={confirmPasswordInput}
					bind:errors={fieldErrors.confirmPasswordErrors}
				>
					<button slot="right-icon" tabindex="-1" on:click={toggleShowPassword}>
						{#if showPassword}
							<HideEyeIcon />
						{:else}
							<ShowEyeIcon />
						{/if}
					</button>
				</TextInput>
				<Button secondary {disabled} class="w-full" on:click={changePassword}>Reset password</Button
				>
			</div>
		</div>
	</CornerSquare>
</div>

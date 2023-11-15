<script lang="ts">
	import ErrorWarningAlertIcon from '$icons/ErrorWarningAlertIcon.svelte';

	export let label = '';
	export let description = '';
	export let name = '';
	export let placeholder = '';
	export let disabled = false;
	export let value: string | number = '';
	export let errors: string[] = [];
	export let id: string;
	export let type: 'email' | 'number' | 'text' | 'password' = 'text';
	export let optional = false;
	let leftIcon: HTMLDivElement;
	let rightIcon: HTMLDivElement;
	export let passwordInput: HTMLInputElement | null = null;
</script>

<!-- TODO add emphasized -->
<div
	class="w-full max-w-full flex flex-col items-start font-inter text-xs leading-4 font-normal {$$props.class}"
>
	<label for={id} class="">
		<p class="font-architekt text-sm text-gray-dark-12 leading-5 font-normal mb-1">
			{label}
			{#if optional}
				<span class="text-gray-dark-10 text-[12px]">(Optional)</span>
			{/if}
		</p>
		<p class="text-xs text-gray-dark-11 mt-1 mb-2">
			{description}
		</p>
	</label>
	<div class="w-full h-10 text-gray-dark-8 relative">
		<div bind:this={leftIcon} class="w-4 h-4 absolute top-3 left-4">
			<slot name="left-icon" />
		</div>
		<div bind:this={rightIcon} class="w-4 h-4 absolute top-3 right-4">
			<slot name="right-icon" />
		</div>
		{#if type == 'text'}
			<input
				{disabled}
				type="text"
				{name}
				{placeholder}
				{id}
				bind:value
				on:focus
				on:blur
				on:keyup
				on:keydown
				on:change
				class:errors={errors?.length > 0}
				class="{leftIcon?.hasChildNodes() ? 'pl-[38px]' : 'pl-4'} {rightIcon?.hasChildNodes()
					? 'pr-[38px]'
					: 'pr-4'}"
			/>
		{:else if type == 'password'}
			<input
				bind:this={passwordInput}
				{disabled}
				type="password"
				{name}
				{placeholder}
				{id}
				bind:value
				on:focus
				on:blur
				on:keyup
				on:keydown
				on:change
				class:errors={errors?.length > 0}
				class="{leftIcon?.hasChildNodes() ? 'pl-[38px]' : 'pl-4'} {rightIcon?.hasChildNodes()
					? 'pr-[38px]'
					: 'pr-4'}"
			/>
		{/if}
	</div>
	{#if errors?.length > 0}
		{#each errors as error}
			{#if error}
				<div class="text-red-dark-10 flex justify-start items-center gap-x-1 gap-y-0.5 mt-2">
					<ErrorWarningAlertIcon />
					<p class="text-red-dark-10">{error}</p>
				</div>
			{/if}
		{/each}
	{/if}
</div>

<style>
	.errors {
		@apply border-red-dark-10;
	}
	input {
		@apply bg-transparent w-full h-full outline-none text-gray-dark-12  caret-mint-dark-11 border border-gray-dark-4 rounded ring-[3px] ring-transparent;
	}
	input:disabled {
		@apply bg-gray-dark-3 cursor-not-allowed;
	}
	input::placeholder {
		@apply text-gray-dark-8;
	}
	input:focus {
		@apply border-mint-dark-8 ring-mint-dark-4;
	}
	input:hover {
		@apply border-gray-dark-5;
	}
</style>

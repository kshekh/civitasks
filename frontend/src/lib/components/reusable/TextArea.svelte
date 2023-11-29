<script lang="ts">
	import ErrorWarningAlertIcon from '$icons/ErrorWarningAlertIcon.svelte';

	export let label = '';
	export let description = '';
	export let name = '';
	export let placeholder = '';
	export let disabled = false;
	export let value: string | number = '';
	export let maxlength = 300;
	export let errors: string[] = [];
	export let limitEnforced = true;
	let id = crypto.randomUUID();
	export let optional = false;
	$: {
		if (limitEnforced) {
			if (value?.toString()?.length > maxlength) {
				if (!errors?.includes('Max character limit exceeded')) {
					errors = errors.concat('Max character limit exceeded');
				}
			} else {
				errors = errors?.filter((error) => error != 'Max character limit exceeded');
			}
		}
	}
</script>

<!-- TODO add emphasized -->
<div class="w-full flex flex-col items-start font-inter text-xs leading-4 font-normal">
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
	<div class="w-full h-32 text-gray-dark-8 relative">
		{#if limitEnforced}
			<textarea
				{disabled}
				{name}
				{placeholder}
				{id}
				{maxlength}
				bind:value
				class={errors?.length > 0 ? 'errors' : ''}
			/>
			<p class="absolute right-1 bottom-1 text-xs font-medium text-gray-dark-8">
				{value.toString().length}/{maxlength}
			</p>
		{:else}
			<textarea
				{disabled}
				{name}
				{placeholder}
				{id}
				bind:value
				class={errors?.length > 0 ? 'errors' : ''}
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
	textarea {
		@apply bg-transparent w-full h-full resize-none outline-none px-4 py-3 text-gray-dark-12  caret-mint-dark-11 border border-gray-dark-4 rounded ring-[3px] ring-transparent;
	}
	textarea:disabled {
		@apply bg-gray-dark-3 cursor-not-allowed;
	}
	textarea::placeholder {
		@apply text-gray-dark-8;
	}
	textarea:focus {
		@apply border-mint-dark-8 ring-mint-dark-4;
	}
	textarea:hover {
		@apply border-gray-dark-5;
	}
</style>

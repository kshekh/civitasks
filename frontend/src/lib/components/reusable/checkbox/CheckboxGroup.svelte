<script lang="ts">
	import CheckboxTickIcon from '$icons/CheckboxTickIcon.svelte';
	import ErrorWarningAlertIcon from '$icons/ErrorWarningAlertIcon.svelte';
	export let name = '';
	export let label = '';
	export let description = '';
	export let errors: string[] = [];
	export let direction: 'horizontal' | 'vertical' = 'horizontal';
	export let items: string[];
	export let checked: any[] = [];
	export let value: string | number | boolean = '';
	export let multiple = true;
	export let optional = false;
	export let limitEnforced: boolean = false;
	export let maxOptions = 2;

	$: {
		if (limitEnforced) {
			if (checked.length > maxOptions) {
				if (!errors?.includes(`You can only select ${maxOptions}`)) {
					errors = [...errors, `You can only select ${maxOptions}`];
				}
			} else {
				errors = errors?.filter((error) => error != `You can only select ${maxOptions}`);
			}
		}
	}
</script>

<div>
	<div>
		<p class="font-architekt text-sm text-gray-dark-12 leading-5 font-normal mb-1">
			{label}
			{#if optional}
				<span class="text-gray-dark-10 text-[12px]">(Optional)</span>
			{/if}
		</p>
		<p class="text-xs text-gray-dark-11 mb-2">
			{description}
		</p>
	</div>
	{#if items?.length > 0}
		<div
			class="mt-2 flex gap-x-lg {direction === 'horizontal' ? 'flex-row flex-wrap' : 'flex-col'}"
		>
			{#each items as item}
				{@const id = crypto.randomUUID()}

				<label for={id} class="flex gap-x-2 cursor-pointer py-2 items-center">
					{#if multiple}
						<input
							type="checkbox"
							{name}
							{id}
							value={item}
							disabled={limitEnforced &&
								checked.length >= maxOptions &&
								!checked.find((value) => value == item)}
							bind:group={checked}
							on:change
							class="sr-only"
						/>
					{:else}
						<input {id} {name} type="radio" value={item} bind:group={value} class="sr-only" />
					{/if}
					<div class="checkbox">
						<CheckboxTickIcon />
					</div>
					<div class="text-sm text-gray-dark-12 leading-4 font-normal">
						<p>{item}</p>
					</div>
				</label>{/each}
		</div>
	{/if}
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

<style lang="postcss">
	.checkbox {
		@apply cursor-pointer w-5 h-5 border border-gray-dark-6 rounded flex items-center justify-center p-sm ring-[3px] ring-transparent text-transparent ml-[3px];
	}
	input[type='checkbox']:hover ~ .checkbox,
	input[type='radio']:hover ~ .checkbox {
		@apply text-gray-dark-6;
	}
	input[type='checkbox']:focus ~ .checkbox,
	input[type='radio']:focus ~ .checkbox {
		@apply text-gray-dark-6 border-mint-dark-8 ring-mint-dark-4;
	}
	input[type='checkbox']:disabled ~ .checkbox,
	input[type='radio']:disabled ~ .checkbox {
		@apply bg-gray-dark-3;
	}
	input[type='checkbox']:checked ~ .checkbox,
	input[type='radio']:checked ~ .checkbox {
		@apply bg-mint-dark-3 border-mint-dark-8 text-mint-dark-11;
	}
	input[type='checkbox']:checked:hover ~ .checkbox,
	input[type='radio']:checked:hover ~ .checkbox {
		@apply bg-mint-dark-3 border-mint-dark-5 text-mint-dark-11;
	}
	input[type='checkbox']:checked:disabled ~ .checkbox,
	input[type='radio']:checked:hover ~ .checkbox {
		@apply bg-mint-dark-3 border-mint-dark-4 text-mint-dark-7;
	}
</style>

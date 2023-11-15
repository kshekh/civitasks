<script lang="ts">
	import ErrorWarningAlertIcon from '$icons/ErrorWarningAlertIcon.svelte';
	import RadioControl from '$icons/RadioControl.svelte';

	export let name = '';
	export let label = '';
	export let description = '';
	export let direction: 'horizontal' | 'vertical' = 'horizontal';
	export let items: { [key: string]: string | number | boolean }[];
	export let checked: string | number | boolean = '';
	export let errors: string[] = [];
	export let optional = false;
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
				{@const [key, value] = Object.entries(item)?.[0]}
				{@const id = crypto.randomUUID()}
				<label for={id} class="flex gap-x-2 cursor-pointer items-center py-2">
					<!-- class="flex gap-x-2 cursor-pointer {description ? 'items-start' : 'items-center'}" -->
					<input {id} {name} type="radio" {value} bind:group={checked} class="sr-only" on:change />

					<div class="radio"><RadioControl /></div>
					<div class="text-sm text-gray-dark-12 leading-4 font-normal">
						<p>{key}</p>
						<!-- <p class="text-gray-dark-11 mt-2xs">{description}</p> -->
					</div>
				</label>
			{/each}
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
	.radio {
		@apply cursor-pointer w-5 h-5 border border-gray-dark-6 rounded-full flex items-center justify-center p-sm ring-[3px] ring-transparent text-transparent;
	}
	input[type='radio']:hover ~ .radio {
		@apply text-gray-dark-3;
	}
	input[type='radio']:focus ~ .radio {
		@apply text-gray-dark-3 border-mint-dark-8 ring-mint-dark-4;
	}
	input[type='radio']:disabled ~ .radio {
		@apply bg-gray-dark-3;
	}
	input[type='radio']:checked ~ .radio {
		@apply bg-mint-dark-3 border-mint-dark-8 text-mint-dark-11;
	}
	input[type='radio']:checked:hover ~ .radio {
		@apply bg-mint-dark-3 border-mint-dark-5 text-mint-dark-11;
	}
	input[type='radio']:checked:disabled ~ .radio {
		@apply bg-mint-dark-3 border-mint-dark-4 text-mint-dark-7;
	}
</style>

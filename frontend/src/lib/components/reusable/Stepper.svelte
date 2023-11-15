<script lang="ts">
	export let steps: string[];
	export let direction: 'horizontal' | 'vertical';
	export let disabledSteps: string[] = [];
	export let currentStep = 0;
	let hover = false;
</script>

<div
	class="relative w-fit h-fit flex gap-y-5 gap-x-4 -m-1 font-architekt {direction === 'vertical'
		? 'flex-col'
		: 'flex-row'}"
>
	{#if steps?.length > 0}
		{#each steps as step, i}
			<div class="p-1 z-10 bg-gray-dark-0">
				<button
					on:focus
					on:mouseover={() => (hover = true)}
					on:mouseleave={() => (hover = false)}
					on:click={() => (currentStep = i)}
					disabled={!!disabledSteps?.find((disabledStep) => disabledStep == step)}
				>
					<div
						class="!w-6 !h-6 flex items-center justify-center rounded text-xs leading-4 {i ==
						currentStep
							? 'bg-gray-dark-12 text-gray-dark-0'
							: 'bg-gray-dark-2 text-gray-dark-12'} {hover}"
					>
						{i + 1}
					</div>
					<p class="whitespace-nowrap">{step}</p>
				</button>
			</div>
		{/each}
	{/if}
	<div
		class="absolute border border-dashed border-gray-dark-5 {direction === 'vertical'
			? 'inset-y-0 left-4 w-px'
			: 'inset-x-0 top-4 h-px'}"
	/>
</div>

<style lang="postcss">
	button {
		@apply flex items-center gap-x-2 border border-transparent ring-[3px] ring-transparent rounded;
	}
	button:hover > div {
		@apply bg-gray-dark-4;
	}
	button:focus {
		@apply border-mint-dark-11 ring-mint-dark-8;
	}
	button:disabled {
		@apply cursor-not-allowed;
	}
	button:disabled > div {
		@apply text-gray-dark-8 bg-gray-dark-1;
	}
	button:disabled > p {
		@apply text-gray-dark-9;
	}
</style>

<script lang="ts">
	import CheckboxIcon from '$icons/CheckboxIcon.svelte';
	import CornerIcon from '$icons/CornerIcon.svelte';
	import ErrorWarningAlertIcon from '$icons/ErrorWarningAlertIcon.svelte';
	import InfoSquareIcon from '$icons/InfoSquareIcon.svelte';
	export let positive = false;
	export let warning = false;
	export let negative = false;
	export let informational = false;
	export let title = '';
	export let description = '';
	export let noIcon = false;
	let buttonContainer: HTMLDivElement;
	export let icon: any = null;
	$: {
		if (icon == null) {
			if (positive) icon = CheckboxIcon;
			else if (warning || negative) icon = ErrorWarningAlertIcon;
			else icon = InfoSquareIcon;
		}
	}
</script>

<div
	class:positive
	class:warning
	class:negative
	class:informational
	class="w-80 relative border border-gray-dark-8 bg-gray-dark-0 p-3xs {$$props.class}"
>
	<CornerIcon class="-m-3xs absolute top-0 right-0" />
	<CornerIcon class="-m-3xs absolute rotate-180 bottom-0 left-0" />
	<div class="w-full p-md border inner-container">
		<div class="flex items-center gap-x-sm {noIcon || !description ? 'mb-0' : 'mb-md'}">
			{#if !noIcon}
				{#if positive}
					<div class="text-mint-dark-11"><svelte:component this={icon} /></div>
				{:else if informational}
					<div class="text-indigo-dark-11"><svelte:component this={icon} /></div>
				{:else if warning}
					<div class="text-orange-dark-11 w-2xl h-2xl"><svelte:component this={icon} /></div>
				{:else if negative}
					<div class="text-red-dark-11 w-2xl h-2xl"><svelte:component this={icon} /></div>
				{:else}
					<div class="text-gray-dark-12"><svelte:component this={icon} /></div>
				{/if}
				{#if !description}
					<h2 class="title">{title}</h2>
				{/if}
			{/if}
		</div>
		{#if description}
			<h2 class="title">{title}</h2>
			<p class=" description">
				{description}
			</p>
		{/if}

		<div
			bind:this={buttonContainer}
			class="w-full flex items-center justify-between gap-x-md {buttonContainer?.hasChildNodes()
				? 'mt-md'
				: 'mb-0'}"
		>
			<slot />
		</div>
	</div>
</div>

<style lang="postcss">
	.title {
		@apply font-architekt text-sm leading-5 font-normal text-gray-dark-12;
	}
	.description {
		@apply mt-2xs text-xs leading-4 text-gray-dark-11 font-normal;
	}
	.inner-container {
		@apply border-gray-dark-4 bg-gray-dark-2;
	}
	.positive {
		@apply border-mint-dark-11;
	}
	.positive > .inner-container {
		@apply border-mint-dark-4 bg-mint-dark-2;
	}
	.positive > .inner-container > .description {
		@apply text-mint-dark-11;
	}
	.warning {
		@apply border-orange-dark-11;
	}
	.warning > .inner-container {
		@apply border-orange-dark-4 bg-orange-dark-2;
	}
	.warning > .inner-container > .description {
		@apply text-orange-dark-11;
	}
	.negative {
		@apply border-red-dark-11;
	}
	.negative > .inner-container {
		@apply border-red-dark-4 bg-red-dark-2;
	}
	.negative > .inner-container > .description {
		@apply text-red-dark-11;
	}
	.informational {
		@apply border-indigo-dark-11;
	}
	.informational > .inner-container {
		@apply border-indigo-dark-4 bg-indigo-dark-2;
	}
	.informational > .inner-container > .description {
		@apply text-indigo-dark-11;
	}
</style>

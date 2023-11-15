<script lang="ts">
	import { slide } from 'svelte/transition';
	import Button from './Button.svelte';
	import Chevron from '$icons/Chevron.svelte';

	export let text: string;
	let expanded = false;
	let isOverflown: boolean;
	let element: HTMLElement;

	const checkOverflow = (paragraphElement: HTMLParagraphElement) => {
		isOverflown = paragraphElement.scrollHeight > paragraphElement.clientHeight;
	};
</script>

<div bind:this={element} class="mt-lg relative flex flex-col items-start gap-2">
	<p
		transition:slide
		use:checkOverflow
		class="text-gray-dark-12 overflow-hidden text-sm leading-5 {expanded
			? 'h-fit'
			: 'h-[120px] md:h-[60px]'} "
	>
		{text ?? ''}
	</p>
	{#if isOverflown}
		<div class:hidden={expanded} class="text-background absolute bottom-0 h-[60px] w-full" />
	{/if}
</div>
{#if isOverflown}
	<Button
		quinary
		class="mt-3"
		on:click={() => {
			expanded = !expanded;
			if (!expanded) element.scrollTop = 0;
		}}
	>
		<Chevron class=" transform duration-500 {expanded ? 'rotate-180' : 'rotate-0'}" />
		<span>
			{#if expanded}
				See less
			{:else}
				See more
			{/if}
		</span>
	</Button>
{/if}

<script lang="ts">
	import TooltipIcon from '$icons/TooltipIcon.svelte';
	export let breakPosition:
		| 'left'
		| 'right'
		| 'bottom-center'
		| 'bottom-left'
		| 'bottom-right'
		| 'top-center'
		| 'top-left'
		| 'top-right' = 'bottom-center';
	export let tooltipContent: string;
</script>

<div
	class="relative text-gray-dark-12 text-xs leading-4 bg-gray-dark-4 border border-gray-dark-4 p-2 rounded-md"
	style="box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.04); "
>
	<p class="whitespace-nowrap">{tooltipContent}</p>
	<TooltipIcon
		class="absolute {breakPosition == 'bottom-center'
			? '-bottom-2 right-[calc(50%_-_9px)] rotate-180'
			: breakPosition == 'bottom-left'
			? '-bottom-2 left-2.5 rotate-180'
			: breakPosition == 'bottom-right'
			? '-bottom-2 right-2.5 rotate-180'
			: breakPosition == 'top-center'
			? '-top-2 right-[calc(50%_-_9px)]'
			: breakPosition == 'top-left'
			? '-top-2 left-2.5'
			: breakPosition == 'top-right'
			? '-top-2 right-2.5'
			: breakPosition == 'left'
			? '-left-3.5 top-[calc(50%_-_4.5px)] -rotate-90'
			: '-right-3.5 top-[calc(50%_-_4.5px)] rotate-90'}"
	/>
</div>

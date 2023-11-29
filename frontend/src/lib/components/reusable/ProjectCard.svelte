<script lang="ts">
	import ImageRender from '$components/ImageRender.svelte';
	import CornerIcon from '$icons/CornerIcon.svelte';
	import type { ListedProject } from '$utils/interfaces/project';
	import OverflowCounter from './OverflowCounter.svelte';
	import Tag from './Tag.svelte';
	let hover = false;
	export let project: ListedProject;
</script>

<button
	on:mouseenter={() => (hover = true)}
	on:mouseleave={() => (hover = false)}
	on:click
	class="border-gray-dark-6 hover:border-gray-dark-9 hover:bg-gray-dark-1 p-3xs w-full rounded border"
>
	<div class="border-gray-dark-2 p-md text-gray-dark-11 w-full rounded border text-xs leading-4">
		<!-- Details -->
		<div
			class="border-gray-dark-1 rounded-3xs gap-x-lg relative flex w-full flex-row gap-y-3 border p-1 {hover
				? 'bg-gray-dark-2'
				: 'bg-gray-dark-1'}"
		>
			<CornerIcon class="text-gray-dark-12 absolute right-0 top-0 -m-0.5" />
			<CornerIcon class="text-gray-dark-12 absolute bottom-0 left-0 -m-0.5 rotate-180 " />
			<div class="rounded-px w-full overflow-hidden whitespace-nowrap">
				<h2 class="mb-2 overflow-hidden text-ellipsis whitespace-nowrap">{project?.name}</h2>
				<ImageRender src={project?.images[0]} alt="project-logo" />
			</div>
		</div>
		<div class="mt-md gap-y-md flex w-full flex-col items-start">
			{#if project?.tracks?.length > 0}
				{#key project.tracks}
					<OverflowCounter>
						{#each project?.tracks as track}
							<span>
								<Tag tertiary size="xs">
									{#if track.toLowerCase() === 'physical infrastructure networks'}
										{'physical infra networks'}
									{:else}
										{track}
									{/if}
								</Tag>
							</span>
						{/each}
					</OverflowCounter>
				{/key}
			{/if}
		</div>
	</div>
</button>

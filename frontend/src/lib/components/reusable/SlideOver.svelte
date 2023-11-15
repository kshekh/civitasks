<script lang="ts">
	import XIcon from '$icons/XIcon.svelte';
	import DotGrid from './DotGrid.svelte';
	import CornerSquare from './wrappers/CornerSquare.svelte';

	export let slideOverOpen = true;
	export let title = '';
	export let clickoutCloseDisabled = false;
</script>

{#if slideOverOpen}
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="relative z-10 max-h-screen {$$props.class}">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class="fixed inset-0 flex flex-col justify-end bg-black/80 sm:flex-row"
			on:click={() => {
				if (!clickoutCloseDisabled) {
					slideOverOpen = false;
				}
			}}
		>
			<CornerSquare class="flex !h-fit w-full flex-col sm:!h-screen sm:w-[520px]">
				<div
					class="!py-md px-lg gap-x-md bg-gray-dark-1 border-gray-dark-2 flex !h-12 !min-h-[48px] w-full items-center overflow-hidden border-b-2"
				>
					<h2
						class="font-architekt text-gray-dark-12 text-normal whitespace-nowrap text-lg leading-6"
					>
						{title}
					</h2>
					<DotGrid />
					<button on:click={() => (slideOverOpen = false)}>
						<XIcon class="text-gray-dark-11" />
					</button>
				</div>
				<div class="py-xl px-2xl bg-gray-dark-0 relative w-full flex-1 overflow-y-scroll">
					<slot />
				</div>
			</CornerSquare>
		</div>
	</div>
{/if}

<script lang="ts">
	import XIcon from '$icons/XIcon.svelte';
	import CornerSquare from './wrappers/CornerSquare.svelte';
	import DotGrid from './DotGrid.svelte';

	export let modalOpen = true;
	export let title = '';
	export let clickoutCloseDisabled = false;
</script>

{#if modalOpen}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="relative z-10 {$$props.class}">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			class="fixed inset-0 bg-black/80 flex items-center justify-center"
			on:click={() => {
				if (!clickoutCloseDisabled) {
					modalOpen = false;
				}
			}}
		>
			<CornerSquare class="!w-[372px]">
				<div
					class="py-md px-lg w-full flex items-center gap-x-md overflow-hidden bg-gray-dark-1 border-b-2 border-gray-dark-2"
				>
					<h2
						class="font-architekt text-gray-dark-12 text-lg text-normal leading-6 whitespace-nowrap"
					>
						{title}
					</h2>
					<DotGrid />
					<button on:click={() => (modalOpen = false)}>
						<XIcon class="text-gray-dark-11" />
					</button>
				</div>
				<div class="w-full py-xl px-2xl bg-gray-dark-0"><slot /></div>
			</CornerSquare>
		</div>
	</div>
{/if}

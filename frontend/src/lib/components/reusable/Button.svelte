<script lang="ts">
	export let type: 'submit' | 'button' | 'reset' = 'button';
	export let icon = false;
	export let size: 'xs' | 'sm' | 'md' = 'sm';
	export let primary = false;
	export let secondary = false;
	export let tertiary = false;
	export let quaternary = false;
	export let quinary = false;
	export let danger = false;
	export let disabled = false;
	export let href = '';
	export let target: '_blank' | '_parent' | '_self' | '_top' = '_blank';
</script>

{#if href}
	<div
		class:xs={size == 'xs'}
		class:sm={size == 'sm'}
		class:md={size == 'md'}
		class:primary
		class:secondary
		class:tertiary
		class:quaternary
		class:quinary
		class:danger
		class:icon
		class="font-architekt text-sm font-normal leading-5 flex items-center justify-center gap-x-sm rounded cursor-pointer disabled:cursor-not-allowed border border-transparent ring-[3px] ring-transparent {$$props.class}"
	>
		<slot name="left-icon" />

		<slot name="right-icon" />
		<a {href} {target}><slot /></a>
	</div>
{:else}
	<button
		{type}
		{disabled}
		class:xs={size == 'xs'}
		class:sm={size == 'sm'}
		class:md={size == 'md'}
		class:primary
		class:secondary
		class:tertiary
		class:quaternary
		class:quinary
		class:danger
		class:icon
		class="font-architekt text-sm font-normal leading-5 flex items-center justify-center gap-x-sm rounded cursor-pointer disabled:cursor-not-allowed border border-transparent ring-[3px] ring-transparent {$$props.class}"
		on:click
	>
		<slot name="left-icon" />
		<slot />
		<slot name="right-icon" />
	</button>
{/if}

<style lang="ts">
	.primary {
		@apply text-mint-dark-11 bg-mint-dark-4;
	}
	.primary:hover {
		@apply bg-mint-dark-5;
	}
	.primary:focus {
		@apply bg-mint-dark-5  border-mint-dark-11 ring-mint-dark-8;
	}
	.primary:disabled {
		@apply text-mint-dark-7 bg-mint-dark-2;
	}
	.secondary {
		@apply text-gray-dark-1 bg-gray-dark-13;
	}
	.secondary:hover {
		@apply bg-gray-dark-12;
	}
	.secondary:focus {
		@apply bg-gray-dark-12 border-mint-dark-8 ring-mint-dark-4;
	}
	.secondary:disabled {
		@apply text-gray-dark-6 bg-gray-dark-10;
	}
	.tertiary {
		@apply text-gray-dark-12 bg-gray-dark-4;
	}
	.tertiary:hover {
		@apply bg-gray-dark-5;
	}
	.tertiary:focus {
		@apply bg-gray-dark-5 border-mint-dark-8 ring-mint-dark-4;
	}
	.tertiary:disabled {
		@apply text-gray-dark-9 bg-gray-dark-5;
	}
	.quaternary {
		@apply text-mint-dark-11 bg-transparent;
	}
	.quaternary:hover {
		@apply bg-mint-dark-5;
	}
	.quaternary:focus {
		@apply bg-mint-dark-5 border-mint-dark-11 ring-mint-dark-8;
	}
	.quaternary:disabled {
		@apply text-mint-dark-7 bg-transparent;
	}
	.quinary {
		@apply text-gray-dark-12 bg-transparent;
	}
	.quinary:hover {
		@apply bg-gray-dark-5;
	}
	.quinary:focus {
		@apply bg-gray-dark-5 border-mint-dark-8 ring-mint-dark-4;
	}
	.quinary:disabled {
		@apply text-gray-dark-9 bg-gray-dark-5;
	}
	.danger {
		@apply text-red-dark-11 bg-red-dark-4;
	}
	.danger:hover {
		@apply bg-red-dark-5;
	}
	.danger:focus {
		@apply bg-red-dark-5 border-red-dark-8 ring-red-dark-4;
	}
	.danger:disabled {
		@apply text-red-dark-7 bg-red-dark-2;
	}
	.xs {
		@apply h-6;
	}
	.sm {
		@apply h-8 px-md;
	}
	.md {
		@apply h-10 px-lg;
	}
	.icon {
		@apply aspect-square px-0;
	}
</style>

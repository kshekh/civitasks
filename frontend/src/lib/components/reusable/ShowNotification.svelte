<script lang="ts">
	import Notification from './Notification.svelte';
	export let withAction = false;
	export let duration = 1000;
	export let positive = false;
	export let warning = false;
	export let negative = false;
	export let informational = false;
	export let title = '';
	export let description = '';
	export let noIcon = false;
	export let position:
		| 'top-left'
		| 'top-center'
		| 'top-right'
		| 'middle-left'
		| 'middle-center'
		| 'middle-right'
		| 'bottom-left'
		| 'bottom-center'
		| 'bottom-right' = 'bottom-center';
</script>

<div class="fixed inset-0 z-40">
	<div class:bottom-center={position == 'bottom-center'} class="absolute">
		<Notification {positive} {warning} {negative} {informational} {title} {description} {noIcon}>
			<slot />
		</Notification>
	</div>
</div>

<style lang="postcss">
	.bottom-center {
		@apply bottom-6 inset-x-[calc(50%-160px)];
	}
</style>

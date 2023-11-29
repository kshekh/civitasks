<script lang="ts">
	export let icon: any = null;
	export let title: string;
</script>

<div class="flex w-full items-center {$$props.class}">
	<div class="text-gray-dark-11">
		<svelte:component this={icon} />
	</div>
	<h2 class="ml-md mr-lg font-architekt text-gray-dark-12 text-[18px] leading-6">{title}</h2>
	<div class="bg-gray-dark-3 h-px flex-1" />
	<div class="bg-gray-dark-6 ml-2xs h-1 w-1" />
</div>

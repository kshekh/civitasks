<script lang="ts">
	import Button from './Button.svelte';
	export let primary = false;
	export let size: 'xs' | 'sm' = 'sm';
	export let value: string | number | undefined;
</script>

<Button
	{primary}
	on:click
	class="!w-fit {size == 'sm'
		? '!h-7'
		: size == 'xs'
		? '!h-6'
		: ''} flex !justify-start whitespace-nowrap !border-gray-dark-3 text-gray-dark-11 hover:text-gray-dark-12 !focus:border-mint-dark-4 focus:ring-mint-dark-8 {$$props.class}"
>
	<slot />
	<span>{value}</span>
</Button>

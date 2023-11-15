<script lang="ts">
	import HashtagIcon from '$icons/HashtagIcon.svelte';
	import Button from './Button.svelte';
	export let primary = false;
	export let tertiary = false;
	export let size: 'xs' | 'sm' = 'sm';
</script>

<!-- class={size == 'sm' ? '!h-7' : size == 'xs' ? '!h-6' : ''} -->
<Button
	{primary}
	{tertiary}
	class="!w-fit {size == 'sm'
		? '!h-7'
		: size == 'xs'
		? '!h-6'
		: ''} flex !justify-start whitespace-nowrap {$$props.class}"
>
	<HashtagIcon slot="left-icon" />
	<span><slot /></span>
</Button>

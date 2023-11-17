<script>
	export let theme;
	export let linkTo;
	export let className;
</script>

{#if theme === 'green'}
	<a class={`uppercase bg-brand-dark-green text-brand-light-green ${className}`} href={linkTo}
		><slot /></a
	>
{/if}

{#if theme === 'default'}
	<a class={`uppercase bg-slate-100 text-gray-800 ${className}`} href={linkTo}><slot /></a>
{/if}

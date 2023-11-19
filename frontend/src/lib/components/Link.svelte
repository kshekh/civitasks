<script>
	export let theme;
	export let linkTo;
	export let placement;
</script>

<a
	class={`font-nb-architekt uppercase rounded-[4px] ${
		theme === 'green' ? 'bg-brand-dark-green text-brand-light-green' : 'bg-slate-100 text-gray-800'
	} ${
		placement === 'header'
			? 'pb-0.5 pt-1 px-4 md:pb-2 md:pt-2.5 md:px-4'
			: 'pb-2 pt-2.5 px-4 md:pb-4 md:pt-[18px] md:px-7'
	}`}
	href={linkTo}><slot /></a
>

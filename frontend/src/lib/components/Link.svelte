<script>
	export let theme;
	export let linkTo;
	export let placement;
</script>

<a
	class={`font-nb-architekt uppercase rounded-[4px] ${
		theme === 'green'
			? 'bg-green-2 text-green-1 hover:brightness-150 focus-within:brightness-150 transition-all ease-in-out duration-300 outline-none focus-within:outline-green-1 focus-within:outline-offset-2'
			: 'bg-gray-1 text-gray-10 hover:contrast-75 focus-within:hover:contrast-75 transition-all ease-in-out duration-300 outline-none focus-within:outline-white focus-within:outline-offset-2'
	} ${
		placement === 'header'
			? 'pb-1 pt-2 px-3 md:pb-2 md:pt-3 md:px-4 text-[14px]'
			: 'pb-2.5 pt-3 px-4 md:pb-4 md:pt-[18px] md:px-7 text-[14px] md:text-[18px]'
	}`}
	href={linkTo}><slot /></a
>

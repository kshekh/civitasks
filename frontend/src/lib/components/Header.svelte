<script>
	import { onMount } from 'svelte';
	import Link from '$lib/components/Link.svelte';

	let showNav = false;

	onMount(() => {
		const mediaQuery = window.matchMedia('(min-width: 768px)');

		const handleWidthChange = (e) => {
			if (e.matches) {
				showNav = false;
			}
		};

		mediaQuery.addEventListener('change', handleWidthChange);

		handleWidthChange(mediaQuery);

		return () => {
			mediaQuery.removeEventListener('change', handleWidthChange);
		};
	});
</script>

<header>
	<nav>
		<div class="font-tasa-orbiter-display font-medium relative">
			<div class="px-4 py-6 flex items-center justify-between">
				<div class="flex items-center gap-10">
					<a href="/#"
						><img
							class="max-w-[144px] md:max-w-full"
							src="/logo-colosseum.svg"
							alt="Colosseum logo"
						/></a
					>
					<div class="absolute z-10 top-[88px] left-0 right-0 md:static">
						<div class="relative">
							<ul
								class={`${
									showNav ? 'flex' : 'hidden'
								} border-t border-gray-900 md:border-none flex-col w-full p-6 md:p-0 bg-brand-black md:flex md:w-auto md:flex-row md:items-center gap-8 md:gap-8`}
							>
								<li>
									<a
										class="block hover:text-brand-light-green focus-within:text-brand-light-green transition-colors duration-300"
										href="/#">Hackathon</a
									>
								</li>
								<li>
									<a
										class="block hover:text-brand-light-green focus-within:text-brand-light-green transition-colors duration-300"
										href="/#">Accelerator</a
									>
								</li>
								<li>
									<a
										class="block hover:text-brand-light-green focus-within:text-brand-light-green transition-colors duration-300"
										href="/#">Find Cofounders</a
									>
								</li>
								<li>
									<a
										class="block hover:text-brand-light-green focus-within:text-brand-light-green transition-colors duration-300"
										href="/#">About</a
									>
								</li>
							</ul>
						</div>
						<div
							class={`${
								showNav ? 'absolute top-0 left-0 w-1 aspect-square bg-gray-500' : 'sm:hidden'
							}`}
						></div>
						<div
							class={`${
								showNav ? 'absolute top-0 right-0 w-1 aspect-square bg-gray-500' : 'sm:hidden'
							}`}
						></div>
						<div
							class={`${
								showNav ? 'absolute bottom-0 left-0 w-1 aspect-square bg-gray-500' : 'sm:hidden'
							}`}
						></div>
						<div
							class={`${
								showNav ? 'absolute bottom-0 right-0 w-1 aspect-square bg-gray-500' : 'sm:hidden'
							}`}
						></div>
					</div>
				</div>
				<div class="flex items-center gap-2">
					<Link linkTo="/signup" theme="green" placement="header">Sign Up</Link>
					<button class="md:hidden" on:click={() => (showNav = !showNav)}
						><img src={`${showNav ? '/close.svg' : '/hamburger.svg'}`} alt="" /></button
					>
				</div>
			</div>
		</div>
	</nav>
</header>

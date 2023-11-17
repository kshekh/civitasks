<script>
	import Link from '$lib/components/Link.svelte';
</script>

<header>
	<nav>
		<div class="px-4 py-6 font-tasa-orbiter-display font-medium">
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-10">
					<a href=""><img src="/logo-colosseum.svg" alt="Colosseum logo" /></a>
					<ul class="hidden md:flex items-center gap-8">
						<li><a href="">Hackathon</a></li>
						<li><a href="">Accelerator</a></li>
						<li><a href="">Find Cofounders</a></li>
						<li><a href="">About</a></li>
					</ul>
				</div>
				<div class="flex items-center">
					<!-- TODO: Turn this into a component -->
					<!-- TODO: Use font according to the design -->
					<Link linkTo="#" theme="green" className="rounded-[4px] py-2 px-3 sm:py-3 sm:px-4"
						>Sign Up</Link
					>
					<button class="md:hidden"><img src="/hamburger.svg" alt="" /></button>
				</div>
			</div>
		</div>
	</nav>
</header>

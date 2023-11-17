<script>
	import Link from '$lib/components/Link.svelte';
</script>

<section>
	<div
		class="grid grid-cols-2 items-center max-w-7xl mx-auto font-tasa-orbiter-display text-lg mb-72"
	>
		<div class="grid gap-10">
			<h2 class="text-8xl uppercase font-bold">Join Colosseum's Community</h2>
			<p class="max-w-xl">
				Colosseum runs 3 online hackathons per year, each followed by an Accelerator cohort. Sign up
				for a Colosseum account, create a builder profile, search the directory to find cofounders,
				and jam on product ideas in the forum before the next Hackathon.
			</p>
			<div class="flex items-center gap-4">
				<div>
					<Link linkTo="/signup" theme="green" className="rounded-[4px] py-2 px-4 sm:py-4 sm:px-7"
						>Sign Up</Link
					>
				</div>
				<div>
					<Link linkTo="/signin" theme="default" className="rounded-[4px] py-2 px-4 sm:py-4 sm:px-7"
						>Sign In</Link
					>
				</div>
			</div>
		</div>
		<div>
			<img src="/image-person-two.png" alt="" />
		</div>
	</div>
</section>

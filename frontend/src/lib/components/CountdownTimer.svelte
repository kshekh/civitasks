<script>
	import Link from '$lib/components/Link.svelte';
</script>

<section>
	<!-- TODO: add icons -->
	<div class="text-center mb-40">
		<!-- TODO: Add countodown timer -->
		<div class="h-[25vh] mb-12">Countdown timer here</div>
		<div class="max-w-lg mx-auto">
			<h2 class="font-tasa-orbiter-display font-semibold text-4xl mb-8">
				Colosseum’s next Hackathon starts on January 10, 2024.
			</h2>
			<Link linkTo="/signup" theme="default" className="rounded-[4px] py-2 px-4 sm:py-4 sm:px-7"
				>Sign Up</Link
			>
		</div>
	</div>
</section>

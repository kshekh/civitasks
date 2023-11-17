<script>
	import Link from '$lib/components/Link.svelte';
</script>

<section>
	<!-- TODO: add bg image -->
	<div class="font-tasa-orbiter-display text-center pt-32">
		<div class="bg-grid bg-no-repeat bg-cover">
			<h1 class="uppercase font-bold text-9xl mb-2">Enter the Arena</h1>
			<div class="max-w-[938px] mx-auto text-lg mb-10">
				<p>Claim your place in the next generation of online hackathons.</p>
				<p>
					Join the most innovative builders in crypto, and launch an industry-defining company on
					Solana.
				</p>
				<p>
					Win and be invited to Colosseum’s accelerator, where you’ll receive mentorship from
					successful ecosystem founders, and grow your start-up with funding from Colosseum and
					other top investors.
				</p>
			</div>
		</div>
		<div class="flex items-center justify-center gap-4 mb-12">
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
		<!-- add icons over image -->
		<div class="max-w-4xl mx-auto">
			<img src="/image_colosseum.png" alt="" />
		</div>
	</div>
</section>

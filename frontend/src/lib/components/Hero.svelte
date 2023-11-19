<script>
	import Link from '$lib/components/Link.svelte';
</script>

<section>
	<!-- TODO: add bg image -->
	<div
		class="font-tasa-orbiter-display text-center px-6 pt-14 md:pt-32 bg-grid bg-no-repeat bg-contain bg-top md:bg-[50%_-18rem]"
	>
		<div class="">
			<h1 class="uppercase font-bold text-6xl md:text-9xl mb-10 md:mb-2">Enter the Arena</h1>
			<div class="max-w-[938px] mx-auto text-lg mb-10">
				<p>
					Claim your place in the next generation of online hackathons.<br
						class="hidden sm:block"
					/>Join the most innovative builders in crypto, and launch an industry-defining company on
					Solana.<br class="hidden sm:block" />Win and be invited to Colosseum’s accelerator, where
					you’ll receive mentorship from successful ecosystem founders, and grow your start-up with
					funding from Colosseum and other top investors.
				</p>
			</div>
		</div>
		<div class="flex items-center justify-center gap-4 mb-12">
			<div>
				<Link linkTo="/signup" theme="green">Sign Up</Link>
			</div>
			<div>
				<Link linkTo="/signin" theme="default">Sign In</Link>
			</div>
		</div>
		<!-- add icons over image -->
		<div class="max-w-4xl mx-auto">
			<img src="/image_colosseum.png" alt="" />
		</div>
	</div>
</section>

<script>
	let builders = 50_000;
	let productsLaunched = 3_200;
	let amountRaised = 650;

	import { formattedNumber } from '$lib/utils.js';
</script>

<section>
	<div class="text-center px-6 text-gray-200">
		<div class="relative">
			<img class="mx-auto pt-20 md:pt-0" src="/image-person-one.png" alt="" />
			<div class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 max-w-3xl w-full">
				<div class="mb-16 md:mb-20">
					<h2
						class="font-tasa-orbiter-display text-4xl md:text-6xl font-semibold max-w-2xl mx-auto"
					>
						Colosseum Powers the Solana Hackathon
					</h2>
				</div>

				<div>
					<ul
						class="font-nb-architekt uppercase grid md:grid-cols-3 items-center gap-y-10 md:gap-y-0 md:gap-x-8 mb-32 md:mb-0"
					>
						<li>
							<span class="text-5xl">{formattedNumber(builders)}+<br /></span>builders
						</li>
						<li class="">
							<span class="text-5xl">{formattedNumber(productsLaunched)}+<br /></span>products
							launched
						</li>
						<li>
							<span class="text-5xl">${amountRaised}M+<br /></span>million raised by winners
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</section>

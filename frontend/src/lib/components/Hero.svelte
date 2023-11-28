<script>
	import Link from '$lib/components/Link.svelte';
</script>

<section>
	<div
		class="font-tasa-orbiter-display text-center px-6 pt-14 md:pt-32 bg-[url(/bg-grid-two.png)] bg-no-repeat bg-[size:250%] md:bg-contain bg-[50%_-50%] md:bg-[50%_-44%] relative"
	>
		<div class="">
			<h1 class="text-gray-1 uppercase font-semibold md:font-bold text-6xl md:text-9xl mb-10 md:mb-3">
				Enter the Arena
			</h1>
			<div class="max-w-[938px] mx-auto text-base md:text-lg mb-10 md:mb-14">
				<p class="text-gray-2">
					Claim your place in the next generation of Solana hackathons.<br
						class="hidden [@media(min-width:850px)]:block"
					/>
					Win and join Colosseum's accelerator program where you'll receive mentorship from ecosystem founders,<br
						class="hidden [@media(min-width:850px)]:block"
					/>
					and grow your start-up with funding from Colosseum and other top investors.
				</p>
			</div>
		</div>
		<div class="flex items-center justify-center gap-4 mb-2 md:mb-16">
			<div>
				<Link linkTo="/#" theme="green" placement="">Sign Up</Link>
			</div>
			<div>
				<Link linkTo="/#" theme="default" placement="">Sign In</Link>
			</div>
		</div>
		<!-- add icons over image -->
		<div class="max-w-4xl 2xl:max-w-full mx-auto">
			<img
				class="translate-x-3.5 md:translate-x-7 2xl:translate-x-64 2xl:ml-3 pointer-events-none select-none"
				src="/image_colosseum.png"
				alt=""
			/>
		</div>
		<img
			class="hidden pointer-events-none select-none xl:block absolute top-[44%] left-1/4"
			src="/icon-trophy.svg"
			alt=""
		/>
		<img
			class="hidden pointer-events-none select-none xl:block absolute bottom-[28%] left-[42%]"
			src="/icon-solana.svg"
			alt=""
		/>
		<img
			class="hidden pointer-events-none select-none xl:block absolute top-[51%] right-[33%]"
			src="/icon-diamond.svg"
			alt=""
		/>
		<img
			class="hidden pointer-events-none select-none xl:block absolute top-[40%] right-[22%]"
			src="/icon-code.svg"
			alt=""
		/>
	</div>
</section>

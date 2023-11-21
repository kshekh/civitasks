<script>
	import { data } from '$lib/data.js';
	const { testimonials } = data;

	import TestimonialItem from '$lib/components/TestimonialItem.svelte';
	import TestimonialSlider from '$lib/components/TestimonialSlider.svelte';
</script>

<section>
	<div class="font-tasa-orbiter-display mb-5">
		<div class="px-6 flex items-center justify-between">
			<div class="hidden md:block">
				<img src="/shape-pillar-one.png" alt="" />
			</div>
			<div class="flex-1 w-full">
				<h2 class="text-gray-200 text-4xl md:text-5xl font-semibold text-center mb-12">
					What the Crypto Community is Saying
				</h2>
				<div class="hidden md:block">
					<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-4 md:px-14">
						{#each testimonials as testimonial}
							<TestimonialItem {testimonial} />
						{/each}
					</div>
				</div>
				<div class="md:hidden">
					<TestimonialSlider {testimonials} />
				</div>
			</div>
			<div class="hidden md:block">
				<img src="/shape-pillar-two.png" alt="" />
			</div>
		</div>
	</div>
</section>

<script>
	import { Splide, SplideSlide, SplideTrack } from '@splidejs/svelte-splide';
	import '@splidejs/svelte-splide/css/core';
	import TestimonialItem from '$lib/components/TestimonialItem.svelte';

	export let testimonials;
</script>

<Splide hasTrack={false} aria-label="Testimonials slider">
	<SplideTrack>
		{#each testimonials as testimonial}
			<SplideSlide>
				<TestimonialItem {testimonial} />
			</SplideSlide>
		{/each}
	</SplideTrack>

	<div class="splide__arrows mt-6 flex items-center justify-center gap-4">
		<button class="splide__arrow splide__arrow--prev"
			><img src="/icon-chevron.svg" alt="Previous" /></button
		>
		<button class="splide__arrow splide__arrow--next"
			><img class="rotate-180" src="/icon-chevron.svg" alt="Next" /></button
		>
	</div>
</Splide>

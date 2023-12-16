<script>
  import { data } from '$lib/data.js';
  const { testimonials } = data;

  import TestimonialItem from '$lib/components/TestimonialItem.svelte';
  import TestimonialSlider from '$lib/components/TestimonialSlider.svelte';
</script>

<section>
  <div class="mb-5 font-tasa-orbiter-display">
    <div class="flex items-center justify-between px-6">
      <div class="hidden md:block">
        <img src="/images/illustrations/illustration-4.png" alt="" />
      </div>
      <div class="w-full flex-1">
        <h2 class="mb-12 text-center text-4xl text-gray-1 md:text-5xl">
          What the Crypto Community is Saying
        </h2>
        <div class="hidden md:block">
          <div
            class="grid gap-x-2 gap-y-4 md:grid-cols-2 md:px-14 lg:grid-cols-3"
          >
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
        <img src="/images/illustrations/illustration-5.png" alt="" />
      </div>
    </div>
  </div>
</section>

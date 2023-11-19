<script>
  import TestimonialItem from '$lib/components/TestimonialItem.svelte';
</script>

<section>
  <div class="font-tasa-orbiter-display mb-5">
    <div class="px-6 flex items-center justify-between">
      <div class="hidden md:block">
        <img src="/shape-pillar-one.png" alt="" />
      </div>
      <div class="flex-1">
        <h2 class="text-4xl md:text-5xl font-semibold text-center mb-12">
          What the Crypto Community is Saying
        </h2>
        <div class="grid lg:grid-cols-3 gap-x-2 gap-y-4 md:px-14">
          {#each Array(6) as _, i}
            <TestimonialItem />
          {/each}
        </div>
      </div>
      <div class="hidden md:block">
        <img src="/shape-pillar-two.png" alt="" />
      </div>
    </div>
  </div>
</section>

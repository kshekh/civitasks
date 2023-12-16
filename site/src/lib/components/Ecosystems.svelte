<script>
  import ImageBox from '$lib/components/ImageBox.svelte';
  import Element from '$lib/components/Element.svelte';

  import { data } from '$lib/data.js';
  const { ecosystems } = data;
</script>

<section>
  <div class="mx-auto max-w-6xl px-6 text-gray-1 sm:mb-24 md:mb-48">
    <div class="mb-20 md:mb-16">
      <Element class="mb-8" name="plus-detail-1" />
      <div class="relative isolate flex items-center justify-between">
        <h2 class="max-w-3xl text-[2.5rem] leading-[3rem] font-medium md:text-5xl md:leading-[3.5rem]">
          Top Ecosystem Founders got their start in Solana Hackathons
        </h2>
        <Element
          class="absolute -bottom-1/2 right-0 -z-10 w-32 sm:bottom-1/2 sm:block sm:w-auto sm:translate-y-1/2"
          name="globe"
        />
      </div>
    </div>

    <!-- Ecosystems -->
    <div>
      <ul
        class="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
      >
        {#each ecosystems as ecosystemItem}
          <li>
            <ImageBox item={ecosystemItem} />
          </li>
        {/each}
      </ul>
    </div>
  </div>
</section>

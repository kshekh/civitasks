<script>
  import FaqItem from '$lib/components/FaqItem.svelte';

  export let faqItems = [];
</script>

<section>
  <h2
    class="before:content-glitch-1 relative isolate mx-auto mb-12 max-w-sm text-center font-tasa-orbiter-display text-4xl font-semibold text-gray-1 before:absolute before:left-1/2 before:top-1/2 before:-z-10 before:w-full before:-translate-x-1/2 before:-translate-y-1/2 before:opacity-60 md:mb-20 md:max-w-lg md:text-6xl before:md:scale-150"
  >
    Frequently Asked Questions
  </h2>
  <div class="mx-auto max-w-2xl space-y-4 px-6">
    {#if faqItems.length > 0}
      {#each faqItems as faqItem}
        <FaqItem {faqItem} />
      {/each}
    {/if}
  </div>
</section>

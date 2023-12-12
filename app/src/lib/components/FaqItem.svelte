<script>
  import { slide } from 'svelte/transition';
  let isFaqOpen = false;

  export let faqItem;

  const { question, answer } = faqItem;
</script>

<!-- TODO: add open/close icons -->
<div
  class="relative isolate rounded-lg border border-gray-7 bg-gray-11 p-6 font-tasa-orbiter-display before:absolute before:inset-1 before:-z-10 before:rounded-lg before:border before:border-gray-8"
>
  <details on:toggle={() => (isFaqOpen = !isFaqOpen)} class={`space-y-6`}>
    <summary
      class={`w-10/12 cursor-pointer list-none text-lg font-medium text-gray-1 after:absolute after:right-6 after:top-6 after:aspect-square after:w-5 ${
        isFaqOpen ? 'after:content-minus' : 'after:content-plus'
      }`}>{question}</summary
    >
    {#if isFaqOpen}
      <div transition:slide class="space-y-6 text-base text-gray-2">
        <p class="whitespace-pre-line">{answer}</p>
      </div>
    {/if}
  </details>
</div>

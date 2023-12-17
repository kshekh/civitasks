<script>
  export let feature;
</script>

{#if feature}
  <li
    class="border-gray-7 before:border-gray-8 relative isolate flex h-[21.75rem] flex-col justify-between rounded-2xl border px-7 pt-5 pb-6 before:absolute before:inset-1 before:-z-10 before:rounded-2xl before:border"
  >
    <img class="w-full" src={feature.imageUrl} alt="" />
    <div>
      <h3 class="text-mint-1 mb-2 text-xl font-medium">{feature.name}</h3>
      <p class="text-gray-2">{feature.description}</p>
    </div>
  </li>
{/if}

<script>
  export let feature;
</script>

{#if feature}
  <li
    class="grid-row-2 relative grid rounded-2xl border border-gray-7 p-7 before:absolute before:inset-1 before:rounded-2xl before:border before:border-gray-8"
  >
    <div class="mb-3 flex min-h-[8rem] items-center">
      <img class="w-full" src={feature.imageUrl} alt="" />
    </div>
    <div class="flex items-end">
      <div>
        <h3 class="text-xl font-medium text-mint-1">{feature.name}</h3>
        <p class="text-gray-2">{feature.description}</p>
      </div>
    </div>
  </li>
{/if}

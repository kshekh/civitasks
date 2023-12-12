<script>
  export let testimonial;
</script>

{#if testimonial}
  <article
    class="relative max-w-3xl rounded-lg border border-gray-8 px-6 py-8 opacity-80 outline outline-2 -outline-offset-[6px] outline-gray-9 hover:border-gray-7 hover:opacity-100 hover:outline-none hover:after:absolute hover:after:inset-1 hover:after:rounded-lg hover:after:border hover:after:border-gray-8 md:max-w-full"
  >
    <div class="mb-2 flex items-center gap-3">
      <img src={testimonial.imageUrl} alt={testimonial.name} />
      <div>
        <h3 class="font-normal text-gray-1">{testimonial.name}</h3>
        <p class="text-sm font-normal text-gray-6">{testimonial.position}</p>
      </div>
    </div>
    <p class="text-gray-4">{testimonial.message}</p>
  </article>
{/if}

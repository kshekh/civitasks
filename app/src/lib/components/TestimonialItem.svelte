<script>
	export let testimonial;
</script>

{#if testimonial}
	<article
		class="border border-gray-8 outline outline-2 -outline-offset-[6px] outline-gray-9 hover:outline-none rounded-lg relative opacity-80 hover:opacity-100 hover:border-gray-7 hover:after:absolute hover:after:inset-1 hover:after:border hover:after:border-gray-8 hover:after:rounded-lg px-6 py-8 max-w-3xl md:max-w-full"
	>
		<div class="flex items-center gap-3 mb-2">
			<img src={testimonial.imageUrl} alt={testimonial.name} />
			<div>
				<h3 class="text-gray-1 font-normal">{testimonial.name}</h3>
				<p class="text-gray-6 text-sm font-normal">{testimonial.position}</p>
			</div>
		</div>
		<p class="text-gray-4">{testimonial.message}</p>
	</article>
{/if}

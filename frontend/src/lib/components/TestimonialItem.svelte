<script>
	export let testimonial;
</script>

{#if testimonial}
	<article
		class="border border-gray-700 rounded-lg relative opacity-80 hover:opacity-100 hover:border-gray-600 hover:after:absolute hover:after:inset-1 hover:after:border hover:after:border-gray-700 hover:after:rounded-lg px-6 py-8 max-w-3xl md:max-w-full"
	>
		<div class="flex items-center gap-3 mb-2">
			<img src={testimonial.imageUrl} alt={testimonial.name} />
			<div>
				<h3 class="font-medium">{testimonial.name}</h3>
				<p class="text-sm">{testimonial.position}</p>
			</div>
		</div>
		<p>{testimonial.message}</p>
	</article>
{/if}

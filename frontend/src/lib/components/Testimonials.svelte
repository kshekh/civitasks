<script>
	import TestimonialItem from '$lib/components/TestimonialItem.svelte';
</script>

<section>
	<div class="px-4 font-tasa-orbiter-display mb-5">
		<div class="flex items-center justify-between">
			<div>
				<img src="/shape-pillar-one.png" alt="" />
			</div>
			<div class="flex-1 px-14">
				<h2 class="text-5xl font-semibold text-center mb-12">
					What the Crypto Community is Saying
				</h2>
				<div class="grid grid-cols-3 gap-x-2 gap-y-4">
					{#each Array(6) as _, i}
						<TestimonialItem />
					{/each}
				</div>
			</div>
			<div>
				<img src="/shape-pillar-two.png" alt="" />
			</div>
		</div>
	</div>
</section>

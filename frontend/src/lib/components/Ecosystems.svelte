<script>
	import ImageBox from '$lib/components/ImageBox.svelte';

	import { data } from '$lib/data.js';

	const { ecosystems } = data;
</script>

<section>
	<div class="text-gray-200 max-w-6xl mx-auto px-6 sm:mb-24 md:mb-48">
		<div class="mb-20 md:mb-10">
			<img class="mb-8" src="/element-plus-detail-one.svg" alt="" />
			<div class="flex items-center justify-between relative isolate">
				<h2 class="text-4xl md:text-5xl font-semibold max-w-3xl">
					Top Ecosystem Founders got their Start in Solana Hackathons
				</h2>
				<img
					class="absolute -z-10 -bottom-1/2 sm:bottom-1/2 sm:translate-y-1/2 right-0 w-32 sm:w-auto sm:block"
					src="/element-globes.svg"
					alt=""
				/>
			</div>
		</div>

		<!-- Ecosystems -->
		<div>
			<ul class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
				{#each ecosystems as ecosystemItem}
					<li>
						<ImageBox {ecosystemItem} />
					</li>
				{/each}
			</ul>
		</div>
	</div>
</section>

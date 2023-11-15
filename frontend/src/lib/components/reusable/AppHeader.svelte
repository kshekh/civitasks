<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	let HyperdriveLogo = '/images/png/hyperdrive_long_logo_text.png';
</script>

<div
	class="px-2xl py-lg flex items-center border-b border-gray-dark-3 {$page.data.urlSlug
		? 'justify-between'
		: 'justify-between md:justify-center'}"
>
	<video
		loop
		muted
		playsInline
		disablepictureinpicture
		autoPlay
		class="absolute w-full h-[4rem] object-cover -z-10"
	>
		<source
			src="https://player.vimeo.com/progressive_redirect/playback/855402035/rendition/720p/file.mp4?loc=external&signature=25efff13a9fa9901af9a2a96ebfbca57cd27facd2b3b5e67c2a7b75e506a2f3c"
			type="video/mp4"
		/>
	</video>
	<div class="flex items-center gap-x-10 pr-4">
		<a href="https://www.solana.com/hyperdrive">
			<img src={HyperdriveLogo} alt="Hyperdrive Logo" />
		</a>
	</div>

	{#if $page.data.urlSlug}
		<button
			class="w-8 h-8 rounded-full overflow-hidden"
			on:click={() => goto(`/profile/${$page.data.urlSlug}`)}
		>
			<img
				src="https://picsum.photos/4000"
				alt="avatar"
				class="w-full aspect-square object-cover object-center"
			/>
		</button>
	{/if}
</div>

<script>
	import { onMount } from 'svelte';

	let video;
	let playing = false;
	let videoSource = '/sample-video.mp4';
	let videoPoster = '/sample-video-placeholder-image.jpg';

	onMount(() => {
		video.onplay = () => (playing = true);
		video.onpause = () => (playing = false);
	});

	function togglePlayPause() {
		if (video.paused) {
			video.play();
		} else {
			video.pause();
		}
	}
</script>

<div class="px-6">
	<div
		class="-translate-y-8 md:-translate-y-24 border-2 border-gray-7 rounded-lg relative before:absolute before:-inset-1.5 before:border before:border-gray-8 before:rounded-lg aspect-video max-w-4xl w-full mx-auto"
	>
		<video
			poster={videoPoster}
			bind:this={video}
			src={videoSource}
			class="rounded-2xl aspect-video w-full"
			on:click={togglePlayPause}
		></video>
		<div
			class="absolute z-10 top-0 left-0 w-full h-full flex items-center justify-center cursor-pointer"
			on:click={togglePlayPause}
		>
			<img class={`${playing ? 'hidden' : ''}`} src="/icon-play-button.svg" alt="" />
		</div>
		<div
			class={`${
				playing
					? 'hidden'
					: 'absolute top-0 -bottom-2 -left-4 -right-4 bg-gradient-to-b from-transparent to-gray-11 transition-all ease-in-out duration-300'
			}`}
		></div>
	</div>
</div>

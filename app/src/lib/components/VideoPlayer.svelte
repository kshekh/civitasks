<script>
  import Icon from '$lib/components/Icon.svelte';

  import { onMount } from 'svelte';

  let video;
  let playing = false;
  let videoSource = '/videos/video-placeholder.mp4';
  let videoPoster = 'images/thumbnails/video-placeholder-image.jpg';

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
    class="relative mx-auto aspect-video w-full max-w-4xl -translate-y-8 rounded-lg border-2 border-gray-7 before:absolute before:-inset-1.5 before:rounded-lg before:border before:border-gray-8 md:-translate-y-24"
  >
    <video
      poster={videoPoster}
      bind:this={video}
      src={videoSource}
      class="aspect-video w-full rounded-2xl"
      on:click={togglePlayPause}
    ></video>
    <div
      class="absolute left-0 top-0 z-10 flex h-full w-full cursor-pointer items-center justify-center"
      on:click={togglePlayPause}
    >
      <Icon class={`${playing ? 'hidden' : ''}`} name="play" />
    </div>
    <div
      class={`${
        playing
          ? 'hidden'
          : 'absolute -bottom-2 -left-4 -right-4 top-0 bg-gradient-to-b from-transparent to-gray-11 transition-all duration-300 ease-in-out'
      }`}
    ></div>
  </div>
</div>

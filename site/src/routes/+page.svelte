<script>
  import Hero from '$lib/components/Hero.svelte';
  import VideoPlayer from '$lib/components/VideoPlayer.svelte';
  import CountdownTimer from '$lib/components/CountdownTimer.svelte';
  import Achievements from '$lib/components/Achievements.svelte';
  import Ecosystems from '$lib/components/Ecosystems.svelte';
  import CallToAction from '$lib/components/CallToAction.svelte';
  import Testimonials from '$lib/components/Testimonials.svelte';
</script>

<svelte:head>
  <title>Colosseum</title>
</svelte:head>

<div>
  <Hero />
  <VideoPlayer />
  <CountdownTimer />
  <Achievements />
  <Ecosystems />
  <CallToAction />
  <Testimonials />
</div>

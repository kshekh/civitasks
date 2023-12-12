<script>
  import { onMount } from 'svelte';
  import Link from '$lib/components/Link.svelte';
  import Element from '$lib/components/Element.svelte';

  let countdownTo = '2024-01-09 23:59:59';
  let now;
  let distance;
  let days = '00';
  let hours = '00';
  let minutes = '00';
  let seconds = '00';

  onMount(() => {
    const countdownToDate = new Date(countdownTo).getTime();
    const interval = setInterval(() => {
      now = new Date().getTime();
      distance = countdownToDate - now;
      days = String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(
        2,
        '0',
      );
      hours = String(
        Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      ).padStart(2, '0');
      minutes = String(
        Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      ).padStart(2, '0');
      seconds = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(
        2,
        '0',
      );
      if (distance < 0) {
        clearInterval(interval);
        days = hours = minutes = seconds = '00';
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  });
</script>

<section>
  <div
    class="bg-grid-2 mb-56 bg-[size:175%] bg-center bg-no-repeat text-center text-gray-1 md:mb-44 md:bg-contain"
  >
    <div
      class="mb-8 flex items-center justify-center gap-4 text-center font-nb-architekt text-5xl uppercase md:mb-12 md:gap-12"
    >
      <!-- days -->
      <div>
        <p class="flex flex-col items-center">
          {days}<br /><span class="text-base text-gray-2">days</span>
        </p>
      </div>
      <div>
        <Element class="hidden -translate-y-2 md:block" name="timer-bar" />
        <span class="block -translate-y-4 text-gray-400 md:hidden">:</span>
      </div>
      <!-- hours -->
      <div>
        <p class="flex flex-col items-center">
          {hours}<br /><span class="text-base text-gray-2">hours</span>
        </p>
      </div>
      <div>
        <Element class="hidden -translate-y-2 md:block" name="timer-bar" />
        <span class="block -translate-y-4 text-gray-400 md:hidden">:</span>
      </div>
      <!-- minutes -->
      <div>
        <p class="flex flex-col items-center">
          {minutes}<br /><span class="text-base text-gray-2">mins</span>
        </p>
      </div>
      <div class="hidden md:block">
        <Element class="hidden -translate-y-2 md:block" name="timer-bar" />
        <span class="block -translate-y-4 text-gray-400 md:hidden">:</span>
      </div>
      <!-- seconds -->
      <div class="hidden md:block">
        <p class="flex flex-col items-center">
          {seconds}<br /><span class="text-base text-gray-2">secs</span>
        </p>
      </div>
    </div>
    <div
      class="before:content-plus-detail-2 xl:after:content-trophy relative before:absolute before:-bottom-32 before:left-0 before:right-0 xl:before:bottom-0 xl:before:left-20 xl:before:right-auto xl:after:absolute xl:after:-top-14 xl:after:right-44"
    >
      <h2
        class="mx-auto my-12 max-w-xs font-tasa-orbiter-display text-3xl font-medium md:max-w-lg md:text-4xl"
      >
        Colosseum’s next Hackathon starts on January 10, 2024.
      </h2>
      <Link linkTo="#/" theme="default" placement="">Sign Up</Link>
    </div>
  </div>
</section>

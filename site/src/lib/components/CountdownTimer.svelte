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
    class="bg-grid-2 bg-[size:250%] text-gray-1 mb-[4.5rem] bg-[position:50%_-10%] bg-no-repeat py-4 text-center md:mb-44 md:bg-cover md:bg-[position:50%_80%] md:py-8"
  >
    <div
      class="font-nb-architekt mb-8 flex items-center justify-center gap-4 text-center text-5xl uppercase md:mb-12 md:gap-12"
    >
      <!-- days -->
      <div>
        <p class="flex flex-col items-center">
          {days}<br /><span class="text-gray-2 text-base">days</span>
        </p>
      </div>
      <div>
        <Element class="hidden -translate-y-2 md:block" name="timer-bar" />
        <span class="block -translate-y-4 text-gray-400 md:hidden">:</span>
      </div>
      <!-- hours -->
      <div>
        <p class="flex flex-col items-center">
          {hours}<br /><span class="text-gray-2 text-base">hours</span>
        </p>
      </div>
      <div>
        <Element class="hidden -translate-y-2 md:block" name="timer-bar" />
        <span class="block -translate-y-4 text-gray-400 md:hidden">:</span>
      </div>
      <!-- minutes -->
      <div>
        <p class="flex flex-col items-center">
          {minutes}<br /><span class="text-gray-2 text-base">mins</span>
        </p>
      </div>
      <div class="hidden md:block">
        <Element class="hidden -translate-y-2 md:block" name="timer-bar" />
        <span class="block -translate-y-4 text-gray-400 md:hidden">:</span>
      </div>
      <!-- seconds -->
      <div class="hidden md:block">
        <p class="flex flex-col items-center">
          {seconds}<br /><span class="text-gray-2 text-base">secs</span>
        </p>
      </div>
    </div>
    <div
      class="xl:before:content-plus-detail-2 xl:after:content-trophy relative xl:before:absolute xl:before:bottom-0 xl:before:left-20 xl:before:right-auto xl:after:absolute xl:after:-top-14 xl:after:right-44"
    >
      <h2
        class="font-tasa-orbiter-display mx-auto mb-9 mt-10 max-w-xs text-3xl font-medium md:my-12 md:max-w-lg md:text-[2.5rem] md:leading-[3rem]"
      >
        Colosseum’s next Hackathon starts on January 10, 2024.
      </h2>
      <div class="mb-[3.25rem]">
        <Link linkTo="#/" theme="default" placement="">Sign Up</Link>
      </div>
      <Element class="mx-auto xl:hidden" name="plus-detail-2" />
    </div>
  </div>
</section>

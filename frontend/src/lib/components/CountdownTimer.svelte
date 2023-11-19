<script>
  import { onMount } from 'svelte';
  import Link from '$lib/components/Link.svelte';

  let countDownDate;
  let now;
  let distance;
  let days = '00';
  let hours = '00';
  let minutes = '00';
  let seconds = '00';

  onMount(() => {
    countDownDate = new Date('2024-01-09 23:59:59').getTime();
    const interval = setInterval(() => {
      now = new Date().getTime();
      distance = countDownDate - now;
      days = String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(
        2,
        '0'
      );
      hours = String(
        Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      ).padStart(2, '0');
      minutes = String(
        Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      ).padStart(2, '0');
      seconds = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(
        2,
        '0'
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
  <!-- TODO: add icons -->
  <div class="text-center mb-56 md:mb-40">
    <div
      class="font-nb-architekt flex items-center justify-center gap-8 md:gap-12 mb-8 md:mb-12 text-5xl uppercase text-center"
    >
      <!-- days -->
      <div>
        <p class="flex flex-col items-center">
          {days}<br /><span class="text-base">days</span>
        </p>
      </div>
      <div>
        <img
          class="hidden md:block -translate-y-2"
          src="/element-timer-bar.svg"
          alt=""
        />
        <span class="block md:hidden -translate-y-4">:</span>
      </div>
      <!-- hours -->
      <div>
        <p class="flex flex-col items-center">
          {hours}<br /><span class="text-base">hours</span>
        </p>
      </div>
      <div>
        <img
          class="hidden md:block -translate-y-2"
          src="/element-timer-bar.svg"
          alt=""
        />
        <span class="block md:hidden -translate-y-4">:</span>
      </div>
      <!-- minutes -->
      <div>
        <p class="flex flex-col items-center">
          {minutes}<br /><span class="text-base">mins</span>
        </p>
      </div>
      <div class="hidden md:block">
        <img
          class="hidden md:block -translate-y-2"
          src="/element-timer-bar.svg"
          alt=""
        />
        <span class="block md:hidden -translate-y-4">:</span>
      </div>
      <!-- seconds -->
      <div class="hidden md:block">
        <p class="flex flex-col items-center">
          {seconds}<br /><span class="text-base">secs</span>
        </p>
      </div>
    </div>
    <div class="max-w-xs md:max-w-lg mx-auto">
      <h2
        class="font-tasa-orbiter-display font-semibold text-3xl md:text-4xl mb-8"
      >
        Colosseum’s next Hackathon starts on January 10, 2024.
      </h2>
      <Link linkTo="/signup" theme="default">Sign Up</Link>
    </div>
  </div>
</section>

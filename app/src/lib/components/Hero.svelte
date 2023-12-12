<script>
  import Link from '$lib/components/Link.svelte';
  import Icon from '$lib/components/Icon.svelte';
</script>

<section>
  <div
    class="bg-grid-2 relative bg-[size:250%] bg-[50%_-50%] bg-no-repeat px-6 pt-14 text-center font-tasa-orbiter-display md:bg-contain md:bg-[50%_-44%] md:pt-32"
  >
    <div class="">
      <h1
        class="mb-10 text-6xl font-semibold uppercase text-gray-1 md:mb-3 md:text-9xl md:font-bold"
      >
        Enter the Arena
      </h1>
      <div class="mx-auto mb-10 max-w-[938px] text-base md:mb-14 md:text-lg">
        <p class="text-gray-2">
          Claim your place in the next generation of Solana hackathons.<br
            class="hidden [@media(min-width:850px)]:block"
          />
          Win and join Colosseum's accelerator program where you'll receive mentorship
          from ecosystem founders,<br
            class="hidden [@media(min-width:850px)]:block"
          />
          and grow your start-up with funding from Colosseum and other top investors.
        </p>
      </div>
    </div>
    <div class="mb-2 flex items-center justify-center gap-4 md:mb-16">
      <div>
        <Link linkTo="#/" theme="green" placement="">Sign Up</Link>
      </div>
      <div>
        <Link linkTo="#/" theme="default" placement="">Sign In</Link>
      </div>
    </div>
    <!-- add icons over image -->
    <div class="mx-auto max-w-4xl 2xl:max-w-full">
      <img
        class="pointer-events-none translate-x-3.5 select-none md:translate-x-7 2xl:ml-3 2xl:translate-x-64"
        src="/images/illustrations/illustration-1.png"
        alt=""
      />
    </div>
    <Icon
      class="pointer-events-none absolute left-1/4 top-[44%] hidden select-none xl:block"
      name="trophy"
    />
    <Icon
      class="pointer-events-none absolute bottom-[28%] left-[42%] hidden select-none xl:block"
      name="solana"
    />
    <Icon
      class="pointer-events-none absolute right-[33%] top-[51%] hidden select-none xl:block"
      name="diamond"
    />
    <Icon
      class="pointer-events-none absolute right-[22%] top-[40%] hidden select-none xl:block"
      name="code"
    />
  </div>
</section>

<script>
  import Link from '$lib/components/Link.svelte';
</script>

<section>
  <div
    class="md:bg-grid-1 mx-auto mb-32 grid max-w-7xl items-center px-6 font-tasa-orbiter-display text-lg md:mb-64 md:grid-cols-2 md:bg-[size:66%] md:bg-[position:25%_150%] md:bg-no-repeat"
  >
    <div
      class="bg-illustration-3 relative z-10 flex flex-col gap-10 bg-contain md:bg-center bg-no-repeat pt-[19.5rem] mt-12 md:mt-0 md:bg-none md:pt-0"
    >
      <h2 class="text-5xl leading-[3.5rem] md:leading-[6.5rem] font-semibold uppercase text-gray-1 md:text-8xl">
        Join Colosseum's Community
      </h2>
      <p class="max-w-xl text-base text-gray-2 md:text-lg">
        Colosseum runs 3 online hackathons per year, each followed by an
        Accelerator cohort. Sign up for a Colosseum account, create a builder
        profile, search the directory to find cofounders, and jam on product
        ideas in the forum before the next Hackathon.
      </p>
      <div class="flex items-center gap-4">
        <div>
          <Link linkTo="#/" theme="green" placement="">Sign Up</Link>
        </div>
        <div>
          <Link linkTo="#/" theme="" placement="">Sign In</Link>
        </div>
      </div>
    </div>
    <div class="hidden md:block">
      <img
        class="mx-auto"
        src="/images/illustrations/illustration-3.png"
        alt=""
      />
    </div>
  </div>
</section>

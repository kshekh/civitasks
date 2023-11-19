<script>
  import Link from '$lib/components/Link.svelte';
</script>

<section>
  <div
    class="px-6 grid md:grid-cols-2 items-center max-w-7xl mx-auto font-tasa-orbiter-display text-lg mb-72"
  >
    <div
      class="flex flex-col gap-10 relative z-10 bg-[url(/image-person-two.png)] bg-no-repeat bg-center bg-contain pt-[500px] md:bg-none md:pt-0"
    >
      <h2 class="text-5xl md:text-8xl uppercase font-bold">
        Join Colosseum's Community
      </h2>
      <p class="max-w-xl">
        Colosseum runs 3 online hackathons per year, each followed by an
        Accelerator cohort. Sign up for a Colosseum account, create a builder
        profile, search the directory to find cofounders, and jam on product
        ideas in the forum before the next Hackathon.
      </p>
      <div class="flex items-center gap-4">
        <div>
          <Link linkTo="/signup" theme="green">Sign Up</Link>
        </div>
        <div>
          <Link linkTo="/signin" theme="default">Sign In</Link>
        </div>
      </div>
    </div>
    <div class="hidden md:block">
      <img class="mx-auto" src="/image-person-two.png" alt="" />
    </div>
  </div>
</section>

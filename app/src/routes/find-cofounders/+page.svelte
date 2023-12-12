<script>
  import Link from '$lib/components/Link.svelte';
  import FeaturesList from '$lib/components/FeaturesList.svelte';

  import { data } from '$lib/data.js';
  const { platformFeatures } = data;
</script>

<main>
  <div class="font-tasa-orbiter-display">
    <!-- hero -->
    <section>
      <div
        class="bg-grid-2 before:content-illustration-10 after:content-illustration-11 relative isolate mb-4 min-h-[85vh] bg-[size:250%] bg-top bg-no-repeat px-4 pt-14 text-center leading-tight before:absolute before:left-0 before:top-0 before:-z-10 before:origin-top-left before:scale-50 after:absolute after:bottom-0 after:right-0 after:-z-10 after:origin-bottom-right after:scale-50 sm:bg-[size:200%] sm:before:scale-75 sm:after:scale-75 md:mb-16 md:bg-contain md:pt-28 md:before:scale-100 md:after:scale-100"
      >
        <h1
          class="mx-auto mb-10 text-[40px] font-semibold uppercase text-gray-1 md:max-w-5xl md:text-[88px] md:font-bold md:leading-none"
        >
          Find cofounders, jam on product ideas, and join our hackathon
        </h1>
        <div
          class="mx-auto mb-12 max-w-xs space-y-6 font-medium text-gray-2 sm:max-w-[810px] md:text-lg"
        >
          <p>
            Colosseum hosts 3 online hackathons per year, and each Hackathon
            runs for 5 weeks. Builders can sign up for a free Colosseum account,
            create a profile, search the directory to find co-founders, and
            compete for the next Hackathon, as well as share and discuss product
            ideas in the forum.
          </p>
          <p>
            There is an active community of crypto developers and investors
            already on the platform, so sign up today!
          </p>
        </div>
        <div class="flex items-center justify-center gap-4">
          <div>
            <Link linkTo="#/" theme="green" placement="">Sign Up</Link>
          </div>
          <div>
            <Link linkTo="#/" theme="default" placement="">Sign In</Link>
          </div>
        </div>
      </div>
    </section>

    <!-- Colosseum’s platform features -->
    <section>
      <div class="px-6 md:mb-32">
        <div class="mb-10 text-center sm:mx-auto sm:max-w-[700px] md:mb-16">
          <h2 class="mb-4 text-[40px] font-semibold leading-tight text-gray-1">
            Colosseum’s platform features
          </h2>
          <p class="text-gray-2 md:text-lg">
            50,000+ participants from across the world have competed in Solana
            hackathons, built thousands of crypto products, and raised millions
            in funding from the best investors in crypto.
          </p>
        </div>
        <div class="flex items-center justify-between">
          <div class="hidden md:block">
            <img src="/images/illustrations/illustration-4.png" alt="" />
          </div>
          <div class="w-full flex-1">
            {#if platformFeatures.length > 0}
              <ul class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <FeaturesList features={platformFeatures} />
              </ul>
            {:else}
              <p>No features to display.</p>
            {/if}
          </div>
          <div class="hidden md:block">
            <img src="/images/illustrations/illustration-5.png" alt="" />
          </div>
        </div>
      </div>
    </section>
  </div>
</main>

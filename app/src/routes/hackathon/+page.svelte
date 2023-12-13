<script>
  import Link from '$lib/components/Link.svelte';
  import ImageBox from '$lib/components/ImageBox.svelte';
  import FaqsList from '$lib/components/FaqsList.svelte';
  import Element from '$lib/components/Element.svelte';

  import { data } from '$lib/data.js';
  const hackathonFaqs = data.faqs.hackathon;
  const investors = data.investors;
</script>

<svelte:head>
  <title>Hackathon - Colosseum</title>
</svelte:head>

<main>
  <div class="font-tasa-orbiter-display">
    <!-- hero -->
    <section>
      <div
        class="bg-illustration-6 bg-[size:22rem] sm:bg-[size:35rem] mx-auto mb-10 flex min-h-[45rem] max-w-6xl flex-col justify-center bg-[position:50%_-1rem] bg-no-repeat px-4 pt-40 text-center md:mb-8 md:min-h-[50rem] md:justify-center md:bg-contain md:bg-top md:pt-0"
      >
        <div>
          <h1
            class="text-gray-1 mb-10 text-5xl font-semibold uppercase leading-tight md:mb-2 md:text-[88px] md:font-bold md:leading-[6rem]"
          >
            Where Crypto Founders Start their Journey
          </h1>
          <p
            class="text-gray-2 mb-10 text-base font-medium md:mx-auto md:max-w-4xl md:text-lg"
          >
            Colosseum Hackathons are not traditional hackathons. They are
            global, online competitions where the most talented developers and
            founders sprint for 6 weeks to launch new startups on Solana.
            Winners have a chance to join our Accelerator and raise pre-seed
            funding from Colosseum, as well as crypto’s leading investors.
          </p>
          <div class="mb-2 flex items-center justify-center gap-4 md:mb-16">
            <div>
              <Link linkTo="#/" theme="green" placement="">Sign Up</Link>
            </div>
            <div>
              <Link linkTo="#/" theme="default" placement="">Sign In</Link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- investors -->
    <section>
      <div class="mx-auto mb-10 max-w-6xl px-6 text-center md:mb-36">
        <div class="relative mb-8 md:mx-auto md:mb-16 md:max-w-[680px]">
          <Element
            class="ms-auto static mb-8 md:-bottom-10 md:-right-60 xl:absolute"
            name="plus-detail-2"
          />
          <h2
            class="text-gray-1 mb-4 text-4xl font-semibold md:text-[64px] md:leading-[4.5rem]"
          >
            Over $650 million Raised in the Past 2 Years
          </h2>
          <p class="text-gray-2 font-medium md:mx-auto md:max-w-lg md:text-lg">
            50,000+ participants from across the world have competed in Solana
            hackathons, built thousands of crypto products, and raised funding
            from the best investors in crypto.
          </p>
        </div>
        <div class="mb-6">
          <ul
            class="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
          >
            {#each investors as investorItem}
              <li>
                <ImageBox item={investorItem} />
              </li>
            {/each}
          </ul>
        </div>
        <Element
          class="mx-auto hidden scale-125 opacity-75 md:block"
          name="glitch-1"
        />
      </div>
    </section>

    <!-- call to action -->
    <section>
      <div
        class="font-tasa-orbiter-display mx-auto mb-32 grid max-w-7xl items-center px-6 text-lg md:mb-64 md:grid-cols-2"
      >
        <div
          class="bg-illustration-3 relative z-10 flex flex-col gap-10 bg-contain bg-center bg-no-repeat pt-64 md:bg-none md:pt-0"
        >
          <h2 class=" text-gray-1 text-5xl font-semibold uppercase md:text-8xl">
            Join Colosseum's Community
          </h2>
          <p class="text-gray-2 max-w-xl text-base font-medium md:text-lg">
            To grow the crypto economy, Colosseum runs 3 online hackathons, each
            followed by an Accelerator cohort. Many builders have participated
            and iterated in multiple Solana hackathons before winning. Sign up
            for a Colosseum account, create a builder profile, search the
            directory to find co-founders, and jam on product ideas in the forum
            before the next Hackathon.
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

    <!-- contact -->
    <section>
      <div class="relative isolate mx-auto mb-20 max-w-6xl px-6 md:mb-40">
        <Element
          class="stativ -z-10 mb-8 md:absolute md:-bottom-20 md:left-60 lg:-bottom-20 lg:left-72"
          name="globe"
        />
        <div class="md:mb-4 md:grid md:grid-cols-2 md:gap-x-36">
          <h2 class="text-gray-1 mb-8 text-4xl font-semibold md:text-6xl">
            Interested in Sponsoring the Hackathon?
          </h2>
          <p class="text-gray-2 mb-6 font-medium md:text-lg">
            Colosseum collaborates with the Solana community to ensure the
            entire ecosystem is involved in our Hackathons. We work with top
            crypto investors and companies who volunteer to judge and
            contribute. We’ve also partnered with sponsors like Google, Stripe,
            Microsoft, Coinbase, Amazon Web Services, and a diversity of Solana
            ecosystem companies to provide builders the smoothest hackathon
            experience possible.
          </p>
        </div>
        <div class="md:grid md:grid-cols-2 md:gap-x-36">
          <div class="md:col-start-2">
            <Link linkTo="#/" theme="gray" placement="">Get in touch</Link>
          </div>
        </div>
      </div>
    </section>

    <!-- Faqs -->
    <section>
      <div
        class="bg-grid-2 mx-auto mb-6 max-w-6xl bg-top bg-no-repeat md:mb-44"
      >
        <FaqsList faqItems={hackathonFaqs} />
      </div>
    </section>
  </div>
</main>

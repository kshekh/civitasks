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

<div class="font-tasa-orbiter-display">
  <!-- hero -->
  <section>
    <div
      class="bg-illustration-6-m sm:bg-illustration-6 bg-[size:22rem] sm:bg-[size:35rem] mx-auto mb-10 flex min-h-[45rem] max-w-6xl flex-col justify-center bg-[position:50%_-1rem] bg-no-repeat px-4 pt-40 text-center md:mb-8 md:min-h-[50rem] md:justify-center md:bg-contain md:bg-top md:pt-0"
    >
      <div>
        <h1
          class="text-gray-1 mb-10 text-5xl font-semibold uppercase leading-[3.5rem] md:mb-2 md:text-[5.5rem] md:font-bold md:leading-[6rem]"
        >
          Where Crypto Founders Start their Journey
        </h1>
        <p
          class="text-gray-2 mb-12 text-base md:mx-auto md:max-w-4xl md:text-lg"
        >
          Colosseum Hackathons are not traditional hackathons.<br
            class="hidden [@media(min-width:850px)]:block"
          />
          They are global, online competitions where the most talented developers
          and founders sprint over multiple weeks to build a real product, and design
          a scalable business model.
        </p>
        <div class="flex items-center justify-center gap-4 md:mb-16">
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
          class="text-gray-1 mb-4 text-[2.5rem] font-semibold leading-[3rem] md:text-[4rem] md:leading-[4.5rem]"
        >
          Over $650 million Raised in the Past 2 Years
        </h2>
        <p class="text-gray-2 text-base md:mx-auto md:max-w-lg md:text-lg">
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
      class="font-tasa-orbiter-display md:bg-grid-1 md:bg-[size:66%] mx-auto mb-20 grid max-w-7xl items-center px-6 text-lg md:mb-[11rem] md:grid-cols-2 md:bg-[position:25%_150%] md:bg-no-repeat"
    >
      <div
        class="bg-illustration-3 relative z-10 mt-12 bg-contain bg-no-repeat pt-[19.5rem] md:mt-0 md:bg-none md:bg-center md:pt-0"
      >
        <div
          class="bg-grid-1 bg-[size:40rem] flex flex-col gap-10 bg-[position:50%_3rem] bg-no-repeat md:bg-none"
        >
          <h2
            class=" text-gray-1 text-5xl font-semibold uppercase leading-[3.5rem] md:text-[5.5rem] md:leading-[6rem]"
          >
            Join Colosseum's Community
          </h2>
          <p class="text-gray-2 max-w-xl text-base md:text-lg">
            To grow the crypto economy, Colosseum runs 3 online hackathons, each
            followed by an Accelerator cohort. Many builders have participated
            in multiple Solana hackathons before winning. Sign up for a
            Colosseum account, create a builder profile, search the directory to
            find co-founders, and jam on product ideas in the forum before the
            next Hackathon.
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
    <div class="relative isolate mx-auto mb-24 max-w-6xl px-6 md:mb-[11rem]">
      <Element
        class="static -z-10 mb-8 md:absolute md:-bottom-20 md:left-60 lg:-bottom-[6rem] lg:left-72"
        name="globe"
      />
      <div class="md:mb-4 md:grid md:grid-cols-2 md:gap-x-36">
        <h2
          class="text-gray-1 mb-8 text-4xl font-medium md:text-[4rem] md:leading-[4.5rem]"
        >
          Interested in Sponsoring the Hackathon?
        </h2>
        <p class="text-gray-2 mb-8 md:text-lg">
          Colosseum collaborates with the Solana community to ensure the entire
          ecosystem is involved in our Hackathons. We work with top crypto
          investors and companies who volunteer to judge and contribute. We’ve
          also partnered with sponsors like Google, Stripe, Microsoft, Coinbase,
          Amazon Web Services, and a diversity of Solana ecosystem companies to
          provide builders the smoothest experience possible.
        </p>
      </div>
      <div class="md:-mt-6 md:grid md:grid-cols-2 md:gap-x-36">
        <div class="md:col-start-2">
          <Link linkTo="#/" theme="gray" placement="">Get in touch</Link>
        </div>
      </div>
    </div>
  </section>

  <!-- Faqs -->
  <section>
    <div class="bg-grid-2 mx-auto mb-6 max-w-6xl bg-top bg-no-repeat md:mb-44">
      <FaqsList faqItems={hackathonFaqs} />
    </div>
  </section>
</div>

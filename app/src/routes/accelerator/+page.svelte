<script>
  import FaqsList from '$lib/components/FaqsList.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import Link from '$lib/components/Link.svelte';

  import { data } from '$lib/data.js';
  const acceleratorFaqs = data.faqs.accelerator;
</script>

<main>
  <div class="font-tasa-orbiter-display">
    <!-- hero -->
    <section>
      <div
        class="md:bg-grid-2 mx-auto mb-16 max-w-[77rem] px-6 md:mb-40 md:bg-cover md:bg-top md:bg-no-repeat"
      >
        <div
          class="lg:bg-illustration-7 lg:bg-[size:37rem] lg:h-px lg:min-h-[38.5rem] lg:bg-left lg:bg-no-repeat lg:pt-[8rem]"
        >
          <div
            class="bg-grid-1 bg-[size:175%] sm:bg-[size:125%] bg-top bg-no-repeat md:bg-none"
          >
            <div class="mx-auto mb-10 lg:hidden">
              <img src="/images/illustrations/illustration-7.png" alt="" />
            </div>
            <div
              class="grid grid-cols-1 lg:h-full lg:grid-cols-2 lg:items-center"
            >
              <h1
                class="text-gray-1 lg:ps-4 mb-4 text-5xl font-semibold uppercase md:text-[88px] md:font-bold md:leading-[6rem] lg:self-start"
              >
                From Devnet to Mainnet
              </h1>
              <div
                class="text-gray-2 lg:ms-auto space-y-6 font-medium md:text-lg lg:max-w-md"
              >
                <p>
                  Colosseum’s Accelerator is a 6-week, online program designed
                  to help Hackathon winners become embedded in the Solana
                  ecosystem, rapidly iterate to find product-market fit, and
                  raise a seed funding round faster. The program includes access
                  to an elite founder community, intros to VCs and developers
                  who can provide mentorship, weekly educational sessions on
                  every aspect of launching a crypto startup, and a pre-seed
                  investment from Colosseum
                </p>
                <p>
                  In order to be considered for the program, founders are
                  required to participate and be selected as a winner or
                  honorable mention in a Colosseum Hackathon. We run 3
                  Hackathons per year, each followed by an Accelerator cohort.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Colosseum’s Standard Investment -->
    <section>
      <div
        class="lg:after:content-plus-detail-1 relative mx-auto mb-24 max-w-6xl px-6 md:mb-44 lg:after:absolute lg:after:-bottom-20 lg:after:right-40"
      >
        <div
          class="grid grid-cols-1 gap-16 md:grid-cols-2 md:items-center md:gap-0"
        >
          <div>
            <Icon class="mb-8" name="bank" />
            <h2
              class="text-gray-1 mb-8 text-3xl font-semibold md:text-[40px] md:leading-tight"
            >
              Colosseum’s Standard Investment
            </h2>
            <div class="text-gray-2 space-y-8 md:text-lg">
              <p>
                Colosseum invests $250,000 in every startup accepted into the
                Accelerator on founder-friendly terms.
              </p>
              <p>
                Colosseum’s support doesn’t end once founders raise a pre-seed
                round and graduate from the Accelerator. At Colosseum’s core is
                a community that Colosseum founders can rely on to guide them
                through their journey. Founders will continue to have access to
                the private groups and tools provided during the Accelerator
                program.
              </p>
            </div>
          </div>
          <div
            class="bg-grid-1 bg-[size:175%] sm:bg-[size:150%] lg:ms-auto lg:bg-[size:125%] flex h-full flex-col gap-20 bg-center text-center lg:w-fit lg:flex-row lg:items-center lg:gap-16"
          >
            <div class="mx-auto max-w-[200px]">
              <div
                class="after:content-glitch-2 relative isolate mx-auto w-fit after:absolute after:-bottom-4 after:-right-6 after:-z-10 after:opacity-75"
              >
                <Icon class="mx-auto mb-8" name="pie-chart" />
              </div>
              <p class="font-medium">
                We also include pro-rata rights in our investment.
              </p>
            </div>
            <div class="mx-auto max-w-[200px]">
              <div
                class="after:content-glitch-2 relative isolate mx-auto w-fit after:absolute after:-bottom-4 after:-right-6 after:-z-10 after:opacity-75"
              >
                <Icon class="mx-auto mb-8" name="bank-note" />
              </div>
              <p class="font-medium">
                The investment is made on a post-money SAFE/T in return for 7%
                ownership.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Colosseum Founder Referrals -->
    <section>
      <div class="mx-auto mb-28 max-w-6xl px-6 md:mb-36">
        <div
          class="grid grid-cols-1 gap-16 md:grid-cols-2 md:items-center md:gap-8"
        >
          <div class="md:order-last">
            <Icon class="mb-8" name="bank" />
            <h2
              class="text-gray-1 mb-8 text-3xl font-semibold md:text-[40px] md:leading-tight"
            >
              Colosseum Founder Referrals
            </h2>
            <div class="text-gray-2 space-y-8 md:text-lg">
              <p>
                In order to strengthen and grow Colosseum’s founder community,
                we plan to allocate a percentage of our fund’s carry to any
                Colosseum founder who refers another founder who competes in the
                Hackathon, is selected as a winner, and is admitted into the
                Accelerator program.
              </p>
              <p>More info on the referral program soon.</p>
            </div>
          </div>
          <div
            class="bg-grid-1 bg-[size:175%] sm:bg-[size:150%] lg:bg-[size:125%] flex h-full items-center bg-center"
          >
            <div class="mx-auto w-fit max-w-sm">
              <img src="/images/illustrations/illustration-8.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Colosseum Perks -->
    <section>
      <div class="mx-auto mb-36 max-w-6xl px-6 md:mb-56">
        <div
          class="grid grid-cols-1 gap-16 md:grid-cols-2 md:items-center md:gap-8"
        >
          <div>
            <Icon class="mb-8" name="stars" />
            <h2
              class="text-gray-1 mb-8 text-3xl font-semibold md:text-[40px] md:leading-tight"
            >
              Colosseum Perks
            </h2>
            <div class="text-gray-2 space-y-8 md:text-lg">
              <p>
                Founders accepted into the Accelerator program will receive a
                growing set of perks to help their startups get off the ground.
              </p>
              <p class="pb-12">Interested in offering a perk? Get in touch.</p>
              <Link linkTo="#/" theme="gray" placement="">Get in touch</Link>
            </div>
          </div>
          <div>
            <div
              class="bg-grid-1 after:content-globe bg-[size:175%] sm:bg-[size:150%] md:ms-auto lg:bg-[size:125%] relative isolate mx-auto w-fit max-w-sm bg-center after:absolute after:-bottom-24 after:-right-6 after:-z-10 md:mx-0 md:after:-bottom-28 md:after:-right-4"
            >
              <img src="/images/illustrations/illustration-9.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- faqs -->
    <section>
      <div class="bg-grid-2 mb-16 bg-top bg-no-repeat md:mb-40">
        <FaqsList faqItems={acceleratorFaqs} />
      </div>
    </section>
  </div>
</main>

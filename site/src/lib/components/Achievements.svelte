<script>
  let builders = 50_000;
  let productsLaunched = 3_200;
  let amountRaised = 650;

  import { formattedNumber } from '$lib/utils.js';
</script>

<section>
  <div class="px-6 text-center text-gray-1 md:mb-12">
    <div class="relative">
      <img
        class="mx-auto pt-40 md:pt-0"
        src="/images/illustrations/illustration-2.png"
        alt=""
      />
      <div
        class="absolute left-1/2 top-1/2 md:top-[40%] w-full max-w-3xl -translate-x-1/2 -translate-y-1/2"
      >
        <div class="mb-16 md:mb-20">
          <h2
            class="mx-auto max-w-2xl font-tasa-orbiter-display text-[2.5rem] leading-[3rem] font-medium md:text-[4rem] md:leading-[4.5rem]"
          >
            Colosseum powers the Solana Hackathon
          </h2>
        </div>

        <div>
          <ul
            class="md:gap-x-52 mb-32 grid items-center gap-y-10 font-nb-architekt uppercase md:mb-0 md:grid-cols-3 md:gap-y-0"
          >
            <li class="text-gray-2">
              <span class="text-5xl font-normal leading-[3.5rem]"
                >{formattedNumber(builders)}+<br /></span
              >builders
            </li>
            <li class="text-gray-2">
              <span class="text-5xl font-normal leading-[3.5rem]"
                >{formattedNumber(productsLaunched)}+<br /></span
              >products launched
            </li>
            <li class="text-gray-2">
              <span class="text-5xl font-normal leading-[3.5rem]">${amountRaised}M<br /></span
              >raised by winners
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

<script>
  import PersonsList from '$lib/components/PersonsList.svelte';
  import ImageBox from '$lib/components/ImageBox.svelte';
  import Link from '$lib/components/Link.svelte';
  import Element from '$lib/components/Element.svelte';
  import Icon from '$lib/components/Icon.svelte';

  import { personDetailsModalData, showMemberModal } from '$lib/stores';

  import { data } from '$lib/data.js';
  import { onMount } from 'svelte';
  const { teamMembers, networkMembers, investors } = data;

  let dialog;

  onMount(() => {
    dialog.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        dialog.close();
        $showMemberModal = false;
      }
    });

    dialog.addEventListener('click', (event) => {
      const dialogDimensions = dialog.getBoundingClientRect();
      if (
        event.clientX < dialogDimensions.left ||
        event.clientX > dialogDimensions.right ||
        event.clientY < dialogDimensions.top ||
        event.clientY > dialogDimensions.bottom
      ) {
        dialog.close();
        $showMemberModal = false;
      }
    });
  });

  const closeDialog = () => {
    dialog.close();
    $showMemberModal = false;
  };

  $: $showMemberModal ? dialog.showModal() : null;
</script>

<main>
  <div class="font-tasa-orbiter-display">
    <!-- hero -->
    <section>
      <div
        class="md:bg-grid-2 mx-auto mb-16 max-w-7xl px-6 md:mb-40 md:bg-cover md:bg-top md:bg-no-repeat"
      >
        <div
          class="lg:bg-illustration-12 lg:h-px lg:min-h-[80vh] lg:bg-contain lg:bg-[position:25%] lg:bg-no-repeat"
        >
          <div
            class="bg-grid-1 bg-[size:175%] bg-top bg-no-repeat sm:bg-[size:125%] md:bg-none"
          >
            <div class="mx-auto lg:hidden">
              <img src="/images/illustrations/illustration-12.png" alt="" />
            </div>
            <div
              class="grid grid-cols-1 lg:h-full lg:grid-cols-2 lg:items-center lg:gap-x-10"
            >
              <h1
                class="mb-4 text-5xl font-semibold uppercase text-gray-1 md:text-[88px] md:font-bold md:leading-[6rem] lg:mt-24 lg:self-start lg:ps-4"
              >
                The Growth Engine of the Crypto Economy
              </h1>
              <div
                class="max-w-xl space-y-6 font-medium text-gray-2 md:text-lg lg:mt-24"
              >
                <p>
                  Colosseum is an organization that seamlessly combines 3
                  pillars: A Hackathon, an Accelerator, and a Venture Fund.
                </p>
                <p>
                  Colosseum runs online hackathons in partnership with the
                  Solana Foundation and the broader ecosystem. We believe online
                  hackathons are the best mechanism for discovering and
                  attracting the world’s most talented developers and founders.
                  Our online, 6 week hackathon provides founding teams a level
                  playing field to showcase their potential to build a crypto
                  startup that will change the world.
                </p>
                <p>
                  The Accelerator is an online, 6 week program designed for
                  Hackathon winners to become embedded in the Solana ecosystem,
                  join an elite founder community, and receive 1:1 mentorship in
                  jumpstarting crypto startups.
                </p>
                <p>
                  After the Accelerator Demo Day, founders will receive a
                  standard $250,000 investment from Colosseum. Additionally, we
                  connect founders with top VCs, and will assist founders every
                  step of the way in filling out their seed round.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="bg-grid-2 bg-contain bg-[position:50%_20%] bg-no-repeat">
      <!-- team members -->
      <section>
        <div class="mb-20 sm:px-6 md:mb-40">
          <div class="mb-10 text-center md:mb-16">
            <Element
              class="mx-auto mb-10 w-fit xl:hidden"
              name="plus-detail-1"
            />
            <h2
              class="xl:before:content-plus-detail-1 relative mb-4 text-4xl font-semibold text-gray-1 xl:before:absolute xl:before:right-0 xl:before:top-0"
            >
              Colosseum’s Team
            </h2>
            <p class="text-gray-2 md:text-lg">
              We are operators, investors, and builders with over a decade of
              experience in crypto.
            </p>
          </div>
          <ul
            class="cols-1 mx-auto grid max-w-[296px] gap-6 sm:max-w-4xl sm:grid-cols-3"
          >
            <PersonsList personsList={teamMembers} />
          </ul>
        </div>
      </section>

      <!-- network members -->
      <section>
        <div class="mx-auto mb-20 max-w-6xl px-6 md:mb-36">
          <div class="mx-auto mb-10 max-w-xs text-center md:mb-16 md:max-w-md">
            <h2 class="mb-4 text-4xl font-semibold text-gray-1">
              Contributors, Mentors, and Founder Network
            </h2>
            <p class="text-gray-2 md:text-lg">
              Colosseum's network includes many best founders, developers, and
              investors in the Solana ecosystem.
            </p>
          </div>
          <ul
            class="cols-1 mx-auto grid max-w-[277px] gap-4 sm:max-w-none sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          >
            <PersonsList personsList={networkMembers} />
          </ul>
        </div>
      </section>
    </div>

    <!-- colosseum investors -->
    <section>
      <div class="mx-auto mb-20 max-w-6xl px-6 md:mb-32">
        <div class="mb-20 md:mb-16">
          <Element class="mb-8" name="plus-detail-1" />
          <div class="relative isolate flex items-center justify-between">
            <h2 class="max-w-3xl text-4xl font-medium md:text-5xl">
              Colosseum is Backed by the Best
            </h2>
            <Element
              class="absolute -bottom-1/2 right-0 -z-10 w-32 sm:bottom-1/2 sm:block sm:w-auto sm:translate-y-1/2"
              name="globe"
            />
          </div>
        </div>

        <div>
          <ul
            class="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
          >
            {#each investors as investor}
              <li>
                <ImageBox item={investor} />
              </li>
            {/each}
          </ul>
        </div>
      </div>
    </section>

    <section>
      <div
        class="mx-auto mb-16 flex max-w-6xl flex-col items-start gap-4 px-6 md:mb-32 lg:flex-row lg:items-center lg:justify-between"
      >
        <div>
          <h2 class="mb-4 text-[40px] font-semibold text-gray-1">Press</h2>
          <p class="text-gray-2">
            Click below to read about Colosseum in the media and access our
            brand kit.
          </p>
        </div>
        <Link linkTo="/press-and-brand" theme="gray" placement=""
          >Press & Brand Kit</Link
        >
      </div>
    </section>
  </div>

  <dialog
    class="w-full max-w-md outline-none backdrop:bg-gray-11 backdrop:bg-opacity-75"
    bind:this={dialog}
  >
    <div
      class="relative border border-gray-12 bg-gray-11 font-tasa-orbiter-display text-gray-2"
    >
      <div class="flex items-center justify-between p-4">
        <h4 class="font-nb-architekt text-lg">// About</h4>
        <span class="hidden opacity-25 md:block">░░░░░░░░░░░░░░░░░░</span>
        <button on:click={closeDialog}>
          <Icon name="close" />
        </button>
      </div>
      <div class="p-8">
        <div>
          <img
            class="mb-10"
            src={$personDetailsModalData.imageUrl}
            alt={$personDetailsModalData.name}
          />
          <div>
            <p class="text-2xl font-medium text-mint-1">
              {$personDetailsModalData.name}
            </p>
            <p class="text-lg">{$personDetailsModalData.designation}</p>
            {#if $personDetailsModalData.hasOwnProperty('platform')}
              <p>{$personDetailsModalData.platform}</p>
            {/if}
            {#if $personDetailsModalData.hasOwnProperty('description')}
              <p class="mt-8">{$personDetailsModalData.description}</p>
            {/if}
          </div>
        </div>
        <div>
          <div
            class="absolute left-0 top-0 aspect-square w-1 bg-gray-500"
          ></div>
          <div
            class="absolute right-0 top-0 aspect-square w-1 bg-gray-500"
          ></div>
          <div
            class="absolute bottom-0 left-0 aspect-square w-1 bg-gray-500"
          ></div>
          <div
            class="absolute bottom-0 right-0 aspect-square w-1 bg-gray-500"
          ></div>
        </div>
      </div>
    </div>
  </dialog>
</main>

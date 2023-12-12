<script>
  import { onMount } from 'svelte';
  import { slide } from 'svelte/transition';
  import Link from '$lib/components/Link.svelte';
  import Icon from '$lib/components/Icon.svelte';

  let showMobileNav = false;

  onMount(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');

    const handleWidthChange = (e) => {
      if (e.matches) {
        showMobileNav = false;
      }
    };

    mediaQuery.addEventListener('change', handleWidthChange);

    handleWidthChange(mediaQuery);

    return () => {
      mediaQuery.removeEventListener('change', handleWidthChange);
    };
  });
</script>

<header>
  <nav>
    <div class="font-base relative font-tasa-orbiter-display">
      <div class="flex items-center justify-between px-4 py-6">
        <div class="flex items-center gap-10">
          <a href="/" on:click={() => (showMobileNav = false)}
            ><img
              class="max-w-[144px] md:max-w-full"
              src="/images/logos/logo-colosseum.svg"
              alt="Colosseum logo"
            /></a
          >
          <div class="absolute left-0 right-0 top-[88px] z-10 md:static">
            <div class="relative">
              <ul
                class={`hidden w-full bg-gray-11 text-gray-3 md:flex md:w-auto md:flex-row md:items-center md:gap-8 md:p-0`}
              >
                <li>
                  <a
                    class="block transition-colors duration-300 ease-in-out focus-within:text-green-1 hover:text-green-1"
                    href="/hackathon">Hackathon</a
                  >
                </li>
                <li>
                  <a
                    class="block transition-colors duration-300 ease-in-out focus-within:text-green-1 hover:text-green-1"
                    href="/accelerator">Accelerator</a
                  >
                </li>
                <li>
                  <a
                    class="block transition-colors duration-300 ease-in-out focus-within:text-green-1 hover:text-green-1"
                    href="/find-cofounders">Find Cofounders</a
                  >
                </li>
                <li>
                  <a
                    class="block transition-colors duration-300 ease-in-out focus-within:text-green-1 hover:text-green-1"
                    href="/about">About</a
                  >
                </li>
              </ul>
              {#if showMobileNav}
                <ul
                  transition:slide
                  class={`${
                    showMobileNav ? 'flex' : 'hidden'
                  } w-full flex-col gap-8 border-y border-gray-7 bg-gray-11 p-6 text-gray-3`}
                >
                  <li>
                    <a
                      on:click={() => (showMobileNav = false)}
                      class="block transition-colors duration-300 ease-in-out focus-within:text-green-1 hover:text-green-1"
                      href="/hackathon">Hackathon</a
                    >
                  </li>
                  <li>
                    <a
                      on:click={() => (showMobileNav = false)}
                      class="block transition-colors duration-300 ease-in-out focus-within:text-green-1 hover:text-green-1"
                      href="/accelerator">Accelerator</a
                    >
                  </li>
                  <li>
                    <a
                      on:click={() => (showMobileNav = false)}
                      class="block transition-colors duration-300 ease-in-out focus-within:text-green-1 hover:text-green-1"
                      href="/find-cofounders">Find Cofounders</a
                    >
                  </li>
                  <li>
                    <a
                      on:click={() => (showMobileNav = false)}
                      class="block transition-colors duration-300 ease-in-out focus-within:text-green-1 hover:text-green-1"
                      href="/about">About</a
                    >
                  </li>
                </ul>
              {/if}
            </div>
            <div
              class={`${
                showMobileNav
                  ? 'absolute left-0 top-0 aspect-square w-1 bg-gray-500 md:hidden'
                  : ''
              }`}
            ></div>
            <div
              class={`${
                showMobileNav
                  ? 'absolute right-0 top-0 aspect-square w-1 bg-gray-500 md:hidden'
                  : ''
              }`}
            ></div>
            <div
              class={`${
                showMobileNav
                  ? 'absolute bottom-0 left-0 aspect-square w-1 bg-gray-500 md:hidden'
                  : ''
              }`}
            ></div>
            <div
              class={`${
                showMobileNav
                  ? 'absolute bottom-0 right-0 aspect-square w-1 bg-gray-500 md:hidden'
                  : ''
              }`}
            ></div>
          </div>
        </div>
        <div class="flex items-center">
          <Link linkTo="#/" theme="green" placement="header">Sign Up</Link>
          <button
            class="ml-2 md:hidden"
            on:click={() => {
              showMobileNav = !showMobileNav;
            }}
          >
            {#if showMobileNav}
              <Icon name="close" />
            {:else}
              <Icon name="hamburger" />
            {/if}
          </button>
        </div>
      </div>
    </div>
  </nav>
</header>

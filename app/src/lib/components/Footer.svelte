<script>
  import Icon from '$lib/components/Icon.svelte';
</script>

<footer>
  <div
    class="mx-auto flex max-w-6xl flex-col items-start justify-between gap-10 px-6 py-20 text-sm font-light text-gray-3 md:flex-row md:gap-0 md:pb-20 md:pt-36"
  >
    <div>
      <div class="mb-6 md:mb-20">
        <a href="/"
          ><img
            class="mb-2"
            src="/images/logos/logo-colosseum.svg"
            alt="Colosseum logo"
          /></a
        >
        <p>2023 Colosseum Org LLC &copy; All Rights Reserved</p>
      </div>
      <div class="flex items-center">
        <a href="#/"><Icon name="x" /></a>
        <a href="#/"><Icon name="discord" /></a>
        <a href="#/"><Icon name="linkedin" /></a>
      </div>
    </div>
    <div
      class="grid grid-cols-2 gap-x-6 gap-y-16 sm:grid-cols-4 md:gap-x-12 md:gap-y-0"
    >
      <div>
        <h2 class="mb-6 text-gray-5 md:mb-8">Programs</h2>
        <ul class="grid gap-4">
          <li>
            <a
              class="transition-colors duration-300 ease-in-out focus-within:text-green-1 hover:text-green-1"
              href="/hackathon">Hackathon</a
            >
          </li>
          <li>
            <a
              class="transition-colors duration-300 ease-in-out focus-within:text-green-1 hover:text-green-1"
              href="/accelerator">Accelerator</a
            >
          </li>
        </ul>
      </div>
      <div>
        <h2 class="mb-6 text-gray-5 md:mb-8">Get Started</h2>
        <ul class="grid gap-4">
          <li>
            <a
              class="transition-colors duration-300 ease-in-out focus-within:text-green-1 hover:text-green-1"
              href="#/">Join Colosseum</a
            >
          </li>
          <li>
            <a
              class="transition-colors duration-300 ease-in-out focus-within:text-green-1 hover:text-green-1"
              href="/find-cofounders">Find Cofounders</a
            >
          </li>
          <li>
            <a
              class="transition-colors duration-300 ease-in-out focus-within:text-green-1 hover:text-green-1"
              href="#/">Developer Resources</a
            >
          </li>
          <li>
            <a
              class="transition-colors duration-300 ease-in-out focus-within:text-green-1 hover:text-green-1"
              href="/blog">Blog</a
            >
          </li>
        </ul>
      </div>
      <div>
        <h2 class="mb-6 text-gray-5 md:mb-8">Organization</h2>
        <ul class="grid gap-4">
          <li>
            <a
              class="transition-colors duration-300 ease-in-out focus-within:text-green-1 hover:text-green-1"
              href="/about">About Colosseum</a
            >
          </li>
          <li>
            <a
              class="transition-colors duration-300 ease-in-out focus-within:text-green-1 hover:text-green-1"
              href="#/">Code of Ethics</a
            >
          </li>
          <li>
            <a
              class="transition-colors duration-300 ease-in-out focus-within:text-green-1 hover:text-green-1"
              href="/press-and-brand">Press & Brand</a
            >
          </li>
          <li>
            <a
              class="transition-colors duration-300 ease-in-out focus-within:text-green-1 hover:text-green-1"
              href="#/">Contact Us</a
            >
          </li>
        </ul>
      </div>
      <div>
        <h2 class="mb-6 text-gray-5 md:mb-8">Legal</h2>
        <ul class="grid gap-4">
          <li>
            <a
              class="transition-colors duration-300 ease-in-out focus-within:text-green-1 hover:text-green-1"
              href="#/">Disclosures</a
            >
          </li>
          <li>
            <a
              class="transition-colors duration-300 ease-in-out focus-within:text-green-1 hover:text-green-1"
              href="#/">Hackathon Rules</a
            >
          </li>
          <li>
            <a
              class="transition-colors duration-300 ease-in-out focus-within:text-green-1 hover:text-green-1"
              href="#/">Privacy Policy</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</footer>

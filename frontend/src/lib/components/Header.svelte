<script>
  import Link from '$lib/components/Link.svelte';
  let showNav = false;
</script>

<header>
  <nav>
    <div class="font-tasa-orbiter-display font-medium relative">
      <div class="px-4 py-6 flex items-center justify-between">
        <div class="flex items-center gap-10">
          <a href="/#"><img src="/logo-colosseum.svg" alt="Colosseum logo" /></a
          >
          <!-- TODO: add the four corner dots for mobile according to the design -->
          <ul
            class={`${
              showNav ? 'flex' : 'hidden'
            } flex-col absolute top-[88px] left-0 right-0 w-full p-6 md:p-0 bg-brand-black md:flex md:static md:w-auto md:flex-row md:items-center gap-8 md:gap-8`}
          >
            <li><a class="block" href="/#">Hackathon</a></li>
            <li><a class="block" href="/#">Accelerator</a></li>
            <li><a class="block" href="/#">Find Cofounders</a></li>
            <li><a class="block" href="/#">About</a></li>
          </ul>
        </div>
        <div class="flex items-center gap-2">
          <!-- TODO: Use font according to the design -->
          <Link linkTo="#" theme="green">Sign Up</Link>
          <button class="md:hidden" on:click={() => (showNav = !showNav)}
            ><img
              src={`${showNav ? '/close.svg' : '/hamburger.svg'}`}
              alt=""
            /></button
          >
        </div>
      </div>
    </div>
  </nav>
</header>

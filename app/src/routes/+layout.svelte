<script>
  import '../app.css';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
</script>

<div class="bg-gray-11 text-white">
  <div class="mx-auto max-w-[90rem]">
    <Header />
    <slot />
    <Footer />
  </div>
</div>

<script>
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<div class="bg-gray-11 text-white">
	<div class="max-w-[90rem] mx-auto">
		<Header />
		<slot />
		<Footer />
	</div>
</div>

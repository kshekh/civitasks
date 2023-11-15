<script>
	import SolanaLogo from '$icons/logos/SolanaLogo.svelte';
	import Corner from './Corner.svelte';
	import CountDown from './CountDown.svelte';
	import SkewedBars from './SkewedBars.svelte';
</script>

<div class=" relative">
	<div
		class="bg-center bg-cover w-full h-40 rounded relative flex flex-col items-center justify-center"
		style="background-image: url('/images/png/hyperdrive_landing.png');"
	>
		<Corner class="top-3.5 left-3.5" />
		<Corner class="top-3.5 right-3.5 rotate-90" />
		<Corner class="bottom-3.5 right-3.5 rotate-180" />
		<Corner class="bottom-3.5 left-3.5 -rotate-90" />
		<SolanaLogo class="w-12 sm:w-[70px]" />
		<div class="font-unbounded flex flex-col items-center justify-center">
			<h1
				class="text-2xl sm:text-4xl text-white leading-6 sm:leading-9 font-medium uppercase mt-1.5 sm:mt-2"
			>
				HYPERDRIVE
			</h1>
			<p
				class="text-[5px] sm:text-[7.5px] text-white font-bold text-center leading-[7px] sm:leading-[10.5px] tracking-[3px] sm:tracking-[4.5px] mt-1"
			>
				GLOBAL ONLINE HACKATHON
			</p>
		</div>
		<div class="absolute inset-0 flex items-center justify-between px-3.5">
			<SkewedBars />
			<SkewedBars />
		</div>
	</div>
	<div class="flex sm:absolute top-1 right-1 w-full sm:w-40">
		<CountDown />
	</div>
</div>

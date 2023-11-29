<script>
	import { onMount } from 'svelte';
	import Link from '$lib/components/Link.svelte';

	let countdownTo = '2024-01-09 23:59:59';
	let now;
	let distance;
	let days = '00';
	let hours = '00';
	let minutes = '00';
	let seconds = '00';

	onMount(() => {
		const countdownToDate = new Date(countdownTo).getTime();
		const interval = setInterval(() => {
			now = new Date().getTime();
			distance = countdownToDate - now;
			days = String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, '0');
			hours = String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(
				2,
				'0'
			);
			minutes = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
			seconds = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, '0');
			if (distance < 0) {
				clearInterval(interval);
				days = hours = minutes = seconds = '00';
			}
		}, 1000);
		return () => {
			clearInterval(interval);
		};
	});
</script>

<section>
	<div
		class="text-gray-1 text-center mb-56 md:mb-44 bg-[url('bg-grid-two.png')] bg-center bg-no-repeat bg-[size:175%] md:bg-contain"
	>
		<div
			class="font-nb-architekt flex items-center justify-center gap-4 md:gap-12 mb-8 md:mb-12 text-5xl uppercase text-center"
		>
			<!-- days -->
			<div>
				<p class="flex flex-col items-center">
					{days}<br /><span class="text-base text-gray-2">days</span>
				</p>
			</div>
			<div>
				<img class="hidden md:block -translate-y-2" src="/element-timer-bar.svg" alt="" />
				<span class="block md:hidden -translate-y-4 text-gray-400">:</span>
			</div>
			<!-- hours -->
			<div>
				<p class="flex flex-col items-center">
					{hours}<br /><span class="text-base text-gray-2">hours</span>
				</p>
			</div>
			<div>
				<img class="hidden md:block -translate-y-2" src="/element-timer-bar.svg" alt="" />
				<span class="block md:hidden -translate-y-4 text-gray-400">:</span>
			</div>
			<!-- minutes -->
			<div>
				<p class="flex flex-col items-center">
					{minutes}<br /><span class="text-base text-gray-2">mins</span>
				</p>
			</div>
			<div class="hidden md:block">
				<img class="hidden md:block -translate-y-2" src="/element-timer-bar.svg" alt="" />
				<span class="block md:hidden -translate-y-4 text-gray-400">:</span>
			</div>
			<!-- seconds -->
			<div class="hidden md:block">
				<p class="flex flex-col items-center">
					{seconds}<br /><span class="text-base text-gray-2">secs</span>
				</p>
			</div>
		</div>
		<div
			class="relative before:absolute before:content-[url(/element-plus-detail-two.svg)] before:-bottom-32 before:left-0 before:right-0 xl:before:bottom-0 xl:before:left-20 xl:before:right-auto xl:after:absolute xl:after:content-[url(/icon-trophy.svg)] xl:after:-top-14 xl:after:right-44"
		>
			<h2
				class="max-w-xs md:max-w-lg mx-auto font-tasa-orbiter-display font-medium text-3xl md:text-4xl my-12"
			>
				Colosseum’s next Hackathon starts on January 10, 2024.
			</h2>
			<Link linkTo="/#" theme="default" placement="">Sign Up</Link>
		</div>
	</div>
</section>

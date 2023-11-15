<script>
	import DotGrid from '$components/reusable/DotGrid.svelte';
	import { countdownTimer } from '$utils';
	import { hyperdriveDeadline } from '$utils/constants';
	$: countdown = countdownTimer(hyperdriveDeadline);
</script>

<div class="w-full px-1 py-0.5 rounded border-2 border-gray-dark-2 bg-gray-dark-2 font-architekt">
	<div class="w-full flex items-center gap-x-1.5 overflow-hidden">
		<DotGrid class="text-gray-dark-6" />
		<h2 class="font-architekt text-gray-dark-12 text-xs text-normal whitespace-nowrap">
			SUBMIT BY
		</h2>
		<DotGrid class="text-gray-dark-6" />
	</div>
	<div
		class="flex flex-row items-center justify-between gap-0.5 mt-1 text-xs text-gray-dark-12"
	>
		<div class="flex flex-col items-center flex-1">
			<div
				class="flex items-center justify-center rounded-sm border-t-2 border-gray-dark-4 bg-gray-dark-3 min-w-full min-h-[24px]"
			>
				<span
					>{$countdown.days && $countdown.days >= 10
						? $countdown?.days
						: `0${$countdown?.days ?? 0}`}</span
				>
			</div>
			<span class="mt-1 text-gray-dark-9">Days</span>
		</div>
		<div class="flex flex-col items-center flex-1">
			<div
				class="flex items-center justify-center rounded-sm border-t-2 border-gray-dark-4 bg-gray-dark-3 min-w-full min-h-[24px]"
			>
				<span
					>{$countdown.hours && $countdown.hours >= 10
						? $countdown?.hours
						: `0${$countdown?.hours ?? 0}`}</span
				>
			</div>
			<span class="mt-1 text-gray-dark-9">Hours</span>
		</div>
		<div class="flex flex-col items-center flex-1">
			<div
				class="flex items-center justify-center rounded-sm border-t-2 border-gray-dark-4 bg-gray-dark-3 min-w-full min-h-[24px]"
			>
				<span
					>{$countdown.minutes && $countdown.minutes >= 10
						? $countdown?.minutes
						: `0${$countdown?.minutes ?? 0}`}</span
				>
			</div>
			<span class="mt-1 text-gray-dark-9">Mins</span>
		</div>
	</div>
</div>

<script lang="ts">
	import CheckboxTickIcon from '$icons/CheckboxTickIcon.svelte';

	$: id = crypto.randomUUID();
	export let checked = false;
	export let name = '';
	export let label = '';
	export let description = '';
	export let disabled = false;
</script>

<label for={id} class="flex gap-x-2 cursor-pointer {description ? 'items-start' : 'items-center'}">
	<input type="checkbox" {disabled} {name} {id} bind:checked class="sr-only" />
	<div class="checkbox">
		<CheckboxTickIcon />
	</div>
	<div class="text-sm text-gray-dark-12 leading-4 font-normal">
		<p>{label}</p>
		<p class="text-gray-dark-11 mt-2xs">{description}</p>
	</div>
</label>

<style lang="postcss">
	.checkbox {
		@apply cursor-pointer w-5 h-5 border border-gray-dark-6 rounded flex items-center justify-center p-sm ring-[3px] ring-transparent text-transparent ml-[3px];
	}
	input[type='checkbox']:hover ~ .checkbox {
		@apply text-gray-dark-6;
	}
	input[type='checkbox']:focus ~ .checkbox {
		@apply text-gray-dark-6 border-mint-dark-8 ring-mint-dark-4;
	}
	input[type='checkbox']:disabled ~ .checkbox {
		@apply bg-gray-dark-3;
	}
	input[type='checkbox']:checked ~ .checkbox {
		@apply bg-mint-dark-3 border-mint-dark-8 text-mint-dark-11;
	}
	input[type='checkbox']:checked:hover ~ .checkbox {
		@apply bg-mint-dark-3 border-mint-dark-5 text-mint-dark-11;
	}
	input[type='checkbox']:checked:disabled ~ .checkbox {
		@apply bg-mint-dark-3 border-mint-dark-4 text-mint-dark-7;
	}
</style>

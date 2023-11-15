<script lang="ts">
	import CopyIcon from '$icons/CopyIcon.svelte';
	import { copyToClipBoard } from '$utils';
	import { toastCustom } from '$utils/toasts';
	import Button from './reusable/Button.svelte';
	import Modal from './reusable/Modal.svelte';
	import SlideOver from './reusable/SlideOver.svelte';

	export let showEmail = false;
	export let email: string;
</script>

<SlideOver title="Send a message" bind:slideOverOpen={showEmail} class="md:hidden">
	<p class="text-sm leading-4 text-gray-dark-12">
		We are building messaging functionality within the app. Meanwhile, yo can contact the user using
		their email.
	</p>
	<div class="w-full flex items-center gap-x-md p-md bg-mint-dark-2 rounded my-lg">
		<span class="flex-1 text-xs leading-4 text-mint-dark-11">{email}</span>
		<button
			on:click={() => {
				copyToClipBoard(email);
				toastCustom({
					position: 'bottom-center',
					informational: true,
					title: 'Email copied to clipboard.'
				});
			}}
		>
			<CopyIcon class="text-gray-dark-12 cursor-pointer" />
		</button>
	</div>
	<Button secondary size="md" class="w-full" on:click={() => (showEmail = false)}>DONE</Button>
</SlideOver>
<Modal title="Send a message" bind:modalOpen={showEmail} class="hidden md:block">
	<p class="text-sm leading-4 text-gray-dark-12">
		We are building messaging functionality within the app. Meanwhile, you can contact the user
		using their email.
	</p>
	<div class="w-full flex items-center gap-x-md p-md bg-mint-dark-2 rounded my-lg">
		<span class="flex-1 text-xs leading-4 text-mint-dark-11">{email}</span>
		<button
			on:click={() => {
				copyToClipBoard(email);
				toastCustom({
					position: 'bottom-center',
					informational: true,
					title: 'Email copied to clipboard.'
				});
			}}
		>
			<CopyIcon class="text-gray-dark-12 cursor-pointer" />
		</button>
	</div>
	<Button secondary size="md" class="w-full" on:click={() => (showEmail = false)}>DONE</Button>
</Modal>

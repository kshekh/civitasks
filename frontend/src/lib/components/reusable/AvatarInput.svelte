<script lang="ts">
	import CameraIcon from '$icons/CameraIcon.svelte';
	import CornerIcon from '$icons/CornerIcon.svelte';
	import EditSquaredIcon from '$icons/edit/EditSquaredIcon.svelte';

	export let avatar: FileList;
	$: id = crypto.randomUUID();
</script>

<div class="w-[88px] h-[88px] relative overflow-hidden rounded-3xs">
	<label
		for={id}
		class:avatar
		class="relative w-full h-full cursor-pointer flex items-center justify-center rounded-3xs overflow-hidden border border-dashed border-gray-dark-4"
	>
		<div class="absolute inset-0 corner-square">
			<CornerIcon class="absolute top-0 right-0" />
			<CornerIcon class="absolute bottom-0 left-0 rotate-180" />
		</div>
		<input {id} type="file" class="sr-only" accept="image/*" bind:files={avatar} />
		{#if avatar}
			<div
				class="icon icon-edit-squared rounded absolute z-10 bottom-2xs right-2xs p-2xs bg-gray-dark-13"
			>
				<EditSquaredIcon class="text-gray-dark-1 w-4 aspect-square" />
			</div>
		{:else}
			<div class="icon icon-camera rounded p-2xs">
				<CameraIcon class="text-gray-dark-12 w-4 aspect-square" />
			</div>
		{/if}
		{#if avatar}
			<img src={URL.createObjectURL(avatar?.[0])} alt="user-avatar" class="absolute inset-0" />
		{/if}
	</label>
</div>

<style lang="postcss">
	label:hover > .icon-camera,
	label:focus > .icon-camera {
		@apply bg-gray-dark-5;
	}
	label:hover > .icon-edit-squared,
	label:focus > .icon-edit-squared {
		@apply bg-gray-dark-12;
	}
	label:focus > .icon {
		@apply border border-mint-dark-8 ring-[3px] ring-mint-dark-4;
	}
	.avatar {
		@apply border-none;
	}
	.corner-square {
		@apply block;
	}
	.avatar > .corner-square {
		@apply hidden;
	}
</style>

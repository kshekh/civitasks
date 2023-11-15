<script lang="ts">
	// export let avatars=['ac']
</script>

<div class="flex items-center gap-x-2">
	<span class="text-xs leading-4 font-architekt text-gray-dark-11">6000+ participating</span>
</div>

<style>
	.avatar {
		@apply w-full h-full absolute overflow-hidden;

		-webkit-transform: rotate(30deg);
		-moz-transform: rotate(30deg);
		transform: rotate(30deg);
	}
	.avatar:after {
		@apply absolute inset-0;
		background-image: var(--avatar-url);
		content: '';
		-webkit-transform: rotate(45deg);
		-moz-transform: rotate(45deg);
		transform: rotate(45deg);
	}
</style>

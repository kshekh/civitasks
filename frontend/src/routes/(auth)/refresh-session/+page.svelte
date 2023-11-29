<script lang="ts">
	import Notification from '$components/reusable/Notification.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="min-w-screen min-h-screen flex items-center justify-center">
	<Notification informational description="Session invalid or expired, refreshing..." />
</div>

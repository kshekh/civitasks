<script>
  import FeatureCard from '$lib/components/FeatureCard.svelte';

  export let features;
</script>

{#each features as feature}
  <FeatureCard {feature} />
{/each}

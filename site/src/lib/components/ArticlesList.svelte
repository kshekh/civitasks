<script>
  import ArticleCard from "$lib/components/ArticleCard.svelte";

  export let articles;
</script>

{#if articles}
  {#each articles as article}
    <ArticleCard {article} />
  {/each}
{:else}
  <p>No articles found.</p>
{/if}

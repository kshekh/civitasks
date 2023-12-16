<script>
  import PersonCard from '$lib/components/PersonCard.svelte';

  export let personsList;
</script>

{#if personsList.length > 0}
  {#each personsList as teamMember}
    <PersonCard personDetails={teamMember} />
  {/each}
{:else}
  <p>No team members found.</p>
{/if}

<script>
  import { personDetailsModalData, showMemberModal } from '$lib/stores';

  export let personDetails;

  const handleDialog = () => {
    $personDetailsModalData = personDetails;
    $showMemberModal = true;
  };
</script>

{#if personDetails}
  <li>
    <a href="#/" on:click={handleDialog}>
      <div
        class="group relative rounded-lg border border-gray-8 bg-gray-11 p-6 font-tasa-orbiter-display transition-all duration-300 ease-in-out before:absolute before:inset-1 before:rounded-lg before:border before:border-gray-9 before:transition-all before:duration-300 before:ease-in-out hover:border-gray-7 hover:before:border-gray-8"
      >
        <div
          class="before:content-right-angle after:content-right-angle relative mb-6 before:absolute before:-bottom-4 before:-left-2 before:rotate-180 before:opacity-50 before:transition-all before:duration-300 before:ease-in-out after:absolute after:-right-2 after:-top-4 after:opacity-50 after:transition-all after:duration-300 after:ease-in-out group-hover:before:opacity-100 group-hover:after:opacity-100"
        >
          <img
            class="w-full"
            src={personDetails.imageUrl}
            alt={personDetails.name}
          />
        </div>
        <div>
          <h3 class="text-xl font-medium text-mint-1">{personDetails.name}</h3>
          <p class="text-gray-2">{personDetails.designation}</p>
          {#if personDetails.platform}
            <p class="font-medium text-gray-4">{personDetails.platform}</p>
          {/if}
        </div>
      </div>
    </a>
  </li>
{:else}
  <p>Team member not found.</p>
{/if}

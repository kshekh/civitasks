<script>
  export let theme;
  export let linkTo;
</script>

{#if theme === 'green'}
  <a
    class={`font-nb-architekt uppercase bg-brand-dark-green text-brand-light-green rounded-[4px] py-2 px-4 sm:py-4 sm:px-7`}
    href={linkTo}><slot /></a
  >
{/if}

{#if theme === 'default'}
  <a
    class={`font-nb-architekt uppercase bg-slate-100 text-gray-800 rounded-[4px] py-2 px-4 sm:py-4 sm:px-7`}
    href={linkTo}><slot /></a
  >
{/if}

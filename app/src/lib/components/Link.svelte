<script>
  export let theme;
  export let linkTo;
  export let placement;
</script>

<a
  class={`rounded-[4px] font-nb-architekt uppercase ${
    theme === "green"
      ? "bg-green-2 text-green-1 outline-none transition-all duration-300 ease-in-out focus-within:outline-offset-2 focus-within:outline-green-1 focus-within:brightness-150 hover:brightness-150"
      : "bg-gray-1 text-gray-10 outline-none transition-all duration-300 ease-in-out focus-within:outline-offset-2 focus-within:outline-white hover:contrast-75 focus-within:hover:contrast-75"
  } ${
    placement === "header"
      ? "px-3 py-2 text-[12px] md:px-5 md:py-3 md:text-[14px]"
      : "px-4 py-3 text-[14px] md:px-7 md:py-4 md:text-[18px]"
  }`}
  href={linkTo}><slot /></a
>

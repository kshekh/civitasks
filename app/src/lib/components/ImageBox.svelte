<script>
  export let item;
</script>

<div
  class="bg-grid-1 bg-gray-13 hover:before:content-right-angle hover:after:content-right-angle relative flex h-28 items-center justify-center rounded-lg border border-gray-8 bg-opacity-50 bg-center bg-no-repeat p-4 opacity-80 outline outline-2 -outline-offset-[6px] outline-gray-9 hover:border-gray-7 hover:bg-transparent hover:opacity-100 hover:outline-none hover:before:absolute hover:before:bottom-1 hover:before:left-3 hover:before:rotate-180 hover:after:absolute hover:after:flex hover:after:h-[calc(100%-0.4rem)] hover:after:w-[calc(100%-0.5rem)] hover:after:items-start hover:after:justify-end hover:after:rounded-lg hover:after:border hover:after:border-gray-8 hover:after:pr-2"
>
  <img src={item.imageUrl} alt={item.name} />
</div>

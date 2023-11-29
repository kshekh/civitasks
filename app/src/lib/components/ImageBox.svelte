<script>
	export let ecosystemItem;
</script>

<div
	class="p-4 bg-grid bg-center bg-no-repeat flex items-center justify-center h-28 bg-[#171615] hover:bg-transparent bg-opacity-50 border border-gray-8 outline outline-2 -outline-offset-[6px] outline-gray-9 hover:outline-none rounded-lg relative opacity-80 hover:opacity-100 hover:border-gray-7 hover:after:absolute hover:after:w-[calc(100%-0.5rem)] hover:after:h-[calc(100%-0.4rem)] hover:after:border hover:after:border-gray-8 hover:after:rounded-lg hover:after:content-shape-corner hover:after:flex hover:after:items-start hover:after:justify-end hover:after:pr-2 hover:before:absolute hover:before:content-shape-corner hover:before:rotate-180 hover:before:left-3 hover:before:bottom-1"
>
	<img src={ecosystemItem.imageUrl} alt={ecosystemItem.name} />
</div>

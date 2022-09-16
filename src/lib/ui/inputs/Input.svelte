<script>
    import Fa from 'svelte-fa/src/fa.svelte';

    export let type = 'text',
        icon = undefined,
        label = '';
</script>

<div class="relative flex w-full flex-wrap items-stretch h-12 my-3">
    <span
        class="z-10   font-normal  text-center text-blueGray-300
         absolute  text-base items-center justify-center  pl-3 py-8"
    >
        <Fa icon="{icon}" style="color: rgba(0, 0, 244, .3);" />
    </span>
    <input
        type="{type}"
        placeholder="{label}"
        class=" placeholder-blueGray-700 text-blueGray-600 top-4 relative  bg-white  text-sm 
          border-b-2 outline-none focus:outline-none focus:border-teal-500 focus:shadow-outline w-full pl-9 "
    />
</div>

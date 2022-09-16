<script>
    import Fa from 'svelte-fa/src/fa.svelte';
    export let color = 'rose',
        icon = undefined;
    let colorClass;
    if (color === 'indigo')
        colorClass = 'text-indigo-600 active:text-indigo-700';
    else if (color === 'rose')
        colorClass = 'text-rose-600 active:text-rose-700';
    else if (color === 'teal')
        colorClass = 'text-teal-600 active:text-teal-700';
    else if (color === 'amber')
        colorClass = 'text-amber-600 active:text-amber-700';
</script>

<!-- teal -->
<!-- fuchsia -->
<div>
    <button
        class="{colorClass}  dark:text-white text-md sm:text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
    >
        {#if icon}
            <Fa
                style="display: inline; padding-right:2px;"
                size="lg"
                icon="{icon}"
            />
        {/if}
        <slot />
    </button>
</div>

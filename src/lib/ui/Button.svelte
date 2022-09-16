<script>
    import Fa from 'svelte-fa/src/fa.svelte';

    export let disabled = false,
        icon = undefined,
        scale = 1,
        color = 'rose',
        type = 'butten',
        inverse = false;
    let disabledClass, colorClass;

    if (inverse) {
        if (color === 'indigo') colorClass = 'text-indigo-500';
        else if (color === 'rose') colorClass = 'text-rose-500';
        else if (color === 'teal') colorClass = 'text-teal-500';
        else if (color === 'amber') colorClass = 'text-amber-500';

        colorClass = colorClass + ' active:bg-gray-100 bg-white';
    } else {
        if (color === 'indigo')
            colorClass = 'bg-indigo-500 active:bg-indigo-600';
        else if (color === 'rose')
            colorClass = 'bg-rose-500 active:bg-rose-600';
        else if (color === 'teal')
            colorClass = 'bg-teal-500 active:bg-teal-600';
        else if (color === 'amber')
            colorClass = 'bg-amber-500 active:bg-amber-600';
    }
    if (disabled)
        disabledClass = 'cursor-not-allowed bg-gray-200 text-gray-400';
</script>

<div>
    <button
        class=" {colorClass} text-white   {disabledClass}   sm:w-32  px-2 h-10  rounded-lg shadow 
     outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-100"
        type="{type}"
    >
        <Fa
            icon="{icon}"
            style="display: inline; padding-right:2px;"
            scale="{scale}"
        />
        <slot />
    </button>
</div>

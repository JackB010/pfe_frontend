<script>
    export let color = 'rose',
        inverse = false;
    let colorClass;
    if (inverse) {
        if (color === 'indigo') colorClass = 'text-indigo-500';
        else if (color === 'rose') colorClass = 'text-rose-500';
        else if (color === 'teal') colorClass = 'text-teal-500';
        else if (color === 'amber') colorClass = 'text-amber-500';
        colorClass = colorClass + ' active:bg-gray-100';
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
</script>

<span
    class="{colorClass} text-white justify-center inline-block cursor-pointer rounded-full px-2.5  py-0.5 text-xs sm:text-sm font-medium  "
    ># <slot /></span
>

<script>
    const items = [
        { value: 'everyone', label: 'Everyone' },
        { value: 'followers', label: 'Followers' },
        { value: 'onlyme', label: 'Only me' },
    ];
    export let show_post_to = items[0];
    $: isActive = false;
    $: isSelected = false;
</script>

<div class="flex flex-col">
    <span
        on:click="{() => (isActive = !isActive)}"
        on:keypress="{() => {}}"
        class="flex items-center p-2 mb-4 border border-rose-600 dark:text-white transition-colors rounded-md dark:text-light w-full text-rose-600  dark:bg-rose-600"
        role="button"
    >
        <span class="ml-2 text-sm"> {show_post_to.label} </span>
        <span class="ml-auto">
            <svg
                class="w-4 h-4 transition-transform transform {isActive
                    ? ''
                    : 'rotate-180'}"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"></path>
            </svg>
        </span>
    </span>

    <div class="{!isActive ? 'hidden' : ''} w-full ">
        <div
            class="absolute border  rounded-lg overflow-hidden bg-white w-11/12 -mt-2 shadow-lg"
        >
            {#each items as item, index}
                <span
                    class="border-b last:border-b-0"
                    on:click="{() => {
                        show_post_to = item;
                        isActive = false;
                        isSelected = true;
                    }}"
                    on:keypress="{() => {}}"
                >
                    <div
                        class="w-full px-4 py-2 border-b  flex items-start hover:bg-rose-50 cursor-pointer"
                    >
                        <div class="ml-4">
                            <p class="text-md  text-slate-600 m-0 p-0">
                                {item.label}
                            </p>
                        </div>
                    </div>
                </span>
            {/each}
        </div>
    </div>
</div>

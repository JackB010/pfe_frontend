<script>
    const items = [
        { value: 'everyone', label: 'Tout le monde' },
        { value: 'followers', label: 'Abonnés' },
        { value: 'onlyme', label: 'Seulement moi' },
    ];
    export let value = items[0];
    $: isActive = false;
    $: isSelected = false;
</script>

<div class="flex flex-col">
    <span
        on:click="{() => (isActive = !isActive)}"
        on:keypress="{() => {}}"
        class="flex items-center p-2 mb-4 border border-rose-600 dark:text-white transition-colors rounded-md dark:text-light w-full text-rose-600 dark:bg-rose-600"
        role="button"
    >
        <span class="ml-2 text-sm"> {value.label} </span>
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

    <div class="{!isActive ? 'hidden' : ''} w-full">
        <div
            class="absolute border rounded-lg overflow-hidden bg-white w-11/12 -mt-2 shadow-lg"
        >
            {#each items as item, index}
                <span
                    class="border-b last:border-b-0"
                    on:click="{() => {
                        value = item;
                        isActive = false;
                        isSelected = true;
                    }}"
                    on:keypress="{() => {}}"
                >
                    <div
                        class="w-full px-4 py-2 border-b flex items-start hover:bg-rose-50 cursor-pointer"
                    >
                        <div class="">
                            <p
                                class="text-md text-slate-600 space-x-2 m-0 p-0 flex flex-row items-center"
                            >
                                <span>
                                    {#if item.label === 'Only me'}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="w-5 h-5 font-bold dark:fill-rose-600 fill-gray-700"
                                            viewBox="0 0 24 24"
                                            stroke-width="6"
                                            fill="none"
                                        >
                                            <path
                                                d="M17 10.25H16.75V8C16.75 6.74022 16.2496 5.53204 15.3588 4.64124C14.468 3.75045 13.2598 3.25 12 3.25C10.7402 3.25 9.53204 3.75045 8.64124 4.64124C7.75045 5.53204 7.25 6.74022 7.25 8V10.25H7C6.27065 10.25 5.57118 10.5397 5.05546 11.0555C4.53973 11.5712 4.25 12.2707 4.25 13V18C4.25 18.7293 4.53973 19.4288 5.05546 19.9445C5.57118 20.4603 6.27065 20.75 7 20.75H17C17.7293 20.75 18.4288 20.4603 18.9445 19.9445C19.4603 19.4288 19.75 18.7293 19.75 18V13C19.75 12.2707 19.4603 11.5712 18.9445 11.0555C18.4288 10.5397 17.7293 10.25 17 10.25ZM8.75 8C8.75 7.13805 9.09241 6.3114 9.7019 5.7019C10.3114 5.09241 11.138 4.75 12 4.75C12.862 4.75 13.6886 5.09241 14.2981 5.7019C14.9076 6.3114 15.25 7.13805 15.25 8V10.25H8.75V8ZM18.25 18C18.25 18.3315 18.1183 18.6495 17.8839 18.8839C17.6495 19.1183 17.3315 19.25 17 19.25H7C6.66848 19.25 6.35054 19.1183 6.11612 18.8839C5.8817 18.6495 5.75 18.3315 5.75 18V13C5.75 12.6685 5.8817 12.3505 6.11612 12.1161C6.35054 11.8817 6.66848 11.75 7 11.75H17C17.3315 11.75 17.6495 11.8817 17.8839 12.1161C18.1183 12.3505 18.25 12.6685 18.25 13V18Z"
                                            ></path>
                                        </svg>
                                    {/if}
                                    {#if item.label === 'Everyone'}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="w-7 h-7 right-2 dark:fill-rose-600 fill-gray-700"
                                            viewBox="-20 0 190 190"
                                            stroke-width="3"
                                            fill="none"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M76.54 149.16C14.75 149.16 17.54 60.8701 75.54 60.8701C133.34 60.8701 133 149.16 76.54 149.16ZM75.48 66.8001C72.6891 66.7949 69.9038 67.0493 67.16 67.5601L68.22 73.6301L55.52 82.6301L44.37 81.9401C43.2722 83.477 42.2928 85.0949 41.44 86.7801L43.78 108.67L50.66 117.51L43.6 127.51C49.89 136.72 60.73 143.23 76.33 143.23C98.79 143.23 110.98 127.07 112.75 109.62L107.48 104.83L99.75 101.89L98.49 103.8L101.49 106.95L103.81 107.3L104.81 110.66L97.51 114.35L92.51 105.64L90.78 109.56L94.55 117.85L99.18 119.2L91.72 123.2L82 137.14L73.74 137.79L71.93 129.79L73.3 118L63.83 115.48L60.71 108L62.2 100.8L71.2 97.1101L79.71 101.98L84.2 100.51L90.89 102.32L92.41 93.7901L83.8 90.9401L83.7 96.5001L78.23 96.2501L77.76 90.3701L71 91.8601L71.51 86.6901L68.63 83.3501L73.01 79.3501L80.13 83.3501L82.36 78.6201L88 76.2201L91.76 77.8801L95.58 77.1101L97.23 73.1101C91.5 69.1701 84.27 66.8001 75.48 66.8001Z"
                                            ></path>
                                        </svg>
                                    {/if}
                                    {#if item.label === 'Followers'}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="w-5 h-5 dark:fill-rose-600 fill-gray-700"
                                            viewBox="0 0 64 64"
                                            stroke-width="3"
                                            fill="none"
                                            ><circle
                                                cx="22.83"
                                                cy="22.57"
                                                r="7.51"></circle><path
                                                d="M38,49.94a15.2,15.2,0,0,0-15.21-15.2h0a15.2,15.2,0,0,0-15.2,15.2Z"
                                            ></path><circle
                                                cx="44.13"
                                                cy="27.22"
                                                r="6.05"></circle><path
                                                d="M42.4,49.94h14A12.24,12.24,0,0,0,44.13,37.7h0a12.21,12.21,0,0,0-5.75,1.43"
                                            ></path></svg
                                        >{/if}
                                </span>
                                <span>
                                    {item.label}
                                </span>
                            </p>
                        </div>
                    </div>
                </span>
            {/each}
        </div>
    </div>
</div>

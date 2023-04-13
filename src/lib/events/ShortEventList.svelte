<script>
    import Wapper from '../Wapper.svelte';
    import { showEventList, eventList } from '../../stores/tools';
    import EventList from './EventList.svelte';
    import { push } from 'svelte-spa-router';
    import {
        num_total_pages,
        userinfo,
        usershortinfo,
    } from '../../stores/accounts/auth';
    $: isActive = false;
    export let is_loaded;
</script>

{#if is_loaded}
    <Wapper>
        <span
            class="flex items-center p-2 mb-2 w-full border border-600 dark:text-white transition-colors rounded dark:text-light  text-rose-600  dark:bg-rose-600"
        >
            <span>
                {#if $usershortinfo.ftype === 'page' || $num_total_pages !== 0}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-7 w-7 cursor-pointer"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        on:click="{() => push('/event/add')}"
                        on:keypress="{() => {}}"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                {:else}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-7 w-7"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        ></path>
                    </svg>
                {/if}
            </span>

            <span class="ml-2 text-sm"> Events </span>

            <div class="flex-1  justify-end">
                <div
                    class="float-right mr-2 bg-rose-600 font-semibold dark:bg-white rounded-full h-fit w-fit text-white dark:text-rose-600 px-2"
                >
                    {$eventList.length}
                </div>
            </div>
            {#if $eventList.length !== 0}
                <span class="ml-auto ">
                    <svg
                        class="w-4 h-4 cursor-pointer transition-transform transform {isActive
                            ? ''
                            : 'rotate-180'}"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        on:click="{() => (isActive = !isActive)}"
                        on:keypress="{() => {}}"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 9l-7 7-7-7"></path>
                    </svg>
                </span>
            {/if}
        </span>
        {#if isActive}
            <div
                class="h-96 w-full border rounded mb-3 overflow-hidden"
                id="homeevents"
            >
                <div
                    class="flex flex-row items-center mt-2 mb-5 w-11/12 mx-auto"
                >
                    <div
                        class="font-bold text-xl flex-1   dark:text-white text-gray-900"
                    >
                        Event List
                    </div>
                    <div class=" cursor-pointer float-right">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-6 w-6 rotate-45 text-rose-600 rounded-full hover:bg-rose-600 hover:text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            on:click="{() => {
                                showEventList.set(false);
                                eventList.set([]);
                                isActive = !isActive;
                            }}"
                            on:keypress="{() => {}}"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                    </div>
                </div>
                <EventList />
            </div>
        {/if}
    </Wapper>
{/if}

<style>
    #homeevents:hover {
        overflow-y: overlay;
    }
</style>

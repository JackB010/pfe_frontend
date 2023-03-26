<script>
    import Wapper from '../Wapper.svelte';
    import { showEventList, eventList } from '../../stores/tools';
    import Number from '../Number.svelte';
    import moment from 'moment';
    import { link } from 'svelte-spa-router';
    $: isActive = false;
    export let is_loaded;
</script>

{#if is_loaded}
    <Wapper>
        <span
            on:click="{() => (isActive = !isActive)}"
            on:keypress="{() => {}}"
            class="flex items-center p-2  border border-rose-600 dark:text-white transition-colors rounded-md dark:text-light w-full text-rose-600  dark:bg-rose-600"
            role="button"
        >
            <span>
                <svg
                    class="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    ></path>
                </svg>
            </span>
            <span class="ml-2 text-sm"> Events </span>
            <div class="flex-1  justify-end">
                <div
                    class="float-right mr-2 bg-rose-600 font-semibold dark:bg-white rounded-full h-fit w-fit text-white dark:text-rose-600 px-2"
                >
                    {$eventList.length}
                </div>
            </div>
            <span class="ml-auto ">
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
        {#if isActive}
            <div class="h-96 w-full  overflow-y-auto">
                <div class="flex flex-row items-center mt-2  w-11/12 mx-auto">
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
                <div class="flex flex-col items-center mx-3 my-1  ">
                    {#each $eventList as event, i}
                        {#if i > 0}
                            {#if moment(event.action_date).format('D') !== moment($eventList[i - 1].action_date).format('D')}
                                <div
                                    class="text-rose-600 dark:text-white font-semibold text-lg"
                                >
                                    {moment(event.action_date).format(
                                        'D MMMM YYYY'
                                    )}
                                </div>
                            {/if}
                        {:else}
                            <div
                                class="text-rose-600 dark:text-white font-semibold text-lg my-2"
                            >
                                {moment(event.action_date).format(
                                    'D MMMM YYYY'
                                )}
                            </div>
                        {/if}
                        <div class=" w-full shadow-lg dark:bg-slate-600 my-1 ">
                            <div
                                class="flex flex-1 items-center px-4 py-2 w-full "
                            >
                                <div class="self-start">
                                    <a
                                        href="{`/page/${event.page.username}`}"
                                        use:link
                                    >
                                        <div
                                            style="background-image: url({event
                                                .page.photo_icon})"
                                            class="w-12 h-12 bg-cover bg-center rounded-full cursor-pointer object-cover mr-4 shadow"
                                        ></div>
                                    </a>
                                </div>

                                <div class="self-start flex-[0.3]  ">
                                    <div
                                        class="flex flex-col items-start justify-between"
                                    >
                                        <span class="">
                                            <span
                                                class="text-lg cursor-pointer font-semibold text-gray-900 dark:text-white -mt-1"
                                            >
                                                <a
                                                    href="{`/profile/${event.page.username}`}"
                                                    use:link
                                                >
                                                    {event.page.username}</a
                                                ></span
                                            >
                                        </span>

                                        <div>
                                            <small
                                                class="text-xs text-gray-700 dark:text-slate-200 "
                                                >{moment(
                                                    event.created_at
                                                ).fromNow()}</small
                                            >
                                        </div>
                                    </div>
                                </div>
                                <div
                                    class="flex-1 flex shadow-md dark:shadow-lg p-1  text-justify py-1  pl-2 mr-4"
                                >
                                    <div
                                        class=" border-[2px] my-1 border-rose-600  mr-2 w-0 rounded-lg"
                                    ></div>
                                    <div class="">
                                        {event.content}
                                    </div>
                                </div>
                                <div
                                    class="self-start border py-1 px-2 shadow-lg bg-rose-600 rounded-lg"
                                >
                                    <div
                                        class="float-right flex flex-col justify-center items-center "
                                    >
                                        <div
                                            class="font-semibold text-gray-300"
                                        >
                                            {moment(event.action_date).format(
                                                'D MMMM'
                                            )}
                                        </div>
                                        <div
                                            class="text-xs font-semibold text-white"
                                        >
                                            {moment(event.action_date).format(
                                                'HH:mm'
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        {/if}
    </Wapper>
{/if}

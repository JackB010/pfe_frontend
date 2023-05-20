<script>
    import axios from 'axios';
    import moment from 'moment';
    import { link, push } from 'svelte-spa-router';
    import { config, usershortinfo } from '../../stores/accounts/auth';
    import { eventList } from '../../stores/tools';
    import { baseurl } from '../functions';
    import { fly } from 'svelte/transition';
    export let event = {};
    export let i = 0;

    $: username = event.page['username'];
    $: image = event.page['photo_icon'];
    $: ftype = event.page['ftype'];
    $: changed = false;
    let is_active = true,
        isActive = false,
        is_delete = false;
    const infoChange = () => {
        if (changed) {
            username = event.page['username'];
            image = event.page['photo_icon'];
            ftype = event.page['ftype'];
            changed = !changed;
        } else {
            username = event.by_owner['username'];
            image = event.by_owner['photo_icon'];
            ftype = event.by_owner['ftype'];
            changed = !changed;
        }
    };
    const deleteevent = () => {
        axios
            .patch(
                `${baseurl}/events/${event['id']}/`,
                { deleted: true },
                config
            )
            .then((res) => {
                eventList.update((data) => {
                    return data.filter((data) => data.id !== res.data.id);
                });
                is_delete = false;
            });
    };
</script>

{#if i > 0}
    {#if moment(event.action_date).format('D') !== moment($eventList[i - 1].action_date).format('D')}
        <div
            class="text-rose-600 dark:text-white font-semibold text-lg mt-6 mb-2"
        >
            {moment(event.action_date).format('DD MMMM YYYY')}
        </div>
    {/if}
{:else}
    <div class="text-rose-600 dark:text-white font-semibold text-lg mb-2">
        {moment(event.action_date).format('DD MMMM YYYY')}
    </div>
{/if}
{#if !is_delete}
    <div
        in:fly="{{ y: 50, duration: (i % 10) * 200 }}"
        class=" w-full rounded-md border-black/5 border shadow-sm
        
            {!event.done
            ? 'dark:bg-green-500 bg-green-100'
            : ' bg-red-100 dark:bg-red-500'} my-1"
    >
        <div class="flex flex-1 items-center pl-3 pr-1 py-2 w-full">
            <div class="self-start -ml-2">
                <a href="{`/${ftype}/${username}`}" use:link>
                    <div class="text-center flex flex-col items-center">
                        <div
                            style="background-image: url({image})"
                            class="w-12 h-12 bg-cover bg-center {!changed
                                ? 'rounded-lg'
                                : 'rounded-full'} cursor-pointer object-cover mr-4 shadow"
                        ></div>
                    </div>
                </a>
            </div>

            <div class="self-start sm:flex-[0.3] flex-1">
                <div class="flex flex-col items-start justify-between">
                    <span
                        class="text-lg cursor-pointer font-semibold text-gray-900 dark:text-white -mt-1"
                    >
                        <a href="{`/${ftype}/${username}`}" use:link>
                            {username}</a
                        >{#if event.by_owner['username'] !== undefined}<span
                                class="ml-1 text-base text-gray-500 dark:text-gray-800"
                                >{#if changed} to {:else} by{/if}
                            </span>
                            <span
                                class="text-rose-500 dark:text-rose-600 cursor-pointer w-fit -ml-1 text-[0.93rem]"
                                on:click="{infoChange}"
                                on:keypress="{() => {}}"
                            >
                                {#if changed}
                                    {event.page['username']}
                                {:else}
                                    {event.by_owner['username']}{/if}
                            </span>{/if}</span
                    >

                    <div>
                        <small class="text-xs text-gray-700 dark:text-slate-200"
                            >{moment(event.created_at).fromNow()}</small
                        >
                    </div>
                </div>
            </div>
            <div
                class="flex-1 hidden sm:flex shadow-sm dark:shadow-lg p-2 rounded-lg border border-black/5 py-1 pl-2 mr-4"
            >
                <div
                    class=" border-[2px] my-1 text-xs sm:text-base border-rose-600 mr-2 w-0 rounded-xl"
                ></div>
                <div class="p-1 dark:text-white">
                    {event.content}
                </div>
            </div>

            <div
                class="self-start py-1 px-2 mr-1 shadow-lg bg-rose-600 rounded-lg"
            >
                <div
                    class="float-right flex flex-col justify-center items-center"
                >
                    <div
                        class="font-semibold text-gray-300 text-sm sm:text-base"
                    >
                        {moment(event.action_date).format('DD MMM')}
                    </div>
                    <div
                        class="sm:text-xs text-[0.68rem] font-semibold text-white"
                    >
                        {moment(event.action_date).format('HH:mm')}
                    </div>
                </div>
            </div>
            {#if $usershortinfo['username'] === event.page.username || $usershortinfo['username'] === event.by_owner['username']}
                <div
                    class=" self-start cursor-pointer"
                    on:click="{() => (isActive = !isActive)}"
                    on:keypress="{() => {}}"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        class="rotate-90 w-5 h-6 fill-gray-700 dark:fill-white"
                    >
                        <path d="M0 0h24v24H0V0z" fill="none"></path>
                        <path
                            d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
                        ></path>
                    </svg>
                </div>
                <div class=" ">
                    <div
                        class="relative {isActive ? '' : 'hidden'} "
                        on:mouseleave="{(e) => {
                            isActive = false;
                        }}"
                    >
                        <div
                            class=" absolute top-6 right-2 z-50 w-56 py-1 mb-4 h-fit rounded-md shadow-lg min-w-max ring-1 ring-black ring-opacity-25 dark:bg-dark focus:outline-none bg-white dark:bg-slate-900 dark:text-white"
                        >
                            <span
                                on:click="{() => {
                                    isActive = false;
                                    push(`/event/${event['id']}/edit`);
                                }}"
                                on:keypress="{() => {}}"
                                class="flex px-4 py-2 text-sm transition-colors hover:bg-gray-100 dark:text-light dark:hover:bg-rose-600 space-x-2 cursor-pointer"
                            >
                                <div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        class="bi bi-pencil-square"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                                        ></path>
                                        <path
                                            fill-rule="evenodd"
                                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                                        ></path>
                                    </svg>
                                </div>
                                <span>Modifier</span>
                            </span>

                            <span
                                on:click="{() => {
                                    is_delete = !is_delete;
                                    isActive = !isActive;
                                }}"
                                on:keypress="{() => {}}"
                            >
                                <span
                                    class="flex px-4 py-2 text-sm transition-colors hover:bg-gray-100 dark:text-light dark:hover:bg-rose-600 space-x-2 cursor-pointer"
                                >
                                    <span
                                        ><svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="h-5 w-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                            ></path>
                                        </svg></span
                                    >
                                    <span>Supprimer</span>
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            {/if}
        </div>
        <div
            class="flex-1 mb-2 flex sm:hidden shadow-sm dark:shadow-lg p-2 rounded-lg border border-black/5 py-1 pl-2 mr-4"
        >
            <div
                class=" border-[2px] my-1 text-xs sm:text-base border-rose-600 mr-2 w-0 rounded-xl"
            ></div>
            <div class="p-1 dark:text-white">
                {event.content}
            </div>
        </div>
    </div>
{:else}
    <div class="h-[10rem] flex flex-row items-center">
        <div
            in:fly="{{ y: 100, duration: 1000 }}"
            class="bg-white w-8/12 z-50 items-center flex flex-col space-y-4 pb-4 pt-2 rounded-2xl absolute translate-x-1/4"
        >
            <div class="text-rose-600 font-bold">
                Do you want to delet your account?
            </div>

            <div class="flex flex-1 w-full justify-center items-center">
                <div
                    class="text-center flex-1"
                    on:click="{() => {
                        is_active = false;
                        deleteevent();
                    }}"
                    on:keypress="{() => {}}"
                >
                    <span
                        class=" bg-green-600 text-white rounded-lg cursor-pointer shadow-lg w-24 py-2 px-5"
                        >Conform</span
                    >
                </div>

                <div
                    class="text-center flex-1"
                    on:click="{() => {
                        is_delete = !is_delete;
                    }}"
                    on:keypress="{() => {}}"
                >
                    <span
                        class=" bg-[#FF0000] text-white rounded-lg cursor-pointer shadow-lg w-24 py-2 px-5"
                        >Cansole</span
                    >
                </div>
            </div>
        </div>
    </div>
{/if}

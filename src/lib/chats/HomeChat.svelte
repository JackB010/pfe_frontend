<script>
    import {
        closeSocket,
        contact_list,
        getChatContacts,
        messagesLoaded,
        nexturlContact,
    } from './../../stores/chats/chat';
    import { push } from 'svelte-spa-router';
    import { onMount } from 'svelte';
    import Loader from '../ui/Loader.svelte';
    import moment from 'moment';
    import Wapper from '../Wapper.svelte';
    import NoThing from '../ui/NoThing.svelte';
    import axios from 'axios';
    import { baseurl } from '../functions';
    import { config } from '../../stores/accounts/auth';
    import SearchSection from '../ui/SearchSection.svelte';

    const getChatRoom = async (e) => {
        await push(`/chat/${e.target.id}`);
    };

    onMount(async () => {
        contact_list.set([]);
        await getChatContacts();
        messagesLoaded.set(true);
        closeSocket();
    });

    const searchFunc = async (search) => {
        if (search.trim().length !== 0) {
            await axios(`${baseurl}/chats/?search=${search}`, config).then(
                (res) => {
                    contact_list.set(res.data['results']);
                    nexturlContact.set(res.data['next']);
                }
            );
        }
    };
    let yy = -1,
        y = 0;
    $: {
        if (yy - 50 === y - 50) {
            if ($nexturlContact) {
                axios($nexturlContact, config).then(async (res) => {
                    let data = [];
                    contact_list.subscribe((notifications) => {
                        data = notifications;
                    });
                    data = [...data, ...res.data['results']];
                    await contact_list.set(data);
                    nexturlContact.set(res.data['next']);
                });
                yy = yy - 40;
            }
        }
    }
</script>

{#if $messagesLoaded}
    <Wapper>
        <div class=" mt-3 mx-auto w-full min-h-[34rem]  px-2 dark:text-black">
            <h2 class="flex flex-row items-center justify-between mt-2  ">
                <span class="font-bold text-xl dark:text-white text-gray-900"
                    >Messages</span
                >
                <span class=" cursor-pointer">
                    <svg
                        class="h-8 w-8 text-rose-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"
                        ></path>
                        <path
                            fill-rule="evenodd"
                            d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                            clip-rule="evenodd"></path>
                    </svg>
                </span>
            </h2>
            <!-- <div class="flex flex-1   ">
                <div
                    class="flex w-full flex-1 mt-2 px-1 justify-center items-center  "
                >
                    <div class=" flex-1 items-center">
                        <form
                            class="w-full h-12 flex "
                            on:submit|preventDefault="{searchFunc}"
                        >
                            <input
                                bind:value="{search}"
                                class="-mr-1 h-12 w-full border-y-2  border-l-2 rounded-l-lg border-rose-600 text-rose-700
                                     text-lg pl-4 outline-none focus:outline-none"
                            />

                            <button
                                class=" text-white border-y-2 border-rose-600 dark:border-white  border-r-2  bg-rose-600 active:bg-rose-600  px-2 h-12  rounded-r-lg shadow 
                                    outline-none focus:outline-none  ease-linear transition-all duration-100"
                            >
                                <svg
                                    class="w-7 h-7"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    ></path>
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
            </div> -->
            <div class="mt-2">
                <SearchSection searchFunc="{searchFunc}" />
            </div>
            {#if $contact_list.length !== 0}
                <ul
                    class="flex flex-col mt-4  space-y-1.5 overflow-hidden h-[34rem] hover:hover:pr-3"
                    bind:clientHeight="{y}"
                    on:scroll="{(e) => {
                        yy = e.target['scrollHeight'];
                        y = e.target['scrollTop'] + e.target['clientHeight'];
                    }}"
                    id="chatHome"
                >
                    {#each $contact_list as contact}
                        <li
                            class="flex flex-row ml-1 rounded-md items-center  relative {contact[
                                'unread_messages'
                            ] != 0
                                ? 'dark:bg-slate-500 dark:hover:bg-slate-600 bg-rose-200 hover:bg-rose-300 '
                                : 'dark:bg-gray-700 bg-gray-100'} p-2"
                        >
                            {#if contact['unread_messages'] != 0}
                                <div
                                    class="absolute flex items-center justify-center h-full right-0 top-0 mr-2"
                                >
                                    <span
                                        class="flex items-center justify-center shadow bg-blue-600 h-6 w-6 text-xs rounded-full text-white"
                                        >{contact['unread_messages']}</span
                                    >
                                </div>
                            {/if}
                            <div class="relative flex-shrink-0 cursor-pointer">
                                <span
                                    class="absolute right-0 top-0 border-2 border-white mt-px mr-px flex items-center justify-center h-4 w-4 rounded-full  {contact[
                                        'online'
                                    ]
                                        ? 'bg-green-500'
                                        : 'bg-red-500'}"></span>
                                <span
                                    on:click="{getChatRoom}"
                                    on:keypress="{(e) => {}}"
                                    id="{contact['profile']['username']}"
                                    class="flex rounded-full w-14 h-14"
                                >
                                    <img
                                        src="{contact['profile']['photo_icon']}"
                                        alt="{contact['profile'][
                                            'username'
                                        ]}_photo"
                                        class="w-full h-full rounded-full"
                                    />
                                </span>
                            </div>
                            <div class=" flex  items-center ">
                                <div
                                    class="flex flex-col ml-4 text-black dark:text-white  w-1/2"
                                >
                                    <h3
                                        class="font-bold cursor-pointer"
                                        on:click="{getChatRoom}"
                                        on:keypress="{() => {}}"
                                        id="{contact['profile']['username']}"
                                    >
                                        {contact['profile']['username']}
                                    </h3>
                                    {#if contact['last_message']}
                                        <p class="w-52 line-clamp-1 text-sm">
                                            {#if contact['last_message']['photos']}
                                                <svg
                                                    class="w-5 h-5"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    style="display: inline; padding-right:2px;"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    ><path
                                                        fill-rule="evenodd"
                                                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                                        clip-rule="evenodd"
                                                    ></path></svg
                                                >
                                            {/if}
                                            {contact['last_message']['content']}
                                        </p>
                                    {:else}
                                        <p>
                                            you can now chat with {contact[
                                                'profile'
                                            ]['username']}
                                        </p>
                                    {/if}
                                </div>
                                <div class=" justify-start w-1/2">
                                    <p
                                        class="font-semibold dark:text-gray-300   text-gray-700 text-[0.67rem] "
                                    >
                                        .{moment(
                                            contact['last_seen']
                                        ).fromNow()}
                                    </p>
                                </div>
                            </div>
                        </li>
                    {/each}
                </ul>
            {:else}
                <div class="my-2">
                    <NoThing
                        dSVG="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                        message="No Contet To Chat With"
                    />
                </div>
            {/if}
        </div>
    </Wapper>
{:else}
    <Loader />
{/if}

<style>
    #chatHome:hover {
        overflow-y: overlay;
    }
</style>

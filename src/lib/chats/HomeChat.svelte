<script>
    import {
        closeSocket,
        contact_list,
        getChatContacts,
        messagesLoaded,
    } from './../../stores/chats/chat';
    import { push } from 'svelte-spa-router';
    import { onMount } from 'svelte';
    import Loader from '../ui/Loader.svelte';
    import moment from 'moment';
    import Wapper from '../Wapper.svelte';
    import NoThing from '../ui/NoThing.svelte';

    const getChatRoom = async (e) => {
        await push(`/chat/${e.target.id}`);
    };

    onMount(async () => {
        await getChatContacts();
        messagesLoaded.set(true);
        closeSocket();
    });

    const onlineIcon = (on) => {
        if (on) return 'rgb(0, 200, 0)';
        else return 'red';
    };
</script>

{#if $messagesLoaded}
    <Wapper>
        <div
            class=" mt-3 mx-auto w-full min-h-[34rem] overflow-hidden px-2 dark:text-black"
            id="chatHome"
        >
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
            <div class="flex flex-col relative mt-4">
                <div
                    class="absolute flex items-center justify-center h-10 w-10 left-0 top-1"
                >
                    <svg
                        class="h-6 w-6 text-gray-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clip-rule="evenodd"></path>
                    </svg>
                </div>
                <div>
                    <input
                        class="pl-10   w-full border-y-2  border-2 rounded-lg focus:border-rose-600 focus:ring-rose-600 border-rose-600 text-rose-700
                                     text-lg outline-none focus:outline-none"
                        type="text"
                    />
                </div>
            </div>

            {#if $contact_list.length !== 0}
                <ul
                    class="flex flex-col mt-4 space-y-1 overflow-y-auto h-[34rem]"
                >
                    {#each $contact_list as contact}
                        <li
                            class="flex flex-row rounded-lg items-center relative {contact[
                                'unread_messages'
                            ] != 0
                                ? 'dark:bg-slate-500 dark:hover:bg-slate-600 bg-rose-200 hover:bg-rose-300 '
                                : 'dark:bg-gray-700 bg-gray-100'} p-2 rounded"
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
                            <div
                                class="flex flex-col ml-4 text-black dark:text-white"
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
                            <p>
                                .{moment(contact['last_seen']).fromNow()}
                            </p>
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

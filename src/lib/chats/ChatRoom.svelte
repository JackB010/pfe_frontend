<script type="ts">
    import { afterUpdate, onMount } from 'svelte';
    import { push } from 'svelte-spa-router';
    import moment from 'moment';
    import {
        config,
        getProfileShortInfo,
        usershortinfo,
    } from './../../stores/accounts/auth';

    import {
        chating_with,
        fetched_messages,
        loadMessages,
        addMessage,
        deleteMessage,
    } from './../../stores/chats/chat';
    import axios from 'axios';
    import Wapper from '../Wapper.svelte';
    import FullInput from '../ui/FullInput.svelte';
    import { backurls, nexturl } from '../../stores/tools';
    let messages, userdata, element;
    onMount(async () => {
        document.title = `Chat: ${params['username']}`;

        let username = params['username'];
        loadMessages(username);
        chating_with.set(await getProfileShortInfo(username, 'profile'));
    });
    fetched_messages.subscribe((data) => {
        messages = data;
    });
    chating_with.subscribe((data) => {
        userdata = data;
    });

    // images = [];

    const sendMessage = (message) => {
        loadmore = false;
        addMessage(message, userdata.username);
    };

    const ShowInfo = (id) => {
        let elm_d = document.getElementById(`delete_${id}`);
        let elm_i = document.getElementById(`info_${id}`);
        elm_i.classList.toggle('hidden');
        if (elm_d) elm_d.classList.toggle('hidden');
    };
    const deleteMessageHandler = (e) => {
        let id = e.target.id;
        if (id !== undefined && id !== '') {
            deleteMessage(id);
        }
    };
    let loadmore = false;
    afterUpdate(() => {
        if (!loadmore) element.scrollTo(0, element.scrollHeight);
    });

    const getOldMessages = async () => {
        if ($nexturl) {
            await axios($nexturl, config).then((res) => {
                messages = [...res.data['results'], ...messages];
                fetched_messages.set(messages);
                nexturl.set(res.data['next']);
            });
            messages = messages;
            loadmore = true;
            element.scrollTo(element.scrollHeight, 0);
        }
    };

    export let params = {};
</script>

<Wapper>
    <div class=" h-screen pb-6 mb-2 border  rounded">
        <div class="flex flex-row bg-rose-600 rounded    overflow-x-auto mb-4">
            <div
                class="ml-2 my-1.5 cursor-pointer  bg-white rounded-full text-rose-600 p-2 mx-auto font-bold "
                on:click="{() => {
                    $backurls.pop();
                    push($backurls.pop());
                }}"
                on:keypress="{(e) => {}}"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fill-rule="evenodd"
                        d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                        clip-rule="evenodd"></path>
                </svg>
            </div>
            <div
                class="flex flex-row  items-center justify-between mr-4 cursor-pointer space-x-2"
                on:click="{() => {
                    push(
                        `/${$chating_with['ftype']}/${$chating_with['username']}`
                    );
                }}"
                on:keypress="{() => {}}"
            >
                <p class="font-bold text-white ">{$chating_with['username']}</p>
                <div
                    style="background-image: url({$chating_with['photo_icon']})"
                    class="w-8 h-8 bg-cover bg-center rounded-full cursor-pointer object-cover mr-4 shadow"
                ></div>
            </div>
        </div>
        <div
            bind:this="{element}"
            class="text-black dark:text-white scroll-smooth mb-8  overflow-hidden h-[34rem]"
            id="room"
        >
            {#if $fetched_messages === null}
                {push('/chat')}
            {:else}
                {#if $nexturl || $fetched_messages.length <= 6}
                    <div class="w-full grid -mt-2">
                        <button
                            class="outline-none text-center text-gray-400  "
                            on:click="{getOldMessages}"
                            id="readMore">read more</button
                        >
                    </div>
                {/if}

                {#each messages as msg, i}
                    {#if i > 0}
                        {#if moment(msg.timestamp).format('D') !== moment(messages[i - 1].timestamp).format('D')}
                            <div
                                class="text-rose-600 dark:text-white font-semibold text-xs text-center mt-6 mb-2"
                            >
                                {moment(messages[i - 1].timestamp).format(
                                    'D MMMM'
                                )}
                            </div>
                        {/if}
                    {:else}
                        <div
                            class="text-rose-600 dark:text-white font-semibold  text-center text-xs mb-2 "
                        >
                            {moment(msg.timestamp).format('D MMMM ')}
                        </div>
                    {/if}
                    <div class="grid grid-cols-12 text-black ">
                        {#if msg.sender === $usershortinfo['username']}
                            <div class="col-start-6 col-end-13 p-2 rounded-sm ">
                                {#if msg.photos.length !== 0}
                                    <div
                                        on:click="{() => {
                                            ShowInfo(msg.id);
                                        }}"
                                        on:keypress="{() => {}}"
                                        class="flex  justify-start flex-row-reverse  items-end "
                                    >
                                        <div
                                            class="flex items-center justify-center h-8 w-8 rounded-full  flex-shrink-0"
                                        >
                                            <div
                                                on:click="{() => {
                                                    push(
                                                        `/${$usershortinfo['ftype']}/${$usershortinfo['username']}`
                                                    );
                                                }}"
                                                on:keypress="{() => {}}"
                                                style="background-image: url({$usershortinfo[
                                                    'photo_icon'
                                                ]})"
                                                class="w-7 h-7 bg-cover bg-center  cursor-pointer object-cover rounded-full border-1 mr-1 shadow"
                                            ></div>
                                        </div>

                                        <div class="flex  items-center ">
                                            <div
                                                class="hidden  w-fit h-fit float-right"
                                                id="{`delete_${msg.id}`}"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    class="h-5 w-5 cursor-pointer text-gray-700  dark:text-white "
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    id="{msg.id}"
                                                    on:click="{deleteMessageHandler}"
                                                    on:keypress="{() => {}}"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                    ></path>
                                                </svg>
                                            </div>
                                            <div class="grid">
                                                <div>
                                                    {#each msg.photos as photo}
                                                        <div
                                                            class="py-1 px-4  "
                                                        >
                                                            <div
                                                                style="background-image: url({photo.photo})"
                                                                class="w-52 h-64 border-2 bg-no-repeat border-slate-700 bg-cover bg-center  cursor-pointer   mb-2 rounded-md float-right shadow"
                                                            ></div>
                                                        </div>
                                                    {/each}
                                                </div>

                                                <div
                                                    class="relative {msg.content ===
                                                    ''
                                                        ? 'hidden'
                                                        : ''} mx-auto text-sm bg-rose-600  text-white py-1 px-4   mr-4  shadow-lg rounded-md "
                                                >
                                                    <div
                                                        class=" max-w-xs break-words"
                                                    >
                                                        {msg.content}
                                                    </div>
                                                </div>
                                                <div class="mt-1">
                                                    <span
                                                        id="{`info_${msg.id}`}"
                                                        class="text-gray-700 hidden dark:text-white text-xs float-right mr-4"
                                                    >
                                                        <span
                                                            >{moment(
                                                                msg.timestamp
                                                            ).fromNow()}</span
                                                        >
                                                        <span
                                                            class="w-0 rounded-full   border mx-2 border-gray-700 "
                                                        ></span>
                                                        {msg.seen
                                                            ? 'seen'
                                                            : 'sent'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                {:else}
                                    <div
                                        class="flex  justify-start flex-row-reverse"
                                    >
                                        <div
                                            class="flex items-center justify-center h-8 w-8 rounded-full  flex-shrink-0"
                                        >
                                            <div
                                                on:click="{() => {
                                                    push(
                                                        `/${$usershortinfo['ftype']}/${$usershortinfo['username']}`
                                                    );
                                                }}"
                                                on:keypress="{() => {}}"
                                                style="background-image: url({$usershortinfo[
                                                    'photo_icon'
                                                ]})"
                                                class="w-7 h-7 bg-cover bg-center  cursor-pointer object-cover rounded-full border-1 mr-1 shadow"
                                            ></div>
                                        </div>
                                        <div>
                                            <div
                                                on:click="{(e) => {
                                                    ShowInfo(msg.id);
                                                }}"
                                                on:keypress="{() => {}}"
                                                class="relative text-sm bg-rose-600 w-fit text-white py-1 px-4 mr-3 shadow-lg rounded-md mb-1 float-right "
                                            >
                                                <div
                                                    class=" max-w-xs break-words"
                                                >
                                                    {msg.content}
                                                </div>
                                                <div
                                                    class="mr-2 w-fit h-fit hidden absolute -left-8 top-1"
                                                    id="{`delete_${msg.id}`}"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        class="h-5 w-5 cursor-pointer text-gray-700  dark:text-white "
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        id="{msg.id}"
                                                        on:click="{deleteMessageHandler}"
                                                        on:keypress="{() => {}}"
                                                    >
                                                        <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                        ></path>
                                                    </svg>
                                                </div>
                                            </div>

                                            <div class="">
                                                <span
                                                    class="text-gray-700 hidden dark:text-white text-xs float-right mr-4"
                                                    id="{`info_${msg.id}`}"
                                                >
                                                    <span
                                                        >{moment(
                                                            msg.timestamp
                                                        ).fromNow()}</span
                                                    >
                                                    <span
                                                        class="w-0 rounded-full   border mx-2 border-gray-700 "
                                                    ></span>
                                                    {msg.seen ? 'seen' : 'sent'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                {/if}
                            </div>
                        {:else}
                            <div class="col-start-1 col-end-8 p-2 rounded-lg">
                                {#if msg.photos.length !== 0}
                                    <div class="flex flex-row items-end ">
                                        <div
                                            on:click="{() => {
                                                ShowInfo(msg.id);
                                            }}"
                                            on:keypress="{() => {}}"
                                            class="flex items-center justify-center h-8 w-8 rounded-full  flex-shrink-0"
                                        >
                                            <div
                                                on:click="{() => {
                                                    push(
                                                        `/${$chating_with['ftype']}/${$chating_with['username']}`
                                                    );
                                                }}"
                                                on:keypress="{() => {}}"
                                                style="background-image: url({$chating_with[
                                                    'photo_icon'
                                                ]})"
                                                class="w-7 h-7 bg-cover bg-center  cursor-pointer object-cover rounded-full border-1  shadow"
                                            ></div>
                                        </div>
                                        <div
                                            class="grid "
                                            on:click="{() => {
                                                ShowInfo(msg.id);
                                            }}"
                                            on:keypress="{() => {}}"
                                        >
                                            {#each msg.photos as photo}
                                                <div class="py-1 px-4  ">
                                                    <div
                                                        style="background-image: url({photo.photo})"
                                                        class="w-52 h-64 border-2 border-slate-700 bg-no-repeat bg-cover bg-center  cursor-pointer  mb-2 rounded-md float-left shadow"
                                                    ></div>
                                                </div>
                                            {/each}
                                            <div class=" ml-4">
                                                <div
                                                    class="relative  {msg.content ===
                                                    ''
                                                        ? 'hidden'
                                                        : ''} mx-auto text-sm bg-rose-600  text-white py-1 px-4  shadow-lg rounded-md float-left"
                                                >
                                                    <div
                                                        class="max-w-xs break-words"
                                                    >
                                                        {msg.content}
                                                    </div>
                                                </div>
                                                <div class="">
                                                    <span
                                                        id="{`info_${msg.id}`}"
                                                        class="text-gray-700 hidden w-full dark:text-white mt-1 text-xs float-left "
                                                    >
                                                        <span
                                                            >{moment(
                                                                msg.timestamp
                                                            ).fromNow()}</span
                                                        >
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                {:else}
                                    <div class="flex flex-row items-start">
                                        <div
                                            class="flex items-center justify-center h-8 w-8 rounded-full  flex-shrink-0"
                                        >
                                            <div
                                                on:click="{() => {
                                                    push(
                                                        `/${$chating_with['ftype']}/${$chating_with['username']}`
                                                    );
                                                }}"
                                                on:keypress="{() => {}}"
                                                style="background-image: url({$chating_with[
                                                    'photo_icon'
                                                ]})"
                                                class="w-7 h-7 bg-cover bg-center  cursor-pointer object-cover rounded-full border-1  shadow"
                                            ></div>
                                        </div>
                                        <div>
                                            <div
                                                on:click="{(e) => {
                                                    ShowInfo(msg.id);
                                                }}"
                                                on:keypress="{() => {}}"
                                                class="relative  text-sm bg-rose-600 w-fit text-white py-1 px-4 ml-3 shadow-lg rounded-md mb-1 float-left"
                                            >
                                                <div
                                                    class="max-w-xs break-words"
                                                >
                                                    {msg.content}
                                                </div>
                                            </div>
                                            <div class="">
                                                <span
                                                    class="text-gray-700 hidden dark:text-white text-xs float-left ml-4"
                                                    id="{`info_${msg.id}`}"
                                                >
                                                    <span
                                                        >{moment(
                                                            msg.timestamp
                                                        ).fromNow()}</span
                                                    >
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                {/if}
                            </div>
                        {/if}
                    </div>
                {/each}
            {/if}
        </div>
        <div class="bottom-0 absolute w-full mb-2">
            <FullInput
                sendFunc="{sendMessage}"
                placeholder="Write your message . . ."
            />
        </div>
    </div>
</Wapper>

<style>
    #room:hover {
        overflow-y: overlay;
    }
</style>

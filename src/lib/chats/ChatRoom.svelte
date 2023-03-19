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
        images_chat,
    } from './../../stores/chats/chat';
    import axios from 'axios';
    import Wapper from '../Wapper.svelte';
    import FullInput from '../ui/FullInput.svelte';
    import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
    import Fa from 'svelte-fa/src/fa.svelte';
    import { baseurl } from '../functions';
    import { nexturl } from '../../stores/tools';

    onMount(async () => {
        let username = params['username'];
        loadMessages(username);
        chating_with.set(await getProfileShortInfo(username));
    });

    let messages, userdata, element;
    // images = [];
    $: fetched_messages.subscribe((data) => {
        messages = data;
    });
    chating_with.subscribe((data) => {
        userdata = data;
    });
    const sendMessage = async (message) => {
        loadmore = false;
        let imgnum = $images_chat.length;

        await addMessage(message, userdata.username);
        // if (imgnum > 0) {
        //     axios(`${baseurl}/chats/${userdata.username}/`, config).then(
        //         async (res) => {
        //             let data = res.data['results'].reverse();
        //             await fetched_messages.set(data);
        //         }
        //     );
        // }
    };
    const updateChat = (id) => {
        axios.get(`${baseurl}/chats/get_message/${id}/`, config).then((res) => {
            fetched_messages.update((messages) => {
                return [...messages, res.data];
            });
        });
    };

    const deleteMessageHandler = async (e) => {
        let id = e.target.value;
        await deleteMessage(id);
        for (let i = 0; i < messages.lenght; i++) {
            if (messages[i].id === id) {
                messages[i].content = 'Message deleted';
            }
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
    <div class="flex flex-row bg-rose-600  h-full overflow-x-auto mb-4">
        <div
            class="ml-2 my-1 cursor-pointer  bg-white rounded-full text-rose-600 p-2 mx-auto font-bold "
            on:keypress="{(e) => {}}"
        >
            <Fa icon="{faArrowLeftLong}" />
        </div>
        <div class=""></div>
        <div class="flex flex-row my-auto justify-between mr-4 space-x-2">
            <p>{$chating_with['username']}</p>
            <img
                class="h-8 w-8 rounded-full"
                src="{$chating_with['photo_icon']}"
                alt="{$chating_with['username']}_photo"
            />
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
            {#if $nexturl}
                <div class="w-full grid -mt-2">
                    <button
                        class="outline-none text-center text-gray-400  "
                        on:click="{getOldMessages}"
                        id="readMore">read more</button
                    >
                </div>
            {/if}

            {#each messages as msg, i}
                <div class="grid grid-cols-12 text-black">
                    {#if msg.sender === $usershortinfo['username']}
                        <div class="col-start-6 col-end-13 p-2 rounded-sm">
                            {#if msg.photos.length !== 0}
                                <div
                                    class="flex  justify-start flex-row-reverse  items-end "
                                >
                                    {#if msg.content !== ''}
                                        <div
                                            class="flex items-center justify-center h-8 w-8 rounded-full  flex-shrink-0"
                                        >
                                            <img
                                                class="h-6 w-6 rounded-full border-1 mr-1"
                                                src="{$usershortinfo[
                                                    'photo_icon'
                                                ]}"
                                                alt="{$usershortinfo[
                                                    'username'
                                                ]}_photo"
                                            />
                                        </div>
                                        <div class="grid">
                                            <div>
                                                {#each msg.photos as photo}
                                                    <div class="py-1 px-4  ">
                                                        <img
                                                            class="w-52 h-64 border-2 border-slate-700 shadow-lg mb-2 rounded-md float-right"
                                                            src="{photo.photo}"
                                                            alt="{photo}"
                                                        />
                                                    </div>
                                                {/each}
                                            </div>

                                            <div
                                                class="relative  mx-auto text-sm bg-rose-600  text-white py-1 px-4   mr-4  shadow-lg rounded-md "
                                            >
                                                <p class="break-words max-w-xs">
                                                    {msg.content}
                                                </p>
                                            </div>
                                        </div>
                                    {:else}
                                        <div
                                            class="flex items-center justify-center h-8 w-8 rounded-full  flex-shrink-0"
                                        >
                                            <img
                                                class="h-6 w-6 rounded-full border-1  mr-1"
                                                src="{$usershortinfo[
                                                    'photo_icon'
                                                ]}"
                                                alt="{$usershortinfo[
                                                    'username'
                                                ]}_photo"
                                            />
                                        </div>
                                    {/if}
                                </div>
                            {:else}
                                <div
                                    class="flex  justify-start flex-row-reverse"
                                >
                                    <div
                                        class="flex items-center justify-center h-8 w-8 rounded-full  flex-shrink-0"
                                    >
                                        <img
                                            class="h-6 w-6 rounded-full border-1  mr-1"
                                            src="{$usershortinfo['photo_icon']}"
                                            alt="{$usershortinfo[
                                                'username'
                                            ]}_photo"
                                        />
                                    </div>

                                    <div
                                        class="relative   text-sm bg-rose-600  text-white py-1 px-4   mr-4  shadow-lg rounded-md  float-left "
                                    >
                                        <div class=" max-w-xs break-words">
                                            {msg.content}
                                        </div>
                                    </div>
                                </div>
                            {/if}
                        </div>

                        <!-- <h3>{msg.sender}</h3>
                            <p></p>
                            <sub> {msg.seen} </sub>
                            <button
                                style="float: right;"
                                value="{msg.id}"
                                on:click="{deleteMessageHandler}">del</button
                            >
                            <span>{moment(msg.timestamp).fromNow()}</span>
                         -->
                    {:else}
                        <div class="col-start-1 col-end-8 p-2 rounded-lg">
                            <!-- <div class="flex flex-row items-center">
                                <div
                                    class="flex items-center justify-center h-8 w-8 rounded-full  flex-shrink-0"
                                >
                                    <img
                                        class="h-6 w-6 rounded-full border-1"
                                        src="{$chating_with['photo_icon']}"
                                        alt="{$chating_with['username']}_photo"
                                    />
                                </div>
                                <div
                                    class="relative ml-3 text-sm bg-white text-rose-600  py-1 px-4 dark:shadow-gray-500 shadow-lg rounded-md"
                                >
                                    <div>{msg.content}</div>
                                </div>
                            </div>
                        </div> -->
                            <!-- <h3>{msg.sender}</h3>
                        <p></p>
                        <span>{moment(msg.timestamp).fromNow()}</span>
                         -->
                            {#if msg.photos.length !== 0}
                                <div class="flex flex-row items-end ">
                                    {#if msg.content !== ''}
                                        <div
                                            class="flex items-center justify-center h-8 w-8 rounded-full  flex-shrink-0"
                                        >
                                            <img
                                                class="h-6 w-6 rounded-full border-1 "
                                                src="{$chating_with[
                                                    'photo_icon'
                                                ]}"
                                                alt="{$chating_with[
                                                    'username'
                                                ]}_photo"
                                            />
                                        </div>
                                        <div class="grid ">
                                            {#each msg.photos as photo}
                                                <div class="py-1 px-4  ">
                                                    <img
                                                        class="w-52 h-64 border-2 border-slate-700 shadow-lg rounded-md float-left"
                                                        src="{photo.photo}"
                                                        alt="{photo}"
                                                    />
                                                </div>
                                            {/each}
                                            <div
                                                class="relative   text-sm bg-rose-600  text-white py-1 px-4   ml-4  shadow-lg rounded-md  float-left"
                                            >
                                                <div
                                                    class="max-w-xs break-words"
                                                >
                                                    {msg.content}
                                                </div>
                                            </div>
                                        </div>
                                    {:else}
                                        <div
                                            class="flex items-center justify-center h-8 w-8 rounded-full  flex-shrink-0"
                                        >
                                            <img
                                                class="h-6 w-6 rounded-full border-1 "
                                                src="{$chating_with[
                                                    'photo_icon'
                                                ]}"
                                                alt="{$chating_with[
                                                    'username'
                                                ]}_photo"
                                            />
                                        </div>
                                    {/if}
                                </div>
                            {:else}
                                <div class="flex flex-row items-center">
                                    <div
                                        class="flex items-center justify-center h-8 w-8 rounded-full  flex-shrink-0"
                                    >
                                        <img
                                            class="h-6 w-6 rounded-full border-1 "
                                            src="{$chating_with['photo_icon']}"
                                            alt="{$chating_with[
                                                'username'
                                            ]}_photo"
                                        />
                                    </div>

                                    <div
                                        class="relative ml-3 text-sm bg-rose-600 text-white py-1 px-4 shadow-lg rounded-md "
                                    >
                                        <div class="max-w-xs break-words">
                                            {msg.content}
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
    <FullInput
        sendFunc="{sendMessage}"
        placeholder="Write your message . . ."
    />
</Wapper>

<style>
    #room:hover {
        overflow-y: overlay;
    }
</style>

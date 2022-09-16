<script>
    import {
        contact_list,
        getChatContacts,
        messagesLoaded,
    } from './../../stores/chats/chat';
    import { push } from 'svelte-spa-router';
    import { onMount } from 'svelte';
    import { location } from 'svelte-spa-router';
    import Loader from '../ui/Loader.svelte';
    import FaLayersText from 'svelte-fa/src/fa-layers-text.svelte';
    import moment from 'moment';

    const getChatRoom = async (e) => {
        await push(`/chat/${e.target.name}`);
    };
    onMount(async () => {
        await getChatContacts();
        messagesLoaded.set(true);
    });

    
    const onlineIcon = (on) => {
        if (on) return 'rgb(0, 200, 0)';
        else return 'red';
    };
</script>

{#if $messagesLoaded}
    <div
        class="text-black border-black dark:border-white dark:text-white flex border-2 
        flex-col mt-0 mx-2  sm:mx-auto lg:justify-center md:max-w-2xl lg:w-6/12 pt-4 my-auto"
    >
        {#each $contact_list as contact}
            <div
                class="flex w-11/12 mx-auto p-1 bg-slate-100 hover:bg-slate-200 rounded-2xl"
            >
                <div class="w-9/12 flex space-x-3 xs:space-x-0 ">
                    <div class="w-3/12 sm:w-2/12 flex space-x-2">
                        <img
                            on:click="{getChatRoom}"
                            name="{contact['profile']['username']}"
                            src="{`http://127.0.0.1:1111${contact['profile']['photo_icon']}`}"
                            alt="aza"
                            class="w-10 h-10 rounded-full cursor-pointer mt-1 border-2 shadow-md border-rose-600"
                        />

                        <div>
                            <FaLayersText
                                translateX="{-1.4}"
                                translateY="{1.7}"
                                color="white"
                                style="padding:6px;  background: {onlineIcon(
                                    contact['online']
                                )}
                               ; border-radius: 100%; "
                            />
                        </div>
                        {#if contact['unread_messages'] !== 0}
                            <div>
                                <FaLayersText
                                    translateX="{-3}"
                                    translateY="{-0.3}"
                                    color="white"
                                    style="padding:0px 5px; background: red; border-radius: 100%; font-size:12px;"
                                >
                                    <p>{contact['unread_messages']}</p>
                                </FaLayersText>
                            </div>
                        {/if}
                    </div>
                    <div class="flex flex-col">
                        <div>
                            <button
                                on:click="{getChatRoom}"
                                class=" outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-100 
                                text-black dark:text-white text-xl"
                                name="{contact['profile']['username']}"
                                >{contact['profile']['username']}</button
                            >
                        </div>

                        <div class="text-sm text-gray-600 dark:text-gray-300">
                            {#if contact['last_message']}
                                <p>{contact['last_message']}</p>
                            {:else}
                                <p>
                                    you can now chat with {contact['profile'][
                                        'username'
                                    ]}
                                </p>
                            {/if}
                        </div>
                    </div>
                </div>

                {#if !contact['online']}
                    <div class="my-auto">
                        <p>
                            {moment(contact['last_seen']).fromNow()}
                        </p>
                    </div>
                {/if}
            </div>
            <br />
        {/each}
    </div>
{:else}
    <Loader />
{/if}

<script>
    import Text from './ui/Text.svelte';
    import {
        faHome,
        faBell,
        faEnvelope,
    } from '@fortawesome/free-solid-svg-icons';

    import Fa from 'svelte-fa/src/fa.svelte';
    import FaLayers from 'svelte-fa/src/fa-layers.svelte';
    import FaLayersText from 'svelte-fa/src/fa-layers-text.svelte';
    import Button from './ui/Button.svelte';
    import {
        usershortinfo,
        setLogedOut,
        userinfo,
        config,
    } from './../stores/accounts/auth';
    import { link } from 'svelte-spa-router';
    import Recommended from './accounts/Recommended.svelte';
    import axios from 'axios';
    import { baseurl } from './functions';
    import { writable } from 'svelte/store';
    import { unread_messages } from './../stores/chats/chat';
    import { unread_notifications } from './../stores/notifications/notifications';

    let recommended = writable([{}]);
    axios(`${baseurl}/accounts/suggestedusers/user_user/3/`, config).then(
        (res) => {
            recommended.set(res.data);
        }
    );
</script>

<div
    class="flex md:justify-end md:max-w-xs dark:text-white bg-white 
     dark:bg-slate-800 justify-center pr-1 mx-auto flex-col md:float-right md:space-y-6 mt-0"
>
    <div
        class="hidden md:flex  bg-white  pt-2 dark:text-white  dark:bg-slate-800  border-2 shadow-md    md:ml-8  md:border-l-rose-500 md:flex-col"
    >
        <div>
            <a href="/profile" use:link class="flex space-x-3">
                <div class="flex space-x-3 ml-6">
                    <img
                        src="{$usershortinfo.photo_icon}"
                        alt="{$usershortinfo.username} photo icon"
                        class="rounded-full w-14 h-14"
                    />
                    <div class="pt-4">
                        <Text>{$usershortinfo.username}</Text>
                    </div>
                </div>
            </a>
            {#if $userinfo.bio === null || $userinfo.bio === ''}
                <div class="flex space-x-4 my-5 justify-center">
                    <Button>Add a bio</Button>
                </div>
            {:else}
                <div class="py-3 px-4 text-justify">
                    <Text>{$userinfo.bio}</Text>
                </div>
            {/if}
        </div>
    </div>
    <div
        class="hidden md:flex  bg-white border-2 shadow-md dark:text-white  dark:bg-slate-800   md:ml-8  md:border-l-rose-500  md:flex-col"
    >
        {#each $recommended as account}
            <Recommended
                icon="{account.photo_icon}"
                username="{account.username}"
                id="{account.id}"
            />
        {/each}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="md:mt-2 mx-auto h-10 mb-3">
            <Button>See more</Button>
        </div>
    </div>

    <div
        class="flex  bg-white gap-6  pt-6 pb-2  border-2  shadow-md   
    md:float-right  md:ml-8   md:border-l-rose-500  md:space-y-3  md:flex-col dark:text-white  dark:bg-slate-800"
    >
        <!-- <Card> -->
        <div
            class="flex flex-1 md:pl-5 md:-mt-8 md:-mb-4 gap-7 sm:gap-0 sm:space-x-3  md:flex-col md:space-y-2"
        >
            <br />
            <a href="/" use:link class="flex space-x-3">
                <Text icon="{faHome}"><p class="hidden sm:inline">Home</p></Text
                >
            </a>
            <a href="/chat" use:link class="flex space-x-3">
                <Text
                    ><FaLayers size="lg">
                        <Fa icon="{faEnvelope}" />
                        {#if $unread_messages !== 0}
                            <FaLayersText
                                scale="{0.6}"
                                translateX="{0.6}"
                                translateY="{-0.8}"
                                color="white"
                                style="padding: 7px; background: red; border-radius: 1em"
                            >
                                {$unread_messages}
                            </FaLayersText>
                        {/if}
                    </FaLayers>
                    <p class="hidden sm:inline">Chat</p>
                </Text>
            </a>
            <a href="/notifications" use:link class="flex space-x-3">
                <Text>
                    <FaLayers size="lg">
                        <Fa icon="{faBell}" />
                        {#if $unread_notifications !== 0}
                            <FaLayersText
                                scale="{0.6}"
                                translateX="{0.6}"
                                translateY="{-0.8}"
                                color="white"
                                style="padding: 7px; background: red; border-radius: 1em"
                            >
                                {$unread_notifications}
                            </FaLayersText>
                        {/if}
                    </FaLayers>
                    <p class="hidden sm:inline">Notifications</p></Text
                >
            </a>
            <div class="flex  justify-center  md:hidden  ">
                <a href="/profile" use:link class="flex space-x-3">
                    <div>
                        <img
                            src="{$usershortinfo.photo_icon}"
                            alt="{$usershortinfo.username} photo icon"
                            class="h-8 w-8 -mt-1 rounded-full"
                        />
                    </div>
                    <div class="hidden sm:inline">
                        <Text>Profile</Text>
                    </div>
                </a>
            </div>

            <!-- </Card> -->
        </div>
        <div class=" -mt-2 mr-3  md:mx-auto ">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div on:click="{setLogedOut}"><Button>Logout</Button></div>
        </div>
    </div>
</div>

<script>
    import { push } from 'svelte-spa-router';
    import { afterUpdate, onMount } from 'svelte';
    import { fly } from 'svelte/transition';
    import Loader from '../ui/Loader.svelte';
    import moment from 'moment';
    import Wapper from '../Wapper.svelte';
    import NoThing from '../ui/NoThing.svelte';
    import {
        notificationsLoaded,
        notificationsList,
        unread_notifications,
    } from '../../stores/notifications/notifications';
    import { nexturlNotifications } from '../../stores/tools';
    import { config } from '../../stores/accounts/auth';
    import axios from 'axios';
    import { baseurl } from '../functions';
    import SearchSection from '../ui/SearchSection.svelte';

    onMount(async () => {
        moment.locale('fr');
        await axios(`${baseurl}/notifications/`, config).then((res) => {
            nexturlNotifications.set(res.data['next']);
            notificationsList.set(res.data['results']);
            notificationsLoaded.set(true);
        });
    });
    const searchFunc = async (search) => {
        if (search.trim().length !== 0) {
            await axios(
                `${baseurl}/notifications/?search=${search}`,
                config
            ).then((res) => {
                nexturlNotifications.set(res.data['next']);
                notificationsList.set(res.data['results']);
            });
        }
    };

    $: {
        if ($unread_notifications) {
            axios(`${baseurl}/notifications/`, config).then((res) => {
                nexturlNotifications.set(res.data['next']);
                notificationsList.set(res.data['results']);
                notificationsLoaded.set(true);
            });
        }
    }
    let y = 0,
        yy = 0;

    $: {
        if (yy - 50 === y - 50) {
            if ($nexturlNotifications) {
                axios($nexturlNotifications, config).then(async (res) => {
                    let data = [];
                    notificationsList.subscribe((notifications) => {
                        data = notifications;
                    });
                    data = [...data, ...res.data['results']];
                    await notificationsList.set(data);
                    nexturlNotifications.set(res.data['next']);
                });
                yy = yy - 40;
            }
        }
    }
    const notificationChoices = {
        liked: 'liked',
        commented: 'commented',
        comment_liked: 'comment_liked',
        replied: 'replied',
        reply_liked: 'reply_liked',
        followed: 'followed',
        event: 'event',
    };
    const makeread = (id) => {
        axios(
            `${baseurl}/notifications/make/read/${id != null ? id + '/' : ''}`,
            config
        ).then((res) => {
            if (id !== null)
                unread_notifications.set($unread_notifications - 1);
            else unread_notifications.set(0);
        });
        if (id === null) {
            notificationsList.update((notifications) =>
                notifications.map((notification) => {
                    notification['seen'] = true;
                    return notification;
                })
            );
        } else {
            notificationsList.update((notifications) =>
                notifications.map((notification) => {
                    if (notification['id'] === id) notification['seen'] = true;
                    return notification;
                })
            );
        }
    };
    const notificationFormat = (notification) => {
        if (notification['action'] === notificationChoices.comment_liked) {
            return `Liked your comment: "${notification['comment'][0]}".`;
        } else if (notification['action'] === notificationChoices.commented) {
            return `Left a comment on your post: "${notification['post'][0]}".`;
        } else if (notification['action'] === notificationChoices.event) {
            return `Start an event about: "${notification['event_made'][0]}".`;
        } else if (notification['action'] === notificationChoices.followed) {
            return `Started following you .`;
        } else if (notification['action'] === notificationChoices.liked) {
            return `Liked your post: "${notification['post'][0]}".`;
        } else if (notification['action'] === notificationChoices.replied) {
            return `Replied on your comment: "${notification['comment'][0]}".`;
        } else if (notification['action'] === notificationChoices.reply_liked) {
            return `Liked your reply: "${notification['reply'][0]}".`;
        }
    };

    const getLink = (notification) => {
        if (notification['seen'] === false) makeread(notification['id']);
        if (
            notification['action'] === notificationChoices.comment_liked ||
            notification['action'] === notificationChoices.replied
        ) {
            push(`/post/${notification['comment'][2]}/`);
        } else if (notification['action'] === notificationChoices.reply_liked) {
            push(`/post/${notification['reply'][2]}/`);
        } else if (
            notification['action'] === notificationChoices.liked ||
            notification['action'] === notificationChoices.commented
        ) {
            push(`/post/${notification['post'][1]}/`);
        } else if (notification['action'] === notificationChoices.event) {
            push(`/profile/${notification['event']['id']}/`);
        } else if (notification['action'] === notificationChoices.followed) {
            push(
                `/${notification['created_by']['ftype']}/${notification['created_by']['username']}/`
            );
        }
    };
</script>

{#if $notificationsLoaded}
    <Wapper>
        <div
            class=" mt-3 mx-auto w-full min-h-[34rem] overflow-hidden px-2 dark:text-black "
            id="chatHome"
        >
            <!-- <div class="flex flex-col relative mt-4 ">
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
            </div> -->
            <!-- <div class="flex ">
                <div
                    class="flex w-full mt-2 px-1 justify-center items-center  "
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
            <SearchSection searchFunc="{searchFunc}" />

            <div
                class="flex-1 text-white bg-rose-600 text-center  p-1 mt-2 ml-1 cursor-pointer rounded-lg"
                on:click="{() => makeread(null)}"
                on:keypress="{() => {}}"
            >
                <span class="w-full justify-center  ">
                    make all notification as read
                </span>
            </div>
            {#if $notificationsList.length !== 0}
                <ul
                    class="flex flex-col mt-4 space-y-1.5 ml-1 overflow-hidden h-[34rem] hover:hover:pr-3"
                    bind:clientHeight="{y}"
                    on:scroll="{(e) => {
                        yy = e.target['scrollHeight'];
                        y = e.target['scrollTop'] + e.target['clientHeight'];
                    }}"
                    id="homenotification"
                >
                    {#each $notificationsList as notification, i}
                        <li
                            in:fly="{{ y: 50, duration: (i % 10) * 200 }}"
                            class="flex flex-row rounded-md shadow-md   items-center relative cursor-pointer {!notification[
                                'seen'
                            ]
                                ? 'dark:bg-slate-500 dark:hover:bg-slate-600 bg-rose-200 hover:bg-rose-300 '
                                : 'dark:bg-gray-700 bg-gray-100'} py-4 px-2"
                            on:click="{() => getLink(notification)}"
                            on:keypress="{() => {}}"
                        >
                            <div class="relative flex-shrink-0 cursor-pointer">
                                <span
                                    on:click="{() => {}}"
                                    on:keypress="{(e) => {}}"
                                    id="{notification['created_by'][
                                        'username'
                                    ]}"
                                    class="flex rounded-full w-10 h-10"
                                >
                                    <div
                                        style="background-image: url({notification[
                                            'created_by'
                                        ]['photo_icon']})"
                                        title="{notification['created_by'][
                                            'username'
                                        ]}_photo"
                                        class="w-full h-full rounded-full bg-cover bg-center"
                                    ></div>
                                </span>
                            </div>
                            <div
                                class="flex flex-col ml-4 text-black space-y-1 dark:text-white"
                            >
                                <span
                                    class="flex flex-row flex-1 space-x-2  items-center"
                                >
                                    <span>
                                        <h3
                                            class="font-bold cursor-pointer text-rose-400 text-lg"
                                            on:click="{() => {}}"
                                            on:keypress="{() => {}}"
                                            id="{notification['created_by'][
                                                'username'
                                            ]}"
                                        >
                                            {notification['created_by'][
                                                'username'
                                            ]}
                                        </h3>
                                    </span>
                                    <span class="text-md line-clamp-1"
                                        >{notificationFormat(
                                            notification
                                        )}</span
                                    >
                                </span>
                                <p
                                    class="dark:text-gray-300 text-gray-700 text-xs "
                                >
                                    {moment(notification['created']).fromNow()}
                                </p>
                            </div>
                        </li>
                    {/each}
                </ul>
            {:else}
                <div class="my-2">
                    <NoThing
                        dSVG="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
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
    #homenotification:hover {
        overflow-y: overlay;
        z-index: 12;
    }
</style>

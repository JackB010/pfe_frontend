<script>
    import {
        usershortinfo,
        setLogedOut,
        selectedByNav,
    } from '../stores/accounts/auth';
    import { link, push, location } from 'svelte-spa-router';
    import { unread_messages } from '../stores/chats/chat';
    import { unread_notifications } from '../stores/notifications/notifications';
    import Number from './Number.svelte';
    import { backurls } from './../stores/tools';

    $: isActive = false;
    $: {
        backurls.update((data) => [...data, $location]);
    }
</script>

<div
    class="flex flex-wrap mx-auto md:-mt-4 w-full md:w-[73%] lg:w-[60%] pt-1 border-b-rose-600"
>
    <div class="min-w-full">
        <div
            class="relative flex flex-col h-14 break-words bg-white dark:bg-slate-800
             dark:text-white mb-5 shadow rounded border-b-2 border-b-rose-600"
        >
            <div class="flex bg-white px-1 dark:text-white dark:bg-slate-800">
                <div
                    class="flex items-center space-x-7 md:space-x-4 py-2.5 w-full"
                >
                    <div class="flex">
                        <a
                            href="/"
                            class="flex items-end cursor-pointer"
                            use:link
                        >
                            <div
                                class="flex items-end space-x-2 hover:text-rose-600"
                            >
                                <div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="2"
                                        stroke="currentColor"
                                        class="w-6 h-6 bg-gray-100 dark:bg-black rounded-full p-0.5"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                                        ></path>
                                    </svg>
                                </div>
                                <div class="hidden sm:inline">Accueil</div>
                            </div>
                        </a>
                    </div>
                    <div>
                        {#if $usershortinfo.ftype === 'page'}
                            <a
                                href="/events"
                                class="flex items-end cursor-pointer space-x-2"
                                use:link
                            >
                                <div class="flex space-x-3 hover:text-rose-600">
                                    <div class="relative">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="w-6 h-6 bg-gray-100 dark:bg-black rounded-full p-0.5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            on:click="{() =>
                                                push('/event/add')}"
                                            on:keypress="{() => {}}"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            ></path>
                                        </svg>
                                    </div>
                                    <div class="hidden sm:inline">
                                        Événements
                                    </div>
                                </div></a
                            >
                        {:else}
                            <a
                                href="/chat"
                                class="flex items-end cursor-pointer space-x-2"
                                use:link
                            >
                                <div class="flex space-x-3 hover:text-rose-600">
                                    <div class="relative">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="w-6 h-6 bg-gray-100 dark:bg-black rounded-full p-0.5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            ><path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                                            ></path></svg
                                        >
                                        {#if $unread_messages !== 0}
                                            <div
                                                class="absolute text-white w-fit h-fit top-3 right-0 bg-red-600 text-sm rounded-full"
                                            >
                                                <Number
                                                    number="{$unread_messages}"
                                                />
                                            </div>
                                        {/if}
                                    </div>
                                    <div class="hidden sm:inline">Chat</div>
                                </div>
                            </a>
                        {/if}
                    </div>
                    <div>
                        <a
                            href="/notifications"
                            use:link
                            class="flex items-end cursor-pointer space-x-2"
                        >
                            <div class="flex space-x-3 hover:text-rose-600">
                                <div class="relative">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="2"
                                        stroke="currentColor"
                                        class="w-6 h-6 bg-gray-100 dark:bg-black rounded-full p-0.5"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                        ></path>
                                    </svg>
                                    {#if $unread_notifications !== 0}
                                        <div
                                            class="absolute text-white w-fit h-fit top-3 right-0 bg-red-600 text-sm rounded-full"
                                        >
                                            <p class=" px-1">
                                                <Number
                                                    number="{$unread_notifications}"
                                                />
                                            </p>
                                        </div>
                                    {/if}
                                </div>
                                <div class="hidden sm:inline">
                                    Notifications
                                </div>
                            </div>
                        </a>
                    </div>
                    <div>
                        <a
                            href="/friends"
                            use:link
                            class="flex items-end cursor-pointer space-x-2"
                        >
                            <div class="flex space-x-3 text-rose-600">
                                <div class="relative">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="2"
                                        stroke="currentColor"
                                        class="w-6 h-6 rounded-full p-0.5"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                                        ></path>
                                    </svg>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class=" flex-1">
                        <div class="flex items-center float-right space-x-2">
                            <a
                                href="{`/${$usershortinfo.ftype}/${$usershortinfo.username}`}"
                                use:link
                                on:click="{() => {
                                    selectedByNav.set(true);
                                }}"
                                class="flex cursor-pointer space-x-2 pr-3 w-fit"
                            >
                                <div class="w-fit">
                                    <div
                                        style="background-image: url({$usershortinfo.photo_icon})"
                                        class="{$usershortinfo.ftype ===
                                        'profile'
                                            ? 'rounded-full'
                                            : 'rounded-lg'} h-8 w-8 -mt-1 border bg-cover bg-center cursor-pointer"
                                    ></div>
                                </div>
                                <div
                                    class="hidden sm:inline hover:text-rose-600"
                                >
                                    <div>Profil</div>
                                </div>
                            </a>
                            <div
                                on:click="{() => (isActive = !isActive)}"
                                on:keypress="{() => {}}"
                                class="pr-2 cursor-pointer w-fit h-fit"
                            >
                                <svg
                                    class="w-6 h-6 transition-transform transform bg-gray-100 dark:bg-black rounded-full
                                    p-0.5 {isActive ? '' : 'rotate-180'}"
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
                            </div>
                        </div>
                        <div
                            class="relative {isActive ? '' : 'hidden'} "
                            on:mouseleave="{(e) => {
                                isActive = false;
                            }}"
                        >
                            <div
                                class=" absolute top-9 right-2 z-50 w-56 py-1 mb-4 h-fit rounded shadow-lg min-w-max ring-1 ring-black ring-opacity-25 dark:bg-dark focus:outline-none bg-white dark:bg-slate-900 dark:text-white"
                            >
                                <span
                                    on:click="{() => {
                                        selectedByNav.set(true);

                                        push(
                                            `/${$usershortinfo.ftype}/${$usershortinfo.username}`
                                        );
                                        isActive = false;
                                    }}"
                                    on:keypress="{() => {}}"
                                    class="flex px-4 py-2 text-sm transition-colors hover:bg-gray-100 dark:text-light dark:hover:bg-rose-600 space-x-2 cursor-pointer"
                                >
                                    <div
                                        style="background-image: url({$usershortinfo.photo_icon})"
                                        class="{$usershortinfo.ftype ===
                                        'profile'
                                            ? 'rounded-full'
                                            : 'rounded-lg'} h-5 w-5 border bg-cover bg-center cursor-pointer"
                                    ></div>
                                    <span> Profil</span>
                                </span>
                                <span
                                    on:click="{() => {
                                        selectedByNav.set(true);

                                        push(
                                            `/${$usershortinfo.ftype}/${$usershortinfo.username}/settings`
                                        );
                                    }}"
                                    on:keypress="{() => {}}"
                                >
                                    <span
                                        class="flex px-4 py-2 text-sm transition-colors hover:bg-gray-100 dark:text-light dark:hover:bg-rose-600 space-x-2 cursor-pointer"
                                    >
                                        <span
                                            ><svg
                                                class="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                                ></path>
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                ></path>
                                            </svg></span
                                        >
                                        <span>Paramètres</span>
                                    </span>
                                </span>
                                <span
                                    on:click="{setLogedOut}"
                                    on:keypress="{() => {}}"
                                    class="px-4 py-2 text-sm transition-colors hover:bg-gray-100 dark:text-light dark:hover:bg-rose-600 flex space-x-2 cursor-pointer"
                                >
                                    <span
                                        ><svg
                                            class="w-5 h-5 font-semibold"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                            ><path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                            ></path></svg
                                        ></span
                                    ><span>Se déconnecter</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

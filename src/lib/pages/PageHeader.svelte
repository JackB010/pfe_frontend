<script>
    import Wapper from '../Wapper.svelte';
    import Number from '../Number.svelte';
    import {
        config,
        isLoggin,
        usershortinfo,
    } from '../../stores/accounts/auth';
    import axios from 'axios';
    import { baseurl } from '../functions';
    import { push } from 'svelte-spa-router';
    import UserFollow from '../accounts/UserFollow.svelte';
    import moment from 'moment';
    import { onMount } from 'svelte';

    export let userdata = {};
    let selected = false;
    let is_owner_profile = false,
        is_owner = false,
        usersettings = {};
    $: {
        if ($isLoggin) {
            is_owner = userdata['user'].username === $usershortinfo['username'];
        }
    }

    $: {
        if ($isLoggin) {
            axios(`${baseurl}/pages/settings/${userdata['id']}/`, config).then(
                (res) => {
                    usersettings = res.data;
                }
            );
            userdata['owners_list'].forEach((element) => {
                if ($usershortinfo['username'] === element['username'])
                    is_owner_profile = true;
            });
        }
    }

    let isActive = false;
    const followUser = () => {
        if (!is_owner) {
            let userftype =
                $usershortinfo.ftype === 'profile' ? 'user' : 'page';
            // ftype = ftype === 'profile' ? 'user' : 'page';
            axios
                .post(
                    `${baseurl}/accounts/follow/${userftype}_page/`,
                    {
                        username: userdata['user'].username,
                    },
                    config
                )
                .then((res) => {
                    userdata['is_following'] = !userdata['is_following'];

                    userdata['count_followed_by'] =
                        userdata['count_followed_by'] +
                        (userdata['is_following'] ? 1 : -1);
                });
        }
    };
    let searchedUser = [],
        done = false,
        search = '';
    const SearchUser = (e) => {
        axios(`${baseurl}/accounts/search/?search=${search}`).then((res) => {
            searchedUser = res['data']['results'];
            done = true;
        });
    };
    const makeOwner = (user, deleted) => {
        let found = false;
        userdata['owners_list'].forEach((item) => {
            if (item.username === user.username) {
                found = true;
                selected = false;
                done = false;
                search = '';
            }
        });
        if (!found || deleted) {
            axios
                .post(
                    `${baseurl}/pages/owners/`,
                    { username: user.username },
                    config
                )
                .then((res) => {
                    done = true;
                    if (deleted) {
                        userdata['owners_list'] = userdata[
                            'owners_list'
                        ].filter((item) => {
                            if (item.username != user.username) return user;
                        });
                        if (userdata['owners_list'].length == 0) {
                            isActive = false;
                        }
                    } else {
                        userdata['owners_list'].push(user);
                        selected = false;
                    }
                    userdata['owners_list'].length =
                        userdata['owners_list'].length;
                });
        }
    };
</script>

<Wapper>
    <div class="border my-2 rounded">
        <div class="  mx-auto w-11/12 p-4">
            <div class="flex flex-row items-center">
                <div
                    style="background-image: url({userdata['photo']})"
                    class="sm:w-32 sm:h-32 w-24 h-24 bg-cover bg-center rounded-lg border-4 object-cover shadow"
                ></div>

                <div class="flex-1">
                    <div
                        class="flex-1 space-x-2 sm:space-x-10 mb-4 flex pb-3 items-center border-b w-fit mx-auto"
                    >
                        <span
                            on:click="{() => {
                                push(
                                    `/page/${userdata['user'].username}/following/`
                                );
                            }}"
                            on:keypress="{(e) => {}}"
                            class="text-xs text-gray-700 dark:text-white cursor-pointer"
                            ><span class="font-bold text-sm"
                                ><Number
                                    number="{userdata['count_following']}"
                                /></span
                            > Abonnement</span
                        >
                        <div class="w-0 h-4 border border-gray-300"></div>
                        <span
                            on:click="{() => {
                                push(
                                    `/page/${userdata['user'].username}/followers/`
                                );
                            }}"
                            on:keypress="{(e) => {}}"
                            class="text-xs text-gray-700 dark:text-white cursor-pointer"
                            ><span class="font-bold text-sm"
                                ><Number
                                    number="{userdata['count_followed_by']}"
                                /></span
                            > Abonnés</span
                        >
                    </div>

                    <div
                        class="flex-1 {is_owner
                            ? 'space-x-2'
                            : 'sm:space-x-6 space-x-3'} flex w-fit mx-auto items-center"
                    >
                        <span
                            on:click="{followUser}"
                            on:keypress="{() => {}}"
                            class="
                              sm:px-3 px-2 text-xs sm:text-sm h-fit w-fit py-1 rounded shadow font-medium justify-center
                                {is_owner ||
                            !$isLoggin ||
                            (usersettings.followers_limit &&
                                usersettings.followers_limit_num ===
                                    userdata['count_followed_by'])
                                ? 'cursor-not-allowed bg-gray-200 text-black pointer-events-none'
                                : 'cursor-pointer'}
                                {userdata['is_following'] && !is_owner
                                ? ' ring-2 ring-rose-600 '
                                : 'bg-rose-600'} {!userdata['is_following']
                                ? 'text-white'
                                : ''}"
                            >{#if userdata['is_following'] && !is_owner}Se
                                désabonner{:else}S'abonner{/if}</span
                        >
                        <span
                            on:click="{() => {
                                if (!is_owner)
                                    push(`/chat/${userdata['user'].username}`);
                            }}"
                            on:keypress="{(e) => {}}"
                            class="sm:px-3 px-2 text-xs sm:text-sm h-fit w-fit py-1 rounded shadow justify-center font-medium
                            cursor-not-allowed bg-gray-200 text-black pointer-events-none
                                ">Contact</span
                        >
                        {#if is_owner}
                            <span
                                ><svg
                                    class="h-4 w-4 sm:w-6 sm:h-6 text-gray-700 dark:text-white cursor-pointer"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                    on:click="{() => {
                                        push(
                                            `/${$usershortinfo.ftype}/${$usershortinfo.username}/settings`
                                        );
                                    }}"
                                    on:keypress="{() => {}}"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    ></path>
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                    ></path></svg
                                ></span
                            >{/if}
                    </div>
                </div>
            </div>
            <div class=" pr-1 pl-4 mt-3">
                <div class="text-gray-400 text-xs">
                    <span
                        >Rejoint depuis <span>
                            {moment(userdata['user'].date_joined).fromNow()}
                        </span></span
                    >
                </div>
                <div class="font-medium text-2xl mt-1 text-rose-600">
                    {userdata['user'].username}
                </div>

                {#if userdata['user'].first_name !== '' || userdata['user'].last_name !== ''}
                    <div class="mb-2 text-sm font-normal text-rose-400">
                        {userdata['user'].first_name}
                        {userdata['user'].last_name}
                    </div>
                {/if}
                <div
                    class=" my-2 font-light text-sm text-gray-700 dark:text-gray-300"
                >
                    <p>
                        <span class="text-rose-600">À propos de la page:</span>
                        {userdata['about']}
                    </p>
                </div>
                {#if userdata['bio']}
                    <div class=" my-2 font-light text-sm">
                        <p>
                            <span class="text-rose-600">Bio:</span>
                            {userdata['bio']}
                        </p>
                    </div>
                {/if}
                <div class="">
                    <span class=" pt-2 text-xs sm:text-base w-fit"
                        >Profils synchronisés <span
                            class="bg-rose-600 text-white px-2 py-0.5 rounded-full"
                            >{userdata['owners_list'].length}</span
                        >
                        {#if $isLoggin}
                            <span class="ml-auto">
                                <svg
                                    class="w-4 h-4 cursor-pointer text-rose-600 inline transition-transform transform {isActive
                                        ? ''
                                        : 'rotate-180'}"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    on:click="{() => {
                                        isActive = !isActive;
                                        selected = false;
                                    }}"
                                    on:keypress="{() => {}}"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2.5"
                                        d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </span>
                        {/if}
                        {#if is_owner}
                            <span
                                class="text-xl ml-1 cursor-pointer text-rose-600"
                                on:click="{() => {
                                    selected = !selected;
                                    search = '';
                                    isActive = false;
                                    searchedUser = [];
                                }}"
                                on:keypress="{() => {}}"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-6 w-6 inline transition-transform ease-in-out duration-150 {selected
                                        ? 'rotate-45'
                                        : ''}"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                </svg>
                            </span>
                        {/if}
                    </span>
                    {#if isActive && userdata['owners_list'].length > 0}
                        <div class="relative z-[9999999]">
                            <div
                                class="absolute w-full mx-auto h-[8.6rem] dark:bg-slate-800 bg-white overflow-y-scroll top-0 shadow-lg rounded-lg dark:border overflow-x-hidden mt-2"
                            >
                                {#if usersettings.show_owners || is_owner}
                                    {#each userdata['owners_list'] as user}
                                        <div
                                            class=" flex flex-row items-center"
                                        >
                                            <div class="flex-1">
                                                <UserFollow user="{user}" />
                                            </div>
                                            {#if is_owner}
                                                <div
                                                    class="cursor-pointer"
                                                    on:click="{() => {
                                                        makeOwner(user, true);
                                                    }}"
                                                    on:keypress="{() => {}}"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        class="h-6 w-6 rotate-45 bg-red-600 text-white rounded-full mx-1"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            stroke-width="2.5"
                                                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                                        ></path>
                                                    </svg>
                                                </div>
                                            {/if}
                                        </div>
                                    {/each}
                                {/if}
                            </div>
                        </div>
                    {/if}
                    <div class="mt-2 text-xs sm:text-base">
                        <span>
                            <svg
                                fill="none"
                                viewBox="0 0 24 24"
                                class="w-5 h-5 inline
                                fill-rose-600 text-rose-600"
                                stroke="currentColor "
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                ></path>
                            </svg></span
                        >
                        J'aime au total {userdata['num_total_likes']}
                    </div>
                    {#if is_owner || is_owner_profile}
                        <div
                            class="mt-2 text-xs sm:text-base cursor-pointer w-fit"
                            on:click="{() => {
                                push(
                                    `/${$usershortinfo.ftype}/${userdata['user'].username}/saved`
                                );
                            }}"
                            on:keypress="{(e) => {}}"
                        >
                            <span>
                                <svg
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    class="w-5 h-5 inline
                                fill-yellow-300 text-yellow-300"
                                    stroke="currentColor "
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                                    ></path>
                                </svg></span
                            >
                            Nombre total de posts enregistrées {userdata[
                                'num_total_saved'
                            ]}
                        </div>
                    {/if}
                    <div>
                        <div
                            class="  flex flex-row flex-wrap mb-3 space-x-1 mt-3"
                        >
                            {#each userdata['categories'] as categorie}
                                <span
                                    on:click="{() => {
                                        push(`/page/categorie/${categorie}`);
                                    }}"
                                    on:keypress="{() => {}}"
                                    class="dark:bg-rose-600 cursor-pointer shadow-md mb-2 text-rose-600 dark:text-white text-sm sm:text-sm p-1.5 font-semibold w-fit"
                                >
                                    <span class="py-1">{categorie}</span>
                                </span>
                            {/each}
                        </div>
                    </div>
                </div>
                <div class="flex p-4 mt-4">
                    <div class="w-fit mx-auto text-center text-xs sm:text-base">
                        <span class="font-bold"
                            ><Number
                                number="{userdata['num_total_posts']}"
                            /></span
                        > Posts
                    </div>

                    <div class="w-0 border border-gray-300"></div>
                    <div
                        class="mx-auto text-xs sm:text-base text-center cursor-pointer w-fit"
                    >
                        <span class="font-bold"
                            ><Number
                                number="{userdata['num_total_events']}"
                            /></span
                        > Événements
                    </div>
                </div>
            </div>
        </div>
    </div>
</Wapper>

{#if selected}
    <!-- <div></div> -->
    <!-- <div class="relative "> -->
    <div
        class=" absolute top-[56%] -translate-x-1/2 left-1/2 w-96 py-1 mb-4 h-52 z-[100000000000] rounded shadow min-w-max ring-1 ring-black ring-opacity-25 dark:bg-dark focus:outline-none bg-white dark:bg-slate-900 dark:text-white overflow-y-scroll"
    >
        <span
            class="flex px-1 text-sm items-center transition-colors dark:text-light space-x-2 cursor-pointer"
        >
            <form
                class="w-full flex border-b-2 border-rose-600"
                on:submit|preventDefault="{SearchUser}"
            >
                <input
                    class="h-10 flex-1 text-base text-rose-700
                                     pl-4 outline-none focus:outline-none"
                    bind:value="{search}"
                    placeholder="Rechercher une profil"
                />
                <span class="border w-0 h-6 my-auto border-rose-600"></span>
                <button
                    class=" text-rose-600 dark:text-white
                                                          px-2
                                    outline-none focus:outline-none ease-linear transition-all duration-100"
                >
                    <svg
                        class="w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2.5"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        ></path>
                    </svg>
                </button>
            </form>
        </span>

        <span
            class="w-fulll text-sm mt-2 mr-1 ml-0.5 h-full z-50 transition-colors flex flex-col"
        >
            {#if searchedUser.length != 0}
                <div class="h-full">
                    {#each searchedUser as user}
                        <div
                            class="cursor-pointer"
                            on:click="{() => {
                                makeOwner(user, false);
                            }}"
                            on:keypress="{() => {}}"
                        >
                            <UserFollow user="{user}" />
                        </div>
                    {/each}
                </div>
            {:else if done}
                <span
                    class="w-full text-center text-gray-700 dark:text-gray-300 py-4 text-lg"
                    >Aucun utilisateur trouvé</span
                >
            {/if}
        </span>
    </div>
    <!-- </div>
</div> -->
{/if}

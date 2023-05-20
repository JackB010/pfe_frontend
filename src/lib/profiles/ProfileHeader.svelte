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
    import { params, push } from 'svelte-spa-router';
    import UserFollow from '../accounts/UserFollow.svelte';
    import { onMount } from 'svelte';
    import moment from 'moment';
    export let userdata = {};
    let usersettings = {};

    $: is_owner = userdata['user'].username === $usershortinfo['username'];
    let pages = [],
        isActive = false;
    onMount(() => {
        axios(`${baseurl}/accounts/settings/${userdata['id']}/`, config).then(
            (res) => {
                usersettings = res.data;
                if (
                    usersettings.show_pages_owned === 'everyone' ||
                    is_owner ||
                    (usersettings.show_pages_owned === 'followers' &&
                        userdata.is_following)
                )
                    axios(
                        `${baseurl}/accounts/profile/user/pages/${userdata['user'].username}/`,
                        config
                    ).then((res) => {
                        pages = [...res.data];
                    });
            }
        );
    });

    const followUser = () => {
        if (!is_owner)
            axios
                .post(
                    `${baseurl}/accounts/follow/user_user/`,
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
    };
    const syncFunc = () => {
        axios
            .post(
                `${baseurl}/pages/owners/`,
                { username: userdata['user']['username'] },
                config
            )
            .then((res) => {
                userdata['is_sync'] = !userdata['is_sync'];
                let user;
                usershortinfo.subscribe((data) => {
                    user = data;
                    user = user;
                });
                if (userdata['is_sync']) {
                    pages = [...pages, user];
                    pages = pages;
                    userdata['num_total_pages'] =
                        userdata['num_total_pages'] + 1;
                } else {
                    pages = pages.filter(
                        (data) => data['username'] != user['username']
                    );
                    pages = pages;
                    userdata['num_total_pages'] =
                        userdata['num_total_pages'] - 1;
                }
            });
    };
    const oneFunc = ()=>{
        let user = {};
        usershortinfo.subscribe((data) => {
                    user = data;
                    user = user;
                });
        if(user['ftype']=='page') 
                syncFunc();
        else
        followUser();
    }
</script>

<Wapper>
    <div class="border my-2 rounded">
        <div class="  mx-auto w-[94%] p-4">
            <div class="flex flex-row items-center">
                <div
                    style="background-image: url({userdata['photo']})"
                    class="sm:w-32 sm:h-32 w-24 h-24 bg-cover bg-center rounded-full border-4 object-cover shadow"
                ></div>
                <div class="flex-1">
                    <div
                        class="flex-1 space-x-2 sm:space-x-10 mb-4 flex pb-3 items-center border-b w-fit mx-auto"
                    >
                        <span
                            on:click="{() => {
                                push(
                                    `/profile/${userdata['user'].username}/following/`
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
                                    `/profile/${userdata['user'].username}/followers/`
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
                            on:click="{oneFunc}"
                            on:keypress="{() => {}}"
                            class="{is_owner || !$isLoggin
                                ? 'cursor-not-allowed bg-gray-200 text-black pointer-events-none'
                                : 'cursor-pointer'} {(userdata[
                                'is_following'
                            ] &&
                                !is_owner) ||
                            userdata['is_sync']
                                ? 'ring-2 ring-rose-600'
                                : 'bg-rose-600 text-white'}   font-medium sm:px-3 px-2 text-xs sm:text-sm h-fit w-fit py-1 rounded shadow justify-center"
                            >{#if $usershortinfo['ftype'] === 'page'}
                                {#if userdata['is_sync']}désynchroniser{:else}synchroniser{/if}
                            {:else}
                                {#if userdata['is_following'] && !is_owner}Se
                                    désabonner{:else}S'abonner{/if}{/if}</span
                        >
                        <span
                            on:click="{() => {
                                if (!is_owner)
                                    push(`/chat/${userdata['user'].username}`);
                            }}"
                            on:keypress="{(e) => {}}"
                            class="cursor-pointer {is_owner ||
                            !$isLoggin ||
                            $usershortinfo.ftype === 'page'
                                ? 'cursor-not-allowed bg-gray-200 text-black pointer-events-none'
                                : 'cursor-pointer'} sm:px-3 px-2 text-xs sm:text-sm h-fit w-fit py-1 rounded shadow justify-center bg-rose-600 font-medium text-white"
                            >{#if $usershortinfo['ftype'] === 'page'}Contact{:else}Message{/if}</span
                        >
                        {#if is_owner}
                            <span
                                ><svg
                                    class=" h-4 w-4 sm:w-6 sm:h-6 text-gray-700 dark:text-white cursor-pointer"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                    on:click="{() => {
                                        push(
                                            `/profile/${userdata['user'].username}/settings`
                                        );
                                    }}"
                                    on:keypress="{(e) => {}}"
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
                {#if usersettings.show_full_name === 'everyone' || is_owner || (usersettings.show_full_name === 'followers' && userdata.is_following)}
                    {#if userdata['user'].first_name !== '' || userdata['user'].last_name !== ''}
                        <div class="mb-2 text-sm font-normal">
                            {userdata['user'].first_name}
                            {userdata['user'].last_name}
                        </div>
                    {/if}
                {/if}
                {#if userdata['bio']}
                    <div class=" my-2 font-light text-sm">
                        <p>
                            <span class="text-rose-500">bio: </span>
                            {userdata['bio']}
                        </p>
                    </div>
                {/if}
                <div>
                    <span class=" pt-2 text-xs sm:text-base"
                        >Pages synchronisés <span
                            class="bg-rose-600 text-white px-2 py-0.5 rounded-full"
                            >{userdata['num_total_pages']}</span
                        >
                        <span class="ml-auto">
                            <svg
                                class="w-4 h-4 inline transition-transform transform {isActive
                                    ? ''
                                    : 'rotate-180'}"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                on:click="{() => {
                                    isActive = !isActive;
                                }}"
                                on:keypress="{() => {}}"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </span></span
                    >
                    {#if isActive && pages.length > 0}
                        <div class="relative">
                            <div
                                class="
                                    absolute w-full mx-auto h-[8.6rem] dark:bg-slate-800 bg-white overflow-y-scroll top-0 shadow-lg rounded-lg dark:border overflow-x-hidden mt-2"
                            >
                                {#each pages as page}
                                    <UserFollow user="{page}" />
                                {/each}
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
                    {#if is_owner}
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
                </div>
                <div class="w-full mt-2 flex">
                    <div class="flex-[0.7]">
                        {#if (usersettings.show_birth_day === 'everyone' || is_owner || (usersettings.show_birth_day === 'followers' && userdata.is_following)) && usersettings.birth_day != null}
                            <span class="text-rose-500">Né à:</span>
                            <span>{usersettings.birth_day}</span>
                        {/if}
                    </div>
                    <div>
                        {#if usersettings.show_gender === 'everyone' || is_owner || (usersettings.show_gender === 'followers' && userdata.is_following)}
                            <span
                                >{#if usersettings.gender == 'male'}Male{:else if usersettings.gender == 'female'}Female{/if}</span
                            >
                        {/if}
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
                                number="{userdata['count_following_page']}"
                            /></span
                        > Following Pages
                    </div>
                </div>
            </div>
        </div>
    </div>
</Wapper>

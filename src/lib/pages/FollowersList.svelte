<script>
    import axios from 'axios';
    import { config, usershortinfo } from '../../stores/accounts/auth';
    import { nextUrlFriends, recommended } from '../../stores/tools';
    import { baseurl } from '../functions';
    import { location } from 'svelte-spa-router';
    import Wapper from '../Wapper.svelte';
    import Number from '../Number.svelte';
    import Loader from '../ui/Loader.svelte';
    import UserFollow from '../accounts/UserFollow.svelte';
    import BackSection from '../ui/BackSection.svelte';
    import { onMount } from 'svelte';
    import NoThing from '../ui/NoThing.svelte';
    let is_loaded = false,
        y = 0,
        yy = -1,
        is_Selected = false,
        count = 0;
    let suggestedUrl = '';
    $: {
        if ($location.includes('profile')) {
            if (params.followtpye == 'followers') {
                suggestedUrl = `/accounts/follow/followers/${params.username}/user_user/`;
            } else if (params.followtpye == 'following') {
                if (!is_Selected) {
                    suggestedUrl = `/accounts/follow/following/${params.username}/user_user/`;
                } else {
                    suggestedUrl = `/accounts/follow/following/${params.username}/user_page/`;
                }
            }
        }
        if ($location.includes('page')) {
            if (params.followtpye == 'followers') {
                if (!is_Selected) {
                    suggestedUrl = `/accounts/follow/followers/${params.username}/user_page/`;
                } else {
                    suggestedUrl = `/accounts/follow/followers/${params.username}/page_page/`;
                }
            } else if (params.followtpye == 'following') {
                suggestedUrl = `/accounts/follow/following/${params.username}/page_page/`;
            }
        }
    }
    $: {
        axios(`${baseurl}${suggestedUrl}`, config).then((res) => {
            recommended.set(res.data['results']);
            count = res.data['count'];
            nextUrlFriends.set(res.data['next']);
            is_loaded = true;
        });
    }
    onMount(() => {
        nextUrlFriends.set('');
        recommended.set([]);
    });

    $: {
        if (yy - 50 === y - 50) {
            if ($nextUrlFriends) {
                axios($nextUrlFriends, config).then(async (res) => {
                    await recommended.update((data) => [
                        ...data,
                        ...res.data['results'],
                    ]);
                    nextUrlFriends.set(res.data['next']);
                    yy = yy - 100;
                });
            }
        }
    }
    export let params = {};
</script>

{#if is_loaded}
    <BackSection
        name="{!is_Selected && $location.includes('profile')
            ? `${count} Profile`
            : `${count} Page`}"
    />
    <Wapper>
        <div
            class=" border  rounded mx-auto w-full h-screen mb-4 pt-3 overflow-hidden px-2 dark:text-black  "
        >
            {#if ($location.includes('profile') && params.followtpye == 'following') || ($location.includes('page') && params.followtpye == 'followers')}
                <div class="flex flex-row items-center justify-evenly ">
                    <div
                        class=" w-5/12 text-xl font-normal  dark:text-white text-rose-600  text-center py-1.5    cursor-pointer {!is_Selected
                            ? 'border-b-rose-600 border-b-2  '
                            : ''}
                            "
                        on:click="{() => {
                            is_Selected = false;
                        }}"
                        on:keypress="{() => {}}"
                    >
                        Profiles
                    </div>
                    <div
                        class=" w-5/12 text-xl  font-normal dark:text-white text-rose-600    text-center py-1.5  cursor-pointer  {is_Selected
                            ? 'border-b-rose-600 border-b-2   '
                            : ' '}
                           "
                        on:click="{() => {
                            is_Selected = true;
                        }}"
                        on:keypress="{() => {}}"
                    >
                        Pages
                    </div>
                </div>
            {/if}
            <div
                class="flex flex-col mt-4  space-y-1.5 overflow-hidden h-[34rem] hover:pr-3 "
                bind:clientHeight="{y}"
                on:scroll="{(e) => {
                    yy = e.target['scrollHeight'];
                    y = e.target['scrollTop'] + e.target['clientHeight'];
                }}"
                id="homefrined"
            >
                {#if count != 0}
                    {#each $recommended as user}
                        <UserFollow user="{user}" />
                    {/each}
                {:else}
                    <div
                        class="dark:text-gray-300 text-3xl text-center mx-auto mt-48 text-gray-700"
                    >
                        No {!is_Selected && $location.includes('profile')
                            ? `Profile`
                            : `Page`} Found
                    </div>
                {/if}
            </div>
        </div>
    </Wapper>
{:else}
    <Loader />
{/if}

<style>
    #homefrined:hover {
        overflow-y: overlay;
    }
</style>

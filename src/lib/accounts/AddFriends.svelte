<script>
    import axios from 'axios';
    import { config, usershortinfo } from '../../stores/accounts/auth';
    import { nextUrlFriends, recommended } from '../../stores/tools';
    import { baseurl } from '../functions';
    import Wapper from '../Wapper.svelte';
    import Number from '../Number.svelte';
    import Loader from '../ui/Loader.svelte';
    import UserFollow from './UserFollow.svelte';
    import BackSection from '../ui/BackSection.svelte';
    import { onMount } from 'svelte';
    import SearchSection from '../ui/SearchSection.svelte';
    let is_loaded = false,
        y = 0,
        yy = -1,
        ftype = $usershortinfo.ftype,
        is_Selected = false;
    let suggestedUrl = '';

    $: {
        ftype = $usershortinfo.ftype;
        if (ftype === 'profile') {
            if (!is_Selected) {
                suggestedUrl = '/accounts/suggestedusers/user_user/';
            } else {
                suggestedUrl = '/accounts/suggestedusers/user_page/';
            }
        }
        if (ftype === 'page') {
            suggestedUrl = '/pages/suggestedpages/';
        }
    }
    $: {
        if (ftype !== null) {
            if ($usershortinfo.ftype !== null) {
                axios(`${baseurl}${suggestedUrl}`, config).then((res) => {
                    recommended.set(res.data['results']);
                    nextUrlFriends.set(res.data['next']);
                    is_loaded = true;
                });
            }
        }
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
    const searchFunc = (search) => {
        let url = '';
        if (!is_Selected && $usershortinfo.ftype == 'profile')
            url = '/accounts/search/';
        else url = '/pages/search/';
        if (search.trim().length !== 0) {
            axios(`${baseurl}${url}?search=${search}`, config).then((res) => {
                recommended.set(res.data['results']);
                nextUrlFriends.set(res.data['next']);
            });
        }
    };
</script>

{#if is_loaded}
    <BackSection
        name="{!is_Selected && $usershortinfo.ftype == 'profile'
            ? 'Profiles'
            : 'Pages'}"
    />
    <Wapper>
        <div
            class="mt-3 mx-auto w-full min-h-[34rem]  overflow-hidden px-2 dark:text-black  "
        >
            {#if ftype == 'profile'}
                <div class="flex flex-row space-x-4 mx-1 mt-2 ">
                    <div
                        class="flex-1  text-lg font-semibold border-2 text-center py-1 rounded-lg cursor-pointer shadow-md {!is_Selected
                            ? 'text-rose-600  border-white '
                            : 'bg-rose-600 text-white  border-transparent'}
                            "
                        on:click="{() => {
                            is_Selected = false;
                        }}"
                        on:keypress="{() => {}}"
                    >
                        Profiles
                    </div>
                    <div
                        class="flex-1  text-lg font-semibold border-2 text-center py-2 rounded-lg cursor-pointer shadow-md {is_Selected
                            ? 'text-rose-600  border-white '
                            : 'bg-rose-600 text-white border-transparent'}
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
            <div class="flex flex-col relative mt-4 ">
                <SearchSection searchFunc="{searchFunc}" />
            </div>
            <div
                class="flex flex-col mt-4  space-y-1.5 overflow-hidden h-[34rem] hover:pr-3 "
                bind:clientHeight="{y}"
                on:scroll="{(e) => {
                    yy = e.target['scrollHeight'];
                    y = e.target['scrollTop'] + e.target['clientHeight'];
                }}"
                id="homefrined"
            >
                {#each $recommended as user}
                    <UserFollow user="{user}" />
                {/each}
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

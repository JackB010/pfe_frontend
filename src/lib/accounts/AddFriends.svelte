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
        if (!is_Selected) {
            document.title = 'Ajouter des profils';
        } else {
            document.title = 'Ajouter des pages';
        }
    }
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
            ? 'Profils'
            : 'Pages'}"
    />
    <Wapper>
        <div
            class=" border mb-2 rounded mx-auto w-full h-screen overflow-hidden px-2 dark:text-black"
        >
            {#if ftype == 'profile'}
                <div class="flex flex-row items-center justify-evenly">
                    <div
                        class=" w-5/12 text-xl font-normal dark:text-white text-rose-600 text-center py-1.5 cursor-pointer {!is_Selected
                            ? 'border-b-rose-600 border-b-2  '
                            : ''}
                            "
                        on:click="{() => {
                            is_Selected = false;
                        }}"
                        on:keypress="{() => {}}"
                    >
                        Profils
                    </div>
                    <div
                        class=" w-5/12 text-xl font-normal dark:text-white text-rose-600 text-center py-1.5 cursor-pointer {is_Selected
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
            <div class="flex flex-col relative mt-4">
                <SearchSection searchFunc="{searchFunc}" />
            </div>
            <div
                class="flex flex-col mt-4 space-y-1.5 overflow-hidden h-[34rem] hover:pr-3"
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

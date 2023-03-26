<script>
    import axios from 'axios';
    import { config, usershortinfo } from '../../stores/accounts/auth';
    import { recommended } from '../../stores/tools';
    import { baseurl } from '../functions';
    import Wapper from '../Wapper.svelte';
    import Number from '../Number.svelte';
    import Loader from '../ui/Loader.svelte';
    import UserFollow from './UserFollow.svelte';
    let is_loaded = false,
        num = 10,
        y = 0,
        yy = 0,
        holdData = 0,
        ftype = $usershortinfo.ftype,
        is_Selected = false;
    $: {
        ftype = $usershortinfo.ftype;
        let suggestedUrl = '';
        if (ftype === 'profile') {
            if (!is_Selected) {
                suggestedUrl = `/accounts/suggestedusers/user_user/${num}/`;
            } else {
                suggestedUrl = `/accounts/suggestedusers/user_page/${num}/`;
            }
        }
        if (ftype === 'page') {
            suggestedUrl = `/pages/suggestedpages/${num}/`;
        }
        if (ftype !== null) {
            if ($usershortinfo.ftype !== null) {
                axios(`${baseurl}${suggestedUrl}`, config).then((res) => {
                    recommended.set(res.data);
                    is_loaded = true;
                });
            }
        }
    }

    $: {
        if (yy === y) {
            if (holdData !== $recommended.length) {
                num = num + 10;
                holdData = $recommended.length;
            }
        }
    }
</script>

<svelte:window bind:scrollY="{y}" />

{#if is_loaded}
    <Wapper>
        <div
            class="  mx-auto w-full  min-h-[34rem] overflow-hidden px-2 dark:text-black "
        >
            {#if ftype == 'profile'}
                <div class="flex flex-row space-x-3 mt-2 ">
                    <div
                        class="flex-1  text-lg font-semibold  text-center py-1 rounded-lg cursor-pointer shadow-md {!is_Selected
                            ? 'text-rose-600 dark:border-2 border-white '
                            : 'bg-rose-600 text-white '}
                            "
                        on:click="{() => {
                            is_Selected = false;
                        }}"
                        on:keypress="{() => {}}"
                    >
                        Profiles
                    </div>
                    <div
                        class="flex-1  text-lg font-semibold  text-center py-2 rounded-lg cursor-pointer shadow-md {is_Selected
                            ? 'text-rose-600 dark:border-2 border-white '
                            : 'bg-rose-600 text-white '}
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
            </div>
            <div
                class="px-2 mt-4  overflow-hidden "
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
        </div></Wapper
    >
{:else}
    <Loader />
{/if}

<style>
    #homefrined:hover {
        overflow-y: overlay;
    }
</style>

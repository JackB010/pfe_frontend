<script>
    import axios from 'axios';
    import { onMount } from 'svelte';
    import { location } from 'svelte-spa-router';
    import { config } from '../../stores/accounts/auth';
    import { nextUrlFriends, recommended } from '../../stores/tools';
    import { baseurl } from '../functions';
    import BackSection from '../ui/BackSection.svelte';
    import Loader from '../ui/Loader.svelte';
    import Wapper from '../Wapper.svelte';
    import UserFollow from './UserFollow.svelte';

    let count = 0;
    $: categorie = params.categorie;
    let is_loaded = false,
        y = 0,
        yy = 0;
    onMount(() => {
        nextUrlFriends.set('');
        recommended.set([]);
    });
    onMount(() => {
        axios(
            `${baseurl}/pages/search/categorie/?search=${categorie}`,
            config
        ).then((res) => {
            recommended.set(res.data['results']);
            count = res.data['count'];
            is_loaded = true;
        });
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

<BackSection name="Categorie: {categorie}" />

{#if is_loaded}
    <Wapper>
        <div
            class="   mt-3 mx-auto w-full min-h-[34rem] overflow-hidden px-2 dark:text-black  "
        >
            <div class="flex flex-col items-center space-y-2 space-x-2">
                <div
                    class="flex items-center  mt-4 space-x-2 shadow rounded-lg p-2"
                >
                    <div class="text-3xl  rounded-full   w-fit h-fit ">
                        <span class="rounded px-2.5 dark:text-white "
                            >Categorie:</span
                        >
                    </div>
                    <div class="text-2xl text-rose-600 ">{categorie}</div>
                </div>
                <div
                    class="text-lg shadow w-fit text-rose-600 mx-auto px-3 py-1  rounded-lg"
                >
                    {count} Page{count === 1 ? '' : 's'}
                </div>
            </div>
            <div
                class="flex flex-col mt-4 my-2 w-full overflow-hidden h-[34rem] "
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

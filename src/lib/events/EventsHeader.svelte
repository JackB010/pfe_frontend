<script>
    import axios from 'axios';
    import { onMount } from 'svelte';
    import { push } from 'svelte-spa-router';
    import {
        config,
        userinfo,
        num_total_pages,
        usershortinfo,
    } from '../../stores/accounts/auth';
    import { eventList, nexturl } from '../../stores/tools';
    import SearchSection from '../ui/SearchSection.svelte';
    import { baseurl } from './../functions';
    export let username = '';
    // $: num_total_pages = userinfo['num_total_pages'];
    // onMount(() => {
    //     num_total_pages = userinfo['num_total_pages'];
    // });
    const searchFunc = async (search) => {
        eventList.set([]);
        await axios(
            `${baseurl}/events/search/?search=${search}${
                username ? `&id=${username}` : ''
            }`,
            config
        ).then((res) => {
            nexturl.set(res.data['next']);
            eventList.set(res.data['results']);
        });
    };
    const addItem = () => {
        push('/event/add');
    };
</script>

<div class="flex mx-4">
    <div class="flex w-full mt-2 px-1 justify-center items-end space-x-3 my-6 ">
        {#if $usershortinfo.ftype === 'page' || $num_total_pages !== 0}
            <div
                class="h-12 w-12 rounded-lg flex items-center cursor-pointer  border-2 border-rose-600 dark:border-white text-white bg-rose-600 hove:bg-rose-600 "
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-7 w-7 mx-auto  "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    on:click="{addItem}"
                    on:keypress="{() => {}}"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
            </div>
        {/if}
        <div class=" flex-1  ">
            <SearchSection searchFunc="{searchFunc}" />
        </div>
    </div>
</div>

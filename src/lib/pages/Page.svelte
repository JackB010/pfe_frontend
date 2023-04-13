<script>
    import axios from 'axios';
    import { afterUpdate, onMount } from 'svelte';
    import {
        config,
        selectedByNav,
        usershortinfo,
    } from '../../stores/accounts/auth';
    import { baseurl } from '../functions';
    import Loader from '../ui/Loader.svelte';
    import PageHeader from './PageHeader.svelte';
    import { postItems, postsLoaded } from '../../stores/posts/posts';
    import Wapper from '../Wapper.svelte';
    import { nexturl } from '../../stores/tools';
    import Posts from '../posts/Posts.svelte';
    import PostsHeader from '../PostsHeader.svelte';
    import EventsHeader from '../events/EventsHeader.svelte';
    import PageEvents from './PageEvents.svelte';
    import BackSection from '../ui/BackSection.svelte';

    let userdata = {},
        loaded = false,
        user = '',
        show = !$selectedByNav,
        is_Selected = false;
    if ($selectedByNav) selectedByNav.set(false);
    $: {
        if (params.username != null) {
            if (user !== params.username) {
                postsLoaded.set(false);
                loaded = false;
                user = params.username;
                axios(`${baseurl}/pages/page/${params.username}/`, config).then(
                    (res) => {
                        userdata = res.data;
                        userdata = userdata;
                        loaded = true;
                    }
                );
            }
            axios(`${baseurl}/posts/?user=${params.username}`, config).then(
                (res) => {
                    nexturl.set(res.data['next']);
                    postItems.set(res.data['results']);
                    postsLoaded.set(true);
                }
            );
        }
    }
    // onMount(async () => {
    //     user = params.username;
    //     axios(`${baseurl}/pages/page/${params.username}/`, config).then(
    //         (res) => {
    //             userdata = res.data;
    //             userdata = userdata;
    //             loaded = true;
    //         }
    //     );
    //     axios(`${baseurl}/posts/?user=${params.username}`, config).then(
    //         (res) => {
    //             nexturl.set(res.data['next']);
    //             postItems.set(res.data['results']);
    //             postsLoaded.set(true);
    //         }
    //     );
    // });

    export let params = {};
</script>

{#if loaded}
    {#if show}
        <BackSection name="{userdata['user']['username']}" />
    {/if}
    <PageHeader userdata="{userdata}" />
    <Wapper>
        <div class="border mb-2 ">
            <div
                class="   mt-3 mx-auto w-full min-h-[34rem] overflow-hidden px-2   "
            >
                {#if userdata['is_following']}
                    <div class="flex flex-row items-center justify-evenly   ">
                        <div
                            class=" w-5/12 text-xl font-normal  text-center py-1.5 transition-all  duration-75   cursor-pointer {!is_Selected
                                ? 'border-b-rose-600 border-b-2 dark:text-white  text-rose-600 '
                                : ''}
                            "
                            on:click="{() => {
                                is_Selected = false;
                            }}"
                            on:keypress="{() => {}}"
                        >
                            Posts
                        </div>
                        <div
                            class=" w-5/12 text-xl  font-normal transition-all duration-75  text-center py-1.5  cursor-pointer  {is_Selected
                                ? 'border-b-rose-600 border-b-2 dark:text-white  text-rose-600'
                                : ' '}
                           "
                            on:click="{() => {
                                is_Selected = true;
                            }}"
                            on:keypress="{() => {}}"
                        >
                            Events
                        </div>
                    </div>
                {/if}
                {#if !is_Selected}
                    {#if $postsLoaded}
                        <PostsHeader profile="{params.username}" />
                        <div class="px-4 mt-3">
                            <Posts
                                bind:num_total_likes="{userdata[
                                    'num_total_likes'
                                ]}"
                            />
                        </div>
                    {:else}
                        <Loader />
                    {/if}
                {:else}
                    <EventsHeader username="{userdata['id']}" />
                    <PageEvents
                        username="{userdata['id']}"
                        is_Selected="{is_Selected}"
                    />
                {/if}
            </div>
        </div>
    </Wapper>
{:else}
    <Loader />
{/if}

<script>
    import Fa from 'svelte-fa/src/fa.svelte';
    import {
        faAdd,
        faEarth,
        faSearch,
    } from '@fortawesome/free-solid-svg-icons';
    import PostItem from './posts/PostItem.svelte';
    import { onMount } from 'svelte';
    import { baseurl } from './functions';
    import axios from 'axios';
    import { config } from '../stores/accounts/auth';
    import { location, push } from 'svelte-spa-router';
    import { postItems, postsLoaded } from '../stores/posts/posts';
    import Loader from './ui/Loader.svelte';
    import { backurls, nexturl } from '../stores/tools';
    import Wapper from './Wapper.svelte';
    import NoThing from './ui/NoThing.svelte';

    onMount(async () => {
        if ($location === '/') {
            await axios(`${baseurl}/posts/`, config).then((res) => {
                nexturl.set(res.data['next']);

                postItems.set(res.data['results']);
                postsLoaded.set(true);
            });
        }
    });
    let search = '';
    const searchFunc = async () => {
        if (search.trim().length !== 0) {
            postsLoaded.set(false);
            await axios(
                `${baseurl}/posts/search/?search=${search}`,
                config
            ).then((res) => {
                postItems.set(res.data);
                postsLoaded.set(true);
            });
        }
    };
    const addItem = () => {
        backurls.update((data) => [...data, '/']);
        push('/post/add');
    };
    let y = 0;
    $: {
        let html = document.documentElement;
        if (y + html.clientHeight - 50 === html.offsetHeight - 50) {
            if ($nexturl) {
                axios($nexturl, config).then(async (res) => {
                    let data = [];
                    postItems.subscribe((posts) => {
                        data = posts;
                    });
                    data = [...data, ...res.data['results']];
                    await postItems.set(data);
                    nexturl.set(res.data['next']);
                });
            }
        }
    }
</script>

<svelte:window bind:scrollY="{y}" />
<Wapper>
    {#if $location === '/'}
        <div class="flex mx-4">
            <div class="flex w-full mt-3  justify-center space-x-3 ">
                <div class="">
                    <button
                        class=" text-white border-2 border-rose-600 dark:border-white bg-rose-500 active:bg-rose-600  w-12 px-2 h-12  rounded-lg shadow 
     outline-none focus:outline-none  mb-1 ease-linear transition-all duration-100"
                    >
                        <Fa
                            icon="{faEarth}"
                            style="display: inline; padding-right:2px;"
                        />
                    </button>
                </div>
                <div class="xs:w-9/12 w-9/12 ">
                    <div class="w-full">
                        <form
                            class="w-full h-12 flex"
                            on:submit|preventDefault="{searchFunc}"
                        >
                            <input
                                bind:value="{search}"
                                class="-mr-1 h-12 w-full border-y-2  border-l-2 rounded-l-lg border-rose-600 text-rose-700
                                     text-lg pl-4 outline-none focus:outline-none"
                            />

                            <button
                                class=" text-white border-y-2 border-rose-600 dark:border-white  border-r-2  bg-rose-500 active:bg-rose-600  px-2 h-12  rounded-r-lg shadow 
                                    outline-none focus:outline-none  ease-linear transition-all duration-100"
                            >
                                <Fa icon="{faSearch}" />
                            </button>
                        </form>
                    </div>
                </div>
                <div>
                    <button
                        class=" text-white border-2 border-rose-600 dark:border-white bg-rose-500 active:bg-rose-600  w-12  px-2 h-12  rounded-lg shadow 
     outline-none focus:outline-none mb-1 ease-linear transition-all duration-100"
                        on:click="{addItem}"
                    >
                        <Fa
                            icon="{faAdd}"
                            style="display: inline; padding-right:2px;"
                        />
                    </button>
                </div>
            </div>
        </div>
    {/if}
    <div class="px-4 py-5 flex-auto ">
        <div
            class="tab-content tab-space l
                "
        >
            <div>
                {#if $postsLoaded}
                    {#if $postItems.length != 0}
                        {#each $postItems as post}
                            <PostItem post="{post}" />
                        {/each}
                    {:else}
                        <NoThing
                            message="No Post To See"
                            dSVG="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                    {/if}
                {:else}
                    <Loader />
                {/if}
            </div>
        </div>
    </div>
</Wapper>

<script>
    import Fa from 'svelte-fa/src/fa.svelte';
    import {
        faAdd,
        faEarth,
        faImage,
        faPager,
        faSearch,
    } from '@fortawesome/free-solid-svg-icons';
    import PostItem from './posts/PostItem.svelte';
    import ImageItem from './images/ImageItem.svelte';
    import { onMount, afterUpdate } from 'svelte';
    import { baseurl } from './functions';
    import axios from 'axios';
    import { config } from './../stores/accounts/auth';
    import { location, push, replace } from 'svelte-spa-router';
    import { postItems, postsLoaded } from './../stores/posts/posts';
    import Loader from './ui/Loader.svelte';
    import { backurls } from './../stores/tools';
    let openTab = 1;

    function toggleTabs(tabNumber) {
        postsLoaded.set(false);
        openTab = tabNumber;
        if (tabNumber === 1) {
            axios(`${baseurl}/posts/following/`, config).then((res) => {
                postItems.set(res.data);
                postsLoaded.set(true);
            });
        }
    }
    onMount(async () => {
        if ($location === '/') {
            await axios(`${baseurl}/posts/following/`, config).then((res) => {
                postItems.set(res.data);
                postsLoaded.set(true);
            });
        }
    });
    let search = '';
    const searchFunc = async () => {
        if (openTab === 1) {
            if (search.trim().length !== 0) {
                postsLoaded.set(false);
                await axios(
                    `${baseurl}/posts/search/?search=${search}`,
                    config
                ).then((res) => {
                    console.log(res.data);
                    postItems.set(res.data);
                    postsLoaded.set(true);
                });
            }
        }
    };
    let showModal = false;

    function toggleModal() {
        showModal = !showModal;
    }
    const addItem = () => {
        backurls.update((data) => [...data, '/']);
        push('/post/add');
    };
</script>

<!-- svelte-ignore a11y-missing-attribute -->

<div
    class="flex flex-wrap lg:float-right xl:mr-16 mt-0 mx-2 md:w-7/12 lg:w-6/12  "
>
    <div class="min-w-full w-ful ">
        <ul
            class="flex mb-0 list-none flex-wrap pt-3 md:pt-0 pb-4 flex-row w-full"
        >
            <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                    class="text-xs font-bold cursor-pointer uppercase px-5 py-3 shadow-md rounded block leading-normal {openTab ===
                    1
                        ? 'text-white bg-rose-600'
                        : 'text-rose-600 bg-white'}"
                    on:click="{() => toggleTabs(1)}"
                >
                    <Fa
                        icon="{faPager}"
                        style="display: inline; padding-right:2px;"
                        scale="{1.4}"
                    />
                    Posts
                </a>
            </li>
            <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                    class="text-xs font-bold cursor-pointer uppercase px-5 py-3 shadow-md rounded block leading-normal {openTab ===
                    2
                        ? 'text-white bg-rose-600'
                        : 'text-rose-600 bg-white'}"
                    on:click="{() => toggleTabs(2)}"
                >
                    <Fa
                        icon="{faImage}"
                        style="display: inline; padding-right:2px;"
                        scale="{1.4}"
                    />
                    Images
                </a>
            </li>
        </ul>
        <div
            class="relative flex flex-col  break-words bg-white dark:bg-slate-800
             dark:text-white  dark:border-2 mb-6 shadow-lg rounded"
        >
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
                    <div class="{openTab === 1 ? 'block' : 'hidden'}">
                        {#if $postsLoaded}
                            {#each $postItems as post}
                                <PostItem post="{post}" />
                            {/each}
                        {:else}
                            <Loader />
                        {/if}
                    </div>
                    <div class="{openTab === 2 ? 'block' : 'hidden'}">
                        <ImageItem />
                        <ImageItem />
                        <ImageItem />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

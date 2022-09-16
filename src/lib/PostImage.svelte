<script>
    import Fa from 'svelte-fa/src/fa.svelte';
    import { faImage, faPager } from '@fortawesome/free-solid-svg-icons';
    import PostItem from './posts/PostItem.svelte';
    import ImageItem from './images/ImageItem.svelte';
    import { onMount } from 'svelte';
    import { baseurl } from './functions';
    import axios from 'axios';
    import { config } from './../stores/accounts/auth';
    import { location } from 'svelte-spa-router';
    import { postItems, postsLoaded } from './../stores/posts/posts';
    import Loader from './ui/Loader.svelte';
    let openTab = 1;

    function toggleTabs(tabNumber) {
        openTab = tabNumber;
    }
    onMount(() => {
        if ($location === '/') {
            axios(`${baseurl}/posts/following/`, config).then((res) => {
                postItems.set(res.data);
                postsLoaded.set(true);
            });
        }
    });
</script>

<!-- svelte-ignore a11y-missing-attribute -->

<div
    class="flex flex-wrap lg:float-right xl:mr-16 mt-0 mx-2 md:w-7/12 lg:w-6/12  "
>
    <div class="min-w-full w-ful ">
        <ul class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row w-full">
            <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                    class="text-xs font-bold cursor-pointer uppercase px-5 py-3 shadow-lg rounded block leading-normal {openTab ===
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
                    class="text-xs font-bold cursor-pointer uppercase px-5 py-3 shadow-lg rounded block leading-normal {openTab ===
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
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

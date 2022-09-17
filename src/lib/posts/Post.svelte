<script>
    import Loader from '../ui/Loader.svelte';
    import { onMount } from 'svelte';
    import {
        postItem,
        postLoaded,
        postcomments,
        commentsLoaded,
    } from './../../stores/posts/posts';
    import PostItem from './PostItem.svelte';
    import { baseurl } from '../functions';
    import axios from 'axios';
    import { config } from './../../stores/accounts/auth';
    onMount(async () => {
        if (params.id) {
            await axios(`${baseurl}/posts/${params.id}/`, config).then(
                (res) => {
                    postItem.set(res.data);
                    postLoaded.set(true);
                }
            );
            await axios(`${baseurl}/posts/comment/${params.id}/`, config).then(
                (res) => {
                    postcomments.set(res.data);
                    commentsLoaded.set(true);
                }
            );
        }
    });

    export let params = {};
</script>

{#if $postLoaded}
    <div
        class="flex flex-wrap lg:float-right xl:mr-16 mt-0 mx-2 md:w-7/12 lg:w-6/12  "
    >
        <div
            class="relative w-full flex flex-col  break-words bg-white dark:bg-slate-800
             dark:text-white  dark:border-2 mb-6 shadow-lg rounded mt-6 md:mt-0"
        >
            <div class="px-4 py-5 flex-auto ">
                <div
                    class="tab-content tab-space l
                "
                >
                    <PostItem post="{$postItem}" />
                </div>
            </div>
            <div class="px-4 py-5 flex-auto ">
                <div
                    class="tab-content tab-space l
                "
                >
                    {#if $commentsLoaded}
                        {#each $postcomments as comment}
                            <p>{comment['comment']}</p>
                        {/each}
                    {:else}
                        <Loader />
                    {/if}
                </div>
            </div>
        </div>
    </div>
{:else}
    <Loader />
{/if}

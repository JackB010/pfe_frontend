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
    import { config } from './../../stores/accounts/auth';
    import axios from 'axios';
    import CommentItem from './CommentItem.svelte';
    import NoThing from '../ui/NoThing.svelte';
    import Wapper from '../Wapper.svelte';
    import BackSection from '../ui/BackSection.svelte';
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
    <BackSection name="Post by {$postItem['profile']['username']}" />
    <!-- <div
        class="flex flex-wrap lg:float-right xl:mr-16 mt-0 mx-2 md:w-7/12 lg:w-6/12  "
    >
        <div
            class="relative w-full flex flex-col  break-words bg-white dark:bg-slate-800
             dark:text-white  dark:border-2 mb-6 shadow-lg rounded mt-6 md:mt-0"
        >
         
            <div class="px-4 py-5 flex-auto "> -->
    <Wapper>
        <!-- <div
            class="tab-content tab-space l
                "
        > -->
        <PostItem post="{$postItem}" />
        <!-- </div> -->
    </Wapper>
    <!-- </div> -->
    <!-- <div class="flex flex-wrap  mt-0 mx-4    ">
        <div
            class="relative w-full flex flex-col  break-words bg-white dark:bg-slate-800
             dark:text-white  border-2 mb-6 shadow-lg rounded  "
        > -->
    <Wapper>
        <div class=" mx-auto mt-4 flex-auto w-full ">
            <div
                class="tab-content tab-space l
                "
            >
                {#if $commentsLoaded}
                    {#each $postcomments as comment, i (comment.id)}
                        <div class="mx-auto" id="{comment.id}">
                            <CommentItem comment="{comment}" />
                        </div>
                    {/each}
                    {#if $postcomments.length === 0}
                        <NoThing
                            message="No Comments To See"
                            dSVG="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                        />
                    {/if}
                {:else}
                    <Loader />
                {/if}
            </div>
        </div>
    </Wapper>

    <!-- </div>
    </div> -->

    <!-- </div>
    </div> -->
{:else}
    <Loader />
{/if}

<script>
    import ReplyList from './ReplyList.svelte';
    import Number from '../Number.svelte';
    import moment from 'moment';
    import axios from 'axios';
    import { baseurl } from '../functions';
    import { config } from './../../stores/accounts/auth';
    import Loader from '../ui/Loader.svelte';

    export let comment = {};
    let replies = [];

    const likeComment = async () => {
        await axios
            .post(
                `${baseurl}/posts/comment/like/`,
                { id: comment['id'] },
                config
            )
            .then((res) => {
                comment['is_liked'] = !comment['is_liked'];
                if (comment['is_liked'])
                    comment['num_likes'] = comment['num_likes'] + 1;
                else comment['num_likes'] = comment['num_likes'] - 1;
            });
    };
    $: repliesLaoded = false;
    $: repliesopend = false;
    const showReplies = async () => {
        repliesopend = !repliesopend;
        if (repliesopend) {
            repliesLaoded = true;
            await axios(
                `${baseurl}/posts/comment/reply/${comment['id']}/`,
                config
            ).then((res) => {
                repliesLaoded = false;
                replies = res.data;
            });
        }
    };
</script>

<div
    class="flex  flex-col  rounded-lg dark:bg-inherit bg-gray-100 p-2 mb-4 mx-3 border-2 "
>
    <div class="flex  space-x-2 w-full mb-2">
        <div class="flex items-start px-4  w-full">
            <div class="w-16">
                <img
                    src="{comment['profile']['photo_icon']}"
                    alt="{comment['profile']['username']}"
                    class="w-10 h-10 rounded-full cursor-pointer object-cover mr-4 shadow"
                />
            </div>

            <div class=" flex-1 items-start">
                <div class="flex flex-col items-start -space-y-1 ">
                    <h2
                        class="text-md cursor-pointer font-semibold text-gray-900  dark:text-white -mt-0.5"
                    >
                        {comment['profile']['username']}
                    </h2>
                    <div>
                        <small
                            class="text-xs text-gray-700 dark:text-slate-200  "
                            >{moment(comment.created).fromNow()}</small
                        >
                    </div>
                </div>
            </div>
            <div class=" px-3 ">
                <span class="font-bold  cursor-pointer">...</span>
            </div>
        </div>
    </div>

    <div class=" flex flex-1 flex-wrap sm:flex-nowrap  ml-20    ">
        <div class=" w-full ">
            <p class="text-gray-900 dark:text-white  mb-2 font-mono text-sm">
                {comment['comment']}
            </p>
        </div>
    </div>
    <div class="flex  space-x-5 justify-start flex-1 w-10/12 mx-auto  ">
        <div class=" items-center ">
            <div
                on:click="{likeComment}"
                on:keypress="{(e) => {}}"
                class=" inline-block  mt-2  cursor-pointer 
            "
            >
                <div class="inline-block absolute ">
                    <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        class="w-5 h-5    {comment['is_liked']
                            ? 'fill-rose-600 text-rose-600  '
                            : ''}"
                        stroke="currentColor "
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        ></path>
                    </svg>
                </div>
                <div class="inline-block">
                    <span class="text-sm  ml-7">
                        <Number number="{comment['num_likes']}" /> Like{#if comment['num_likes'] !== 1}s{/if}
                    </span>
                </div>
            </div>
        </div>

        <div class="">
            <div
                class=" inline-block  mt-2 absolute cursor-pointer "
                on:click="{showReplies}"
                on:keypress="{(e) => {}}"
            >
                <div class="inline-block  w-fit h-fit pt-1 absolute ">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 rotate-180"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clip-rule="evenodd"></path>
                    </svg>
                </div>

                <div class="inline-block   ml-7 ">
                    <span class="text-sm ">
                        <Number number="{comment['num_replies']}" />
                        {#if comment['num_replies'] !== 1}Replies{:else}Reply{/if}
                    </span>
                </div>
            </div>
        </div>
    </div>
    <div>
        {#if repliesopend}
            {#if repliesLaoded == true}
                <div class="mt-3">
                    <Loader />
                </div>
            {:else}
                <ReplyList
                    replies="{replies}"
                    commentid="{comment['id']}"
                    bind:num_replies="{comment['num_replies']}"
                />
            {/if}
        {/if}
    </div>
</div>

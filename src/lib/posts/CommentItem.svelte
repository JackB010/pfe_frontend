<script>
    import ReplyList from './ReplyList.svelte';
    import Number from '../Number.svelte';
    import moment from 'moment';
    import axios from 'axios';
    import { baseurl } from '../functions';
    import { config, usershortinfo } from './../../stores/accounts/auth';
    import Loader from '../ui/Loader.svelte';
    import FullInput from '../ui/FullInput.svelte';
    import { onMount } from 'svelte';
    import { link } from 'svelte-spa-router';

    export let comment = {};

    let replies = [],
        isActive = false,
        is_edit = false,
        is_delete = false;
    let txt = comment['comment'];
    onMount(() => {
        txt = comment['comment'];
    });

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
    const updateComment = (text) => {
        axios
            .patch(
                `${baseurl}/posts/comment/update/${comment['id']}/`,
                { comment: text, deleted: is_delete },
                config
            )
            .then((res) => {
                isActive = false;
                is_edit = false;
                comment['comment'] = res.data['comment'];
                if (is_delete) {
                    let elm = document.getElementById(comment['id']);
                    elm.classList.add('hidden');
                }
            });
    };
</script>

<div
    class="flex  flex-col  rounded dark:bg-inherit  p-2 mb-4 mx-3 border "
    id="{comment['id']}"
>
    <div class="flex  space-x-2 w-full mb-2">
        <div class="flex items-start px-4  w-full">
            <div class="w-16">
                <a
                    href="{`/${comment['profile']['ftype']}/${comment['profile']['username']}`}"
                    use:link
                >
                    <div
                        style="background-image: url({comment['profile'][
                            'photo_icon'
                        ]})"
                        class="w-10 h-10 bg-cover bg-center {comment['profile'][
                            'ftype'
                        ] === 'profile'
                            ? 'rounded-full'
                            : 'rounded-lg'} cursor-pointer object-cover mr-4 shadow"
                    ></div>
                </a>
            </div>

            <div class=" flex-1 items-start">
                <div class="flex flex-col items-start -space-y-1 ">
                    <a
                        href="{`/${comment['profile']['ftype']}/${comment['profile']['username']}`}"
                        use:link
                    >
                        <h2
                            class="text-md cursor-pointer font-semibold text-gray-900  dark:text-white -mt-0.5"
                        >
                            {comment['profile']['username']}
                        </h2>
                    </a>
                    <div>
                        <small
                            class="text-xs text-gray-700 dark:text-slate-200  "
                            >{moment(comment.created).fromNow()}</small
                        >
                    </div>
                </div>
            </div>
            {#if comment['profile']['username'] === $usershortinfo.username}
                <div class=" px-3 ">
                    <div
                        class=" self-start  cursor-pointer"
                        on:click="{() => (isActive = !isActive)}"
                        on:keypress="{() => {}}"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            class=" w-5 h-6 fill-gray-700 dark:fill-white"
                        >
                            <path d="M0 0h24v24H0V0z" fill="none"></path>
                            <path
                                d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
                            ></path>
                        </svg>
                    </div>

                    <div class=" ">
                        <div
                            class="relative {isActive ? '' : 'hidden'} "
                            on:mouseleave="{(e) => {
                                isActive = false;
                            }}"
                        >
                            <div
                                class=" absolute  right-0 z-50 w-56 py-1 mb-4 h-fit rounded-md shadow-lg min-w-max  ring-1 ring-black ring-opacity-25 dark:bg-dark  focus:outline-none bg-white dark:bg-slate-900 dark:text-white"
                            >
                                <span
                                    on:click="{() => {
                                        isActive = false;
                                        is_edit = true;
                                        // push(`/event/${event['id']}/edit`);
                                    }}"
                                    on:keypress="{() => {}}"
                                    class="flex px-4 py-2 text-sm  transition-colors hover:bg-gray-100 dark:text-light dark:hover:bg-rose-600 space-x-2 cursor-pointer"
                                >
                                    <div>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            class="bi bi-pencil-square "
                                            viewBox="0 0 16 16"
                                        >
                                            <path
                                                d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                                            ></path>
                                            <path
                                                fill-rule="evenodd"
                                                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                                            ></path>
                                        </svg>
                                    </div>
                                    <span>Edit</span>
                                </span>

                                <span
                                    on:click="{() => {
                                        is_delete = true;
                                        updateComment(comment['comment']);
                                    }}"
                                    on:keypress="{() => {}}"
                                >
                                    <span
                                        class="flex px-4 py-2 text-sm  transition-colors hover:bg-gray-100 dark:text-light dark:hover:bg-rose-600 space-x-2 cursor-pointer"
                                    >
                                        <span
                                            ><svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                class="h-5 w-5 "
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                ></path>
                                            </svg></span
                                        >
                                        <span>Delete</span>
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            {/if}
        </div>
    </div>

    <div class=" flex flex-1 flex-wrap sm:flex-nowrap  ml-20    ">
        <div class=" w-[96%] ">
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
    {#if comment['profile']['username'] === $usershortinfo.username}
        {#if is_edit}
            <div class="mt-4 flex ">
                <div class="cursor-pointer w-fit h-fit">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class=" h-6 w-6 bg-white rounded-full mt-2 -mr-3 cursor-pointer fill-[#F00]"
                        viewBox="0 0 1792 1792"
                        on:click="{() => {
                            is_edit = false;
                            txt = comment['comment'];
                        }}"
                        on:keypress="{() => {}}"
                    >
                        <path
                            d="M1277 1122q0-26-19-45l-181-181 181-181q19-19 19-45 0-27-19-46l-90-90q-19-19-46-19-26 0-45 19l-181 181-181-181q-19-19-45-19-27 0-46 19l-90 90q-19 19-19 46 0 26 19 45l181 181-181 181q-19 19-19 45 0 27 19 46l90 90q19 19 46 19 26 0 45-19l181-181 181 181q19 19 45 19 27 0 46-19l90-90q19-19 19-46zm387-226q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"
                        >
                        </path>
                    </svg>
                </div>
                <div class="flex-1">
                    <FullInput
                        bind:text="{txt}"
                        sendFunc="{updateComment}"
                        placeholder="Write your comment . . ."
                    />
                </div>
            </div>
        {/if}
    {/if}
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

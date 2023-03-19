<script>
    import axios from 'axios';
    import { config } from './../../stores/accounts/auth';
    import { baseurl } from '../functions';
    import { location } from 'svelte-spa-router';
    import { postcomments } from './../../stores/posts/posts';
    import Number from '../Number.svelte';
    import FullInput from '../ui/FullInput.svelte';

    export let num_comments, num_likes, is_liked, allow_comments, id;

    const makeLikeFunc = (e) => {
        axios.post(`${baseurl}/posts/like/`, { id }, config).then((res) => {
            if (is_liked) num_likes = num_likes - 1;
            else num_likes = num_likes + 1;
            is_liked = !is_liked;
        });
    };

    const addcomment = (comment) => {
        if (comment.trim().length !== 0) {
            axios
                .post(`${baseurl}/posts/comment/${id}/`, { comment }, config)
                .then((res) => {
                    num_comments = num_comments + 1;

                    if ($location.startsWith('/post/'))
                        postcomments.update((data) => [res.data, ...data]);
                });
        }
    };
</script>

<div class="flex flex-shrink-0 py-1 px-3 mb-2 justify-start   ">
    <div class="mt-2 flex-1   items-center  ">
        <div
            on:click="{makeLikeFunc}"
            on:keypress="{(e) => {}}"
            class="  inline-block  mt-2 ml-3 cursor-pointer active:text-rose-600 
            "
        >
            <div class="inline-block w-fit h-fit  absolute">
                <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    class="w-5 h-5    {is_liked
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
                <span class="text-sm  ml-6">
                    <Number number="{num_likes}" /> Like{#if num_likes !== 1}s{/if}
                </span>
            </div>
        </div>
    </div>

    <div class="mt-2   items-center  flex-1 ">
        <div
            class=" inline-block  mt-2 absolute {allow_comments
                ? ''
                : 'cursor-not-allowed text-gray-400'}"
        >
            <div class="inline-block  w-fit h-fit pt-1 absolute ">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5    "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    ></path>
                </svg>
            </div>

            <div class="inline-block   ml-6 ">
                <span class="text-sm ">
                    <Number number="{num_comments}" /> Commet{#if num_comments !== 1}s{/if}
                </span>
            </div>
        </div>
    </div>
</div>
{#if allow_comments === true}
    <FullInput sendFunc="{addcomment}" placeholder="Write your comment . . ." />
{/if}

<script>
    import {
        faComments,
        faHeart,
        faPaperPlane,
        faSmile,
    } from '@fortawesome/free-solid-svg-icons';
    import axios from 'axios';
    import { config } from './../../stores/accounts/auth';
    import Fa from 'svelte-fa/src/fa.svelte';
    import { baseurl } from '../functions';
    import { location } from 'svelte-spa-router';
    import { postcomments } from './../../stores/posts/posts';
    import Number from '../Number.svelte';
    import 'emoji-picker-element';

    let comment = '';
    $: emoji_list = true;
    export let num_comments, num_likes, is_liked, allow_comments;
    const makeLikeFunc = (e) => {
        let id = e.path[2].id;
        axios.post(`${baseurl}/posts/like/`, { id }, config).then((res) => {
            if (is_liked) num_likes = num_likes - 1;
            else num_likes = num_likes + 1;
            is_liked = !is_liked;
        });
    };

    const addcomment = (e) => {
        let id = e.path[1].id;
        console.log(comment !== undefined);
        if (comment.trim().length !== 0) {
            axios
                .post(`${baseurl}/posts/comment/${id}/`, { comment }, config)
                .then((res) => {
                    num_comments = num_comments + 1;
                    comment = '';
                    emoji_list = true;

                    if ($location.startsWith('/post/'))
                        postcomments.update((data) => [res.data, ...data]);
                });
        }
    };
    function onEmoji(event) {
        comment += event.detail.emoji.unicode;
    }
</script>

<div class="flex  p-1">
    <button
        on:click="{makeLikeFunc}"
        class="w-1/2 p-1 mx-2 border-2 dark:text-white border-gray-600 dark:border-white rounded-full  hover:outline-none  shadow 
     outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-100  {is_liked
            ? 'text-rose-600  dark:bg-rose-500 dark:active:text-white'
            : ''}"
    >
        <Fa icon="{faHeart}" class="inline" />
        <Number number="{num_likes}" /> Like{#if num_likes !== 1}s{/if}
    </button>

    <button
        class="w-1/2 p-1 mx-2 border-2 border-gray-600 dark:border-white  rounded-full text-rose-600 dark:text-white hover:outline-none  shadow 
     outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-100 "
        ><Fa icon="{faComments}" class="inline text-rose-600" />
        <Number number="{num_comments}" />
        Commet{#if num_comments !== 1}s{/if}
    </button>
</div>
{#if allow_comments}
    <form class="flex w-full mx-auto" on:submit|preventDefault="{addcomment}">
        <input
            bind:value="{comment}"
            placeholder="Write your comment . . ."
            class="placeholder:pl-2  focus:outline-none  w-10/12 ml-3 my-2 py-1 border-2 border-rose-200 text-gray-700 rounded-full pl-4"
        />
        <div class="z-50 text-2xl mt-2 pl-3 relative ">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div
                on:click="{() => {
                    emoji_list = !emoji_list;
                }}"
            >
                <Fa
                    icon="{faSmile}"
                    class="inline cursor-pointer text-slate-700"
                />
            </div>
            <emoji-picker
                on:emoji-click="{onEmoji}"
                emoji-version="14.0"
                class="dark:dark light absolute right-2 bottom-12 {emoji_list
                    ? 'hidden'
                    : ''}"></emoji-picker>
        </div>
        <button
            type="submit"
            class="w-1/12 ml-5 active:bg-none  focus:outline-none  "
            ><Fa icon="{faPaperPlane}" /></button
        >
    </form>
{/if}

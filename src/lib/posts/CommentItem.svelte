<script>
    import { faHeart } from '@fortawesome/free-solid-svg-icons';
    import Number from '../Number.svelte';
    import moment from 'moment';
    import Fa from 'svelte-fa/src/fa.svelte';
    import axios from 'axios';
    import { baseurl } from '../functions';
    import { config } from './../../stores/accounts/auth';

    export let comment = {};
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
</script>

<div class="flex  flex-col  rounded-lg p-2 mb-2 mx-3 ">
    <div class="flex space-x-3 pt-2">
        <div class="flex my-auto space-x-3 w-10/12">
            <img
                src="{`http://127.0.0.1:1111${comment['profile']['photo_icon']}`}"
                alt="aza"
                class="w-10 h-10 rounded-full cursor-pointer  border-2 shadow-md -mt-2"
            />
            <div>
                <p class="text-sm font-bold">
                    {comment['profile']['username']}
                </p>
            </div>
            <div>
                <p class="text-sm  text-gray-400 ">
                    {moment(comment['created']).fromNow(true)}
                </p>
            </div>
        </div>
        <div class="-mt-1  px-7 sm:px-4 ">
            <span class="font-bold cursor-pointer">...</span>
        </div>
    </div>
    <div
        class=" flex flex-wrap sm:flex-nowrap  border-b-2 w-10/12 mx-auto -mt-2 p-2 "
    >
        <div class=" w-full ml-4 sm:ml-0">
            <p class="text-sm">{comment['comment']}</p>
        </div>
        <div
            on:click="{likeComment}"
            class="cursor-pointer mt-1  sm:mt-0 w-2/12 ml-4 "
        >
            <Fa
                icon="{faHeart}"
                class="inline active:text-rose-600  {comment['is_liked']
                    ? 'text-rose-600  dark:active:text-white'
                    : 'hover:animate-ping'}"
            />
        </div>
        <div class=" w-5/12 sm:w-3/12 flex flex-nowrap mt-1 sm:mt-0">
            <p class="">
                <Number number="{comment['num_likes']}" /> Like{#if comment['num_likes'] !== 1}s{/if}
            </p>
        </div>
    </div>
</div>

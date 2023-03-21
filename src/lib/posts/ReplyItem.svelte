<script>
    import Number from '../Number.svelte';
    import moment from 'moment';
    import axios from 'axios';
    import { baseurl } from '../functions';
    import { config } from './../../stores/accounts/auth';

    export let reply = {};

    const likereply = async () => {
        await axios
            .post(
                `${baseurl}/posts/comment/reply/like/`,
                { id: reply['id'] },
                config
            )
            .then((res) => {
                reply['is_liked'] = !reply['is_liked'];
                if (reply['is_liked'])
                    reply['num_likes'] = reply['num_likes'] + 1;
                else reply['num_likes'] = reply['num_likes'] - 1;
            });
    };
</script>

<div
    class="flex  flex-col mt-3   dark:bg-inherit bg-slate-100 p-2 mb-4 mx-3   "
>
    <div class="">
        <div class="flex  flex-row w-full   items-start">
            <div class=" pl-6">
                <img
                    src="{reply['profile']['photo_icon']}"
                    alt="{reply['profile']['username']}"
                    class="w-8 h-8 rounded-full cursor-pointer object-cover mr-4 shadow"
                />
            </div>
            <div class="flex  flex-row w-full   items-center">
                <div class=" px-1 ">
                    <h2
                        class="text-sm cursor-pointer font-semibold text-gray-900  dark:text-white "
                    >
                        {reply['profile']['username']}
                    </h2>
                </div>
                <div class=" px-3">
                    <small class="text-xs text-gray-700 dark:text-slate-200  "
                        >{moment(reply.created).fromNow()}</small
                    >
                </div>
                <div class=" flex-1 text-right">
                    <span class="font-bold text-xs cursor-pointer">...</span>
                </div>
            </div>
        </div>
    </div>

    <div class=" flex flex-1 flex-wrap sm:flex-nowrap  ml-20    ">
        <div class=" w-full ">
            <p class="text-gray-900 dark:text-white  mb-2 font-mono text-sm">
                {reply['reply']}
            </p>
        </div>
    </div>
    <div class="flex flex-1  w-10/12 mx-auto  items-center ">
        <div class=" ">
            <div
                on:click="{likereply}"
                on:keypress="{(e) => {}}"
                class=" inline-block  mt-2  cursor-pointer 
            "
            >
                <div class="inline-block absolute ">
                    <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        class="w-5 h-5    {reply['is_liked']
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
                    <span class="text-sm  ml-8">
                        <Number number="{reply['num_likes']}" /> Like{#if reply['num_likes'] !== 1}s{/if}
                    </span>
                </div>
            </div>
        </div>
    </div>
</div>

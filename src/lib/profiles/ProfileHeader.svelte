<script>
    import Wapper from '../Wapper.svelte';
    import Number from '../Number.svelte';
    import { config, usershortinfo } from '../../stores/accounts/auth';
    import axios from 'axios';
    import { baseurl } from '../functions';
    import { push } from 'svelte-spa-router';
    export let userdata = {};
    let is_owner = userdata['user'].username === $usershortinfo['username'];
    const followUser = () => {
        if (!is_owner)
            axios
                .post(
                    `${baseurl}/accounts/follow/user_user/`,
                    {
                        username: userdata['user'].username,
                    },
                    config
                )
                .then((res) => {
                    userdata['is_following'] = !userdata['is_following'];

                    userdata['count_followed_by'] =
                        userdata['count_followed_by'] +
                        (userdata['is_following'] ? 1 : -1);
                });
    };
</script>

<Wapper>
    <div class="  mx-auto w-11/12 p-4">
        <div class="flex flex-row items-center ">
            <div
                style="background-image: url({userdata['photo']})"
                class="w-32 h-32 bg-cover   bg-center rounded-full border-4 object-cover shadow"
            ></div>
            <div class="flex-1">
                <div
                    class="flex-1 space-x-6 mb-4 flex pb-3 items-center border-b w-fit mx-auto"
                >
                    <span class="text-sm text-gray-700 dark:text-white "
                        ><span class="font-bold"
                            ><Number
                                number="{userdata['count_following_profile']}"
                            /></span
                        > Following</span
                    >
                    <div class="w-0 h-4 border border-gray-300"></div>
                    <span class="text-sm text-gray-700 dark:text-white"
                        ><span class="font-bold"
                            ><Number
                                number="{userdata['count_followed_by']}"
                            /></span
                        > Followers</span
                    >
                </div>

                <div
                    class="flex-1 {is_owner
                        ? 'space-x-6'
                        : 'space-x-11'} flex w-fit mx-auto items-center"
                >
                    <span
                        on:click="{followUser}"
                        on:keypress="{() => {}}"
                        class="{is_owner
                            ? 'cursor-not-allowed'
                            : 'cursor-pointer'} {userdata['is_following'] &&
                        !is_owner
                            ? 'border-rose-600 text-rose-600'
                            : 'bg-rose-600'} text-white border-2 px-2 h-fit w-fit py-1 rounded-lg"
                        >{#if userdata['is_following'] && !is_owner}Unfollow{:else}Follow{/if}</span
                    >
                    <span
                        on:click="{() => {
                            if (!is_owner)
                                push(`/chat/${userdata['user'].username}`);
                        }}"
                        on:keypress="{(e) => {}}"
                        class="cursor-pointer {is_owner
                            ? 'cursor-not-allowed'
                            : 'cursor-pointer'} bg-rose-600 border-2 text-white px-2 py-1  rounded-lg w-fit h-fit"
                        >Message</span
                    >
                    {#if is_owner}
                        <span
                            ><svg
                                class="w-6 h-6 text-gray-700 dark:text-white cursor-pointer"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                ></path></svg
                            ></span
                        >{/if}
                </div>
            </div>
        </div>
        {#if userdata['user'].first_name !== '' || userdata['user'].last_name !== ''}
            <div class="text-center mt-2 text-3xl font-medium">
                {userdata['user'].first_name}
                {userdata['user'].last_name}
            </div>
        {/if}
        <div class="text-center mt-2 font-light text-sm"></div>
        <div class="text-center font-normal text-lg">
            {userdata['user'].username}
        </div>
        <div class="px-6 text-center mt-2 font-light text-sm">
            <p>
                {userdata['bio']}
            </p>
        </div>
        <hr class="mt-8" />
        <div class="flex p-4">
            <div class="w-1/2 text-center">
                <span class="font-bold"
                    ><Number number="{userdata['num_total_posts']}" /></span
                > Posts
            </div>

            <div class="w-0 border border-gray-300"></div>
            <div class="w-1/2 text-center">
                <span class="font-bold"
                    ><Number
                        number="{userdata['count_following_profile']}"
                    /></span
                > Following Pages
            </div>
        </div>
    </div>
</Wapper>

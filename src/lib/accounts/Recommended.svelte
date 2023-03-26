<script>
    import Wapper from '../Wapper.svelte';
    import { config, usershortinfo } from '../../stores/accounts/auth';
    import { baseurl } from '../functions';
    import axios from 'axios';
    import { recommended, showRecommended } from '../../stores/tools';
    import Number from '../Number.svelte';

    let is_loaded = false;
    $: {
        let suggestedUrl = '';
        if ($usershortinfo.ftype === 'page') {
            suggestedUrl = '/accounts/suggestedusers/user_user/14/';
        } else {
            suggestedUrl = '/pages/suggestedpages/14/';
        }
        if ($usershortinfo.ftype !== null) {
            axios(`${baseurl}${suggestedUrl}`, config).then((res) => {
                recommended.set(res.data);
                is_loaded = true;
            });
        }
    }
    const followUser = (username) => {
        axios
            .post(
                `${baseurl}/accounts/follow/user_user/`,
                {
                    username,
                },
                config
            )
            .then((res) => {
                let elm = document.getElementById(username);
                elm.classList.toggle('bg-rose-600');
                elm.classList.toggle('text-white');
                elm.classList.toggle('text-rose-600');
                elm.classList.toggle('ring-1');
                elm.classList.toggle('ring-rose-600');
                elm.classList.toggle('dark:text-white');
                elm.classList.toggle('-left-2');
                elm.classList.toggle('-left-4');
                if (elm.innerText === 'Follow') {
                    elm.innerText = 'Unfollow';
                } else {
                    elm.innerText = 'Follow';
                }
            });
    };
</script>

{#if is_loaded}
    <Wapper>
        <div class="h-fit w-full ">
            <div class="flex flex-row items-center mt-2  mx-4">
                <div
                    class="font-bold text-xl flex-1 dark:text-white text-gray-900"
                >
                    Suggestions
                </div>
                <div class=" cursor-pointer float-right">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6 rotate-45 text-rose-600 rounded-full hover:bg-rose-600 hover:text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        on:click="{() => {
                            showRecommended.set(false);
                        }}"
                        on:keypress="{() => {}}"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                </div>
            </div>
            <div class="flex flex-row items-center mx-3 my-1   overflow-x-auto">
                {#each $recommended as account}
                    <div
                        class="h-full relative  flex flex-col items-center m-2 px-8   dark:ring-1 ring-rose-600 shadow-md rounded-md"
                    >
                        <div
                            style="background-image: url({account.photo_icon})"
                            class="w-14 h-14 bg-cover bg-center  cursor-pointer object-cover {account.ftype ===
                            'profile'
                                ? 'rounded-full'
                                : 'rounded-lg'} border-1 mt-2 mx-1 shadow"
                        ></div>
                        <div class="text-semibold mt-1">{account.username}</div>
                        <div
                            class="text-xs text-gray-700 dark:text-gray-300 mb-2"
                        >
                            <Number number="{account.count_followed_by}" /><span
                                class="ml-1">Followers</span
                            >
                        </div>
                        <div class="relative w-full h-10  mb-3">
                            <div class="  z-50 mx-auto  mt-5 justify-center  ">
                                <span
                                    id="{account.username}"
                                    on:click="{() => {
                                        followUser(account.username);
                                    }}"
                                    on:keypress="{() => {}}"
                                    class="cursor-pointer 
                                     bg-rose-600 text-white absolute -left-2 bottom-0
                                       px-4 h-fit w-fit py-1 rounded-md shadow-md justify-center"
                                    >Follow</span
                                >
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </Wapper>
{/if}

<script>
    import Number from '../Number.svelte';
    import moment from 'moment';
    import axios from 'axios';
    import { baseurl } from '../functions';
    import { config, usershortinfo } from './../../stores/accounts/auth';
    import { onMount } from 'svelte';
    import FullInput from '../ui/FullInput.svelte';
    import { link } from 'svelte-spa-router';

    export let reply = {};
    let isActive = false,
        is_edit = false,
        txt = reply['reply'],
        is_delete = false;
    onMount(() => {
        txt = reply['reply'];
    });

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
    const updateReply = (text) => {
        axios
            .patch(
                `${baseurl}/posts/comment/reply/update/${reply['id']}/`,
                { reply: text, deleted: is_delete },
                config
            )
            .then((res) => {
                isActive = false;
                is_edit = false;
                reply['reply'] = res.data['reply'];
                if (is_delete) {
                    let elm = document.getElementById(reply['id']);
                    elm.classList.add('hidden');
                }
            });
    };
</script>

<div
    class="flex  flex-col mt-3   dark:bg-inherit bg-slate-100 p-2 mb-4 mx-3   "
    id="{reply['id']}"
>
    <div class="">
        <div class="flex  flex-row w-full   items-start">
            <div class=" pl-6">
                <a
                    href="{`/${reply['profile']['ftype']}/${reply['profile']['username']}`}"
                    use:link
                >
                    <div
                        style="background-image: url({reply['profile'][
                            'photo_icon'
                        ]})"
                        class="w-7 h-7 bg-cover bg-center {reply['profile'][
                            'ftype'
                        ] === 'profile'
                            ? 'rounded-full'
                            : 'rounded-lg'} cursor-pointer object-cover mr-4 shadow"
                    ></div>
                </a>
            </div>
            <div class="flex   flex-row w-full   items-center">
                <div class=" px-1 ">
                    <a
                        href="{`/${reply['profile']['ftype']}/${reply['profile']['username']}`}"
                        use:link
                    >
                        <h2
                            class="text-sm cursor-pointer font-semibold text-gray-900  dark:text-white "
                        >
                            {reply['profile']['username']}
                        </h2>
                    </a>
                </div>
                <div class=" px-3">
                    <small class="text-xs text-gray-700 dark:text-slate-200  "
                        >{moment(reply.created).fromNow()}</small
                    >
                </div>
                {#if reply['profile']['username'] === $usershortinfo.username}
                    <div class=" px-3   flex-1">
                        <div
                            class=" cursor-pointer float-right"
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
                                    class=" absolute  right-0 top-6 z-50 w-56 py-1 mb-4 h-fit rounded-md shadow-lg min-w-max  ring-1 ring-black ring-opacity-25 dark:bg-dark  focus:outline-none bg-white dark:bg-slate-900 dark:text-white"
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
                                            updateReply(reply['reply']);
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
    </div>

    <div class=" flex flex-1 flex-wrap sm:flex-nowrap  ml-[4.5rem] mt-2  ">
        <div class="  w-[98%] ">
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
{#if reply['profile']['username'] === $usershortinfo.username}
    {#if is_edit}
        <div class="mt-4 flex ">
            <div class="cursor-pointer w-fit h-fit">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class=" h-6 w-6 bg-white rounded-full mt-2 -mr-3 cursor-pointer fill-[#F00]"
                    viewBox="0 0 1792 1792"
                    on:click="{() => {
                        is_edit = false;
                        txt = reply['reply'];
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
                    sendFunc="{updateReply}"
                    placeholder="Write your reply . . ."
                />
            </div>
        </div>
    {/if}
{/if}

<script>
    import axios from 'axios';
    import moment from 'moment';
    import { link, push } from 'svelte-spa-router';
    import {
        config,
        isLoggin,
        usershortinfo,
    } from '../../stores/accounts/auth';
    import { baseurl } from '../functions';
    import { fade, fly } from 'svelte/transition';
    import { postItems } from '../../stores/posts/posts';
    export let profile = undefined,
        created = undefined,
        owner = undefined,
        id = undefined,
        is_saved = undefined,
        num_total_saved = -1;
    let is_delete = false,
        is_active = false,
        is_owner = false;
    $: username = profile['username'];
    $: image = profile['photo_icon'];
    $: ftype = profile['ftype'];
    $: changed = false;
    $: isActive = false;
    $: if (!isLoggin) {
        is_owner =
            $usershortinfo.username === profile['username'] ||
            $usershortinfo.username === owner['username'];
    }

    const infoChange = () => {
        if (changed) {
            username = profile['username'];
            image = profile['photo_icon'];
            ftype = profile['ftype'];
            changed = !changed;
        } else {
            username = owner['username'];
            image = owner['photo_icon'];
            ftype = owner['ftype'];
            changed = !changed;
        }
    };
    const savePost = () => {
        axios.post(`${baseurl}/posts/save/`, { id }, config).then((res) => {
            is_saved = !is_saved;
            isActive = !isActive;
            num_total_saved = num_total_saved + (is_saved ? 1 : -1);
        });
    };
    const deletePost = () => {
        axios
            .patch(`${baseurl}/posts/${id}/`, { deleted: true }, config)
            .then((res) => {
                postItems.update((data) => {
                    return data.filter((data) => data.id !== res.data.id);
                });
                is_delete = false;
            });
    };
</script>

{#if !is_delete}
    <div class="flex p-0.5 space-x-2 w-full mb-2" in:fade>
        <div class="flex items-center px-4 py-2 w-full ">
            <div class="">
                <a href="{`/${ftype}/${username}`}" use:link>
                    <div
                        style="background-image: url({image})"
                        class="w-12 h-12 bg-cover bg-center {ftype === 'profile'
                            ? 'rounded-full'
                            : 'rounded-lg'} cursor-pointer object-cover mr-4 shadow"
                    ></div>
                </a>
            </div>

            <div class="  w-fit">
                <div class="flex flex-col items-start justify-between">
                    <span>
                        <span
                            class="text-lg cursor-pointer font-semibold text-gray-900 dark:text-white -mt-1"
                        >
                            <a href="{`/${ftype}/${username}`}" use:link>
                                {username}</a
                            ></span
                        >
                        <span class="text-sm font-semibold">
                            {#if owner.username !== undefined}<span
                                    >{#if changed} to {:else} by{/if}
                                </span>
                                <span
                                    class="text-rose-400 cursor-pointer text-[0.93rem]"
                                    on:click="{infoChange}"
                                    on:keypress="{() => {}}"
                                >
                                    {#if changed}
                                        {profile.username}
                                    {:else}
                                        {owner.username}{/if}
                                </span>{/if}
                        </span>
                    </span>

                    <div>
                        <small class="text-sm text-gray-700 dark:text-slate-200"
                            >{moment(created).fromNow()}</small
                        >
                    </div>
                </div>
            </div>

            <!-- <div class="flex-1   px-3 "></div> -->
            <div class=" flex-1   ">
                <div class="flex items-center float-right space-x-2 ">
                    <div
                        on:click="{() => (isActive = !isActive)}"
                        on:keypress="{() => {}}"
                        class="pr-2 cursor-pointer w-fit h-fit"
                    >
                        <span class="font-bold float-right  cursor-pointer"
                            ><svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                class=" w-7 h-6 fill-gray-700 dark:fill-white"
                                ><path d="M0 0h24v24H0V0z" fill="none"
                                ></path><path
                                    d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
                                ></path></svg
                            ></span
                        >
                    </div>
                </div>
                <div
                    class="relative {isActive && !isLoggin ? '' : 'hidden'} "
                    on:mouseleave="{(e) => {
                        isActive = false;
                    }}"
                >
                    <div
                        class=" absolute top-7 right-2 z-50 w-56 py-1 mb-4 h-fit rounded-md shadow-lg min-w-max  ring-1 ring-black ring-opacity-25 dark:bg-dark  focus:outline-none bg-white dark:bg-slate-900 dark:text-white"
                    >
                        {#if is_owner}
                            <span
                                on:click="{() => {
                                    isActive = false;

                                    push(`/post/${id}/edit`);
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
                                    is_delete = !is_delete;
                                    isActive = !isActive;
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
                        {/if}
                        <span
                            on:click="{() => {
                                savePost();
                            }}"
                            on:keypress="{() => {}}"
                            class="px-4 py-2 text-sm  transition-colors hover:bg-gray-100 dark:text-light dark:hover:bg-rose-600 flex space-x-2 cursor-pointer"
                        >
                            <span>
                                <svg
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    class="w-5 h-5    inline
                               {is_saved
                                        ? 'fill-yellow-300'
                                        : ' '}  text-yellow-300"
                                    stroke="currentColor "
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                                    ></path>
                                </svg></span
                            ><span
                                >{#if !is_saved}Save{:else} Unsave {/if}</span
                            >
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
{:else}
    <div class="h-[10rem] flex flex-row items-center">
        <div
            in:fly="{{ y: 100, duration: 1000 }}"
            class="bg-white w-8/12  z-50 items-center flex flex-col space-y-4 pb-4 pt-2 rounded-2xl absolute  translate-x-1/4 "
        >
            <div class="text-rose-600 font-bold">
                Do you want to delet your account?
            </div>

            <div class="flex flex-1 w-full justify-center items-center ">
                <div
                    class="text-center flex-1  "
                    on:click="{() => {
                        is_active = false;
                        deletePost();
                    }}"
                    on:keypress="{() => {}}"
                >
                    <span
                        class=" bg-green-600 text-white rounded-lg cursor-pointer shadow-lg w-24 py-2 px-5"
                        >Conform</span
                    >
                </div>

                <div
                    class="text-center flex-1 "
                    on:click="{() => {
                        is_delete = !is_delete;
                    }}"
                    on:keypress="{() => {}}"
                >
                    <span
                        class=" bg-[#FF0000] text-white  rounded-lg cursor-pointer shadow-lg w-24 py-2 px-5"
                        >Cansole</span
                    >
                </div>
            </div>
        </div>
    </div>
{/if}

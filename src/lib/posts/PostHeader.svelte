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
        show_post_to = undefined,
        num_total_saved = -1,
        is_delete = false;
    let is_active = false,
        is_owner = false;
    $: username = profile['username'];
    $: image = profile['photo_icon'];
    $: ftype = profile['ftype'];
    $: changed = false;
    $: isActive = false;
    $: if ($isLoggin) {
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

<div class="flex p-0.5 space-x-2 w-full mb-2">
    <div
        class="flex items-center px-4 py-2 w-full {is_delete ? 'blur-sm' : ''}"
    >
        <div class="relative">
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
                    <small
                        class="text-sm flex items-center flex-row-reverse text-gray-700 dark:text-slate-200"
                    >
                        <span class="ml-1.5">
                            {#if show_post_to === 'onlyme'}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="w-4 h-4 font-bold dark:fill-white fill-gray-700"
                                    viewBox="0 0 24 24"
                                    stroke-width="6"
                                    fill="none"
                                >
                                    <path
                                        d="M17 10.25H16.75V8C16.75 6.74022 16.2496 5.53204 15.3588 4.64124C14.468 3.75045 13.2598 3.25 12 3.25C10.7402 3.25 9.53204 3.75045 8.64124 4.64124C7.75045 5.53204 7.25 6.74022 7.25 8V10.25H7C6.27065 10.25 5.57118 10.5397 5.05546 11.0555C4.53973 11.5712 4.25 12.2707 4.25 13V18C4.25 18.7293 4.53973 19.4288 5.05546 19.9445C5.57118 20.4603 6.27065 20.75 7 20.75H17C17.7293 20.75 18.4288 20.4603 18.9445 19.9445C19.4603 19.4288 19.75 18.7293 19.75 18V13C19.75 12.2707 19.4603 11.5712 18.9445 11.0555C18.4288 10.5397 17.7293 10.25 17 10.25ZM8.75 8C8.75 7.13805 9.09241 6.3114 9.7019 5.7019C10.3114 5.09241 11.138 4.75 12 4.75C12.862 4.75 13.6886 5.09241 14.2981 5.7019C14.9076 6.3114 15.25 7.13805 15.25 8V10.25H8.75V8ZM18.25 18C18.25 18.3315 18.1183 18.6495 17.8839 18.8839C17.6495 19.1183 17.3315 19.25 17 19.25H7C6.66848 19.25 6.35054 19.1183 6.11612 18.8839C5.8817 18.6495 5.75 18.3315 5.75 18V13C5.75 12.6685 5.8817 12.3505 6.11612 12.1161C6.35054 11.8817 6.66848 11.75 7 11.75H17C17.3315 11.75 17.6495 11.8817 17.8839 12.1161C18.1183 12.3505 18.25 12.6685 18.25 13V18Z"
                                    ></path>
                                </svg>
                            {/if}
                            {#if show_post_to === 'everyone'}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="w-6 h-6 dark:fill-white fill-gray-700"
                                    viewBox="-20 0 190 190"
                                    stroke-width="3"
                                    fill="none"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M76.54 149.16C14.75 149.16 17.54 60.8701 75.54 60.8701C133.34 60.8701 133 149.16 76.54 149.16ZM75.48 66.8001C72.6891 66.7949 69.9038 67.0493 67.16 67.5601L68.22 73.6301L55.52 82.6301L44.37 81.9401C43.2722 83.477 42.2928 85.0949 41.44 86.7801L43.78 108.67L50.66 117.51L43.6 127.51C49.89 136.72 60.73 143.23 76.33 143.23C98.79 143.23 110.98 127.07 112.75 109.62L107.48 104.83L99.75 101.89L98.49 103.8L101.49 106.95L103.81 107.3L104.81 110.66L97.51 114.35L92.51 105.64L90.78 109.56L94.55 117.85L99.18 119.2L91.72 123.2L82 137.14L73.74 137.79L71.93 129.79L73.3 118L63.83 115.48L60.71 108L62.2 100.8L71.2 97.1101L79.71 101.98L84.2 100.51L90.89 102.32L92.41 93.7901L83.8 90.9401L83.7 96.5001L78.23 96.2501L77.76 90.3701L71 91.8601L71.51 86.6901L68.63 83.3501L73.01 79.3501L80.13 83.3501L82.36 78.6201L88 76.2201L91.76 77.8801L95.58 77.1101L97.23 73.1101C91.5 69.1701 84.27 66.8001 75.48 66.8001Z"
                                    ></path>
                                </svg>
                            {/if}
                            {#if show_post_to === 'followers'}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="w-4 h-4 dark:fill-white fill-gray-700"
                                    viewBox="0 0 64 64"
                                    stroke-width="3"
                                    fill="none"
                                    ><circle cx="22.83" cy="22.57" r="7.51"
                                    ></circle><path
                                        d="M38,49.94a15.2,15.2,0,0,0-15.21-15.2h0a15.2,15.2,0,0,0-15.2,15.2Z"
                                    ></path><circle
                                        cx="44.13"
                                        cy="27.22"
                                        r="6.05"></circle><path
                                        d="M42.4,49.94h14A12.24,12.24,0,0,0,44.13,37.7h0a12.21,12.21,0,0,0-5.75,1.43"
                                    ></path></svg
                                >{/if}
                        </span>
                        <span> {moment(created).fromNow()}</span></small
                    >
                </div>
            </div>
        </div>

        <!-- <div class="flex-1   px-3 "></div> -->
        <div class=" flex-1">
            <div class="flex items-center float-right space-x-2">
                <div
                    on:click="{() => (isActive = !isActive)}"
                    on:keypress="{() => {}}"
                    class="pr-2 cursor-pointer w-fit h-fit"
                >
                    <span class="font-bold float-right cursor-pointer"
                        ><svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            class=" w-7 h-6 fill-gray-700 dark:fill-white"
                            ><path d="M0 0h24v24H0V0z" fill="none"></path><path
                                d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
                            ></path></svg
                        ></span
                    >
                </div>
            </div>
            <div
                class="relative {isActive && $isLoggin ? '' : 'hidden'} "
                on:mouseleave="{(e) => {
                    isActive = false;
                }}"
            >
                <div
                    class=" absolute top-7 right-2 z-50 w-56 py-1 mb-4 h-fit rounded-md shadow-lg min-w-max ring-1 ring-black ring-opacity-25 dark:bg-dark focus:outline-none bg-white dark:bg-slate-900 dark:text-white"
                >
                    {#if is_owner}
                        <span
                            on:click="{() => {
                                isActive = false;

                                push(`/post/${id}/edit`);
                            }}"
                            on:keypress="{() => {}}"
                            class="flex px-4 py-2 text-sm transition-colors hover:bg-gray-100 dark:text-light dark:hover:bg-rose-600 space-x-2 cursor-pointer"
                        >
                            <div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    class="bi bi-pencil-square"
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
                            <span>Modifier</span>
                        </span>

                        <span
                            on:click="{() => {
                                is_delete = !is_delete;
                                isActive = !isActive;
                            }}"
                            on:keypress="{() => {}}"
                        >
                            <span
                                class="flex px-4 py-2 text-sm transition-colors hover:bg-gray-100 dark:text-light dark:hover:bg-rose-600 space-x-2 cursor-pointer"
                            >
                                <span
                                    ><svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-5 w-5"
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
                                <span>Supprimer</span>
                            </span>
                        </span>
                    {/if}
                    <span
                        on:click="{() => {
                            savePost();
                        }}"
                        on:keypress="{() => {}}"
                        class="px-4 py-2 text-sm transition-colors hover:bg-gray-100 dark:text-light dark:hover:bg-rose-600 flex space-x-2 cursor-pointer"
                    >
                        <span>
                            <svg
                                fill="none"
                                viewBox="0 0 24 24"
                                class="w-5 h-5 inline
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
                            >{#if !is_saved}Sauvegarder{:else}
                                Annuler l'enregistrement
                            {/if}</span
                        >
                    </span>
                </div>
            </div>
        </div>
    </div>
</div>
{#if is_delete}
    <div class="relative blur-none z-[100000000000]">
        <div
            class="absolute z-[100000000000] min-w-full overflow-hidden top-6 left-1/2 transform -translate-x-1/2 -translate-y-6"
            in:fly="{{ y: -400, duration: 400 }}"
            out:fade="{{ duration: 200 }}"
        >
            <div
                in:fly="{{ y: 100, duration: 800 }}"
                class="bg-white items-center w-[90%] mx-auto rounded shadow blur-none
            flex flex-col space-y-4 justify-around pb-4 pt-2 z-[100000000000]"
            >
                <div class="text-rose-600 font-bold">
                    Voulez-vous supprimer votre post?
                </div>

                <div class="flex flex-1 w-full justify-center items-center">
                    <div class="text-center flex-1">
                        <span
                            class=" bg-green-600 pointer-events-auto text-white rounded-lg cursor-pointer shadow-lg w-24 py-2 px-5"
                            on:click="{() => {
                                is_active = false;
                                deletePost();
                            }}"
                            on:keypress="{() => {}}">Se conformer</span
                        >
                    </div>

                    <div class="text-center flex-1">
                        <span
                            class=" bg-[#FF0000] pointer-events-auto text-white rounded-lg cursor-pointer shadow-lg w-24 py-2 px-5"
                            on:click="{() => {
                                is_delete = !is_delete;
                            }}"
                            on:keypress="{() => {}}">Annuler</span
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
{/if}
{#if is_delete}
    <style>
        body {
            overflow: hidden;
            pointer-events: none;
        }
    </style>
{/if}

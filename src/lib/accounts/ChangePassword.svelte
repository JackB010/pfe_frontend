<script>
    import axios from 'axios';
    import { onMount } from 'svelte';
    import { push } from 'svelte-spa-router';
    import { config, isLoggin } from '../../stores/accounts/auth';
    import { baseurl } from '../functions';
    import BackSection from '../ui/BackSection.svelte';
    import Wapper from '../Wapper.svelte';
    // let id;
    onMount(async () => {
        let id = params['id'];
    });

    let password = '',
        password_confirm = '',
        isShow = false;
    const show_error = (msg) => {
        let error = document.querySelector('#error');
        error.innerHTML = msg;
        error.classList.remove('hidden');
    };
    const loginFunc = async () => {
        let id = params['id'];

        if (password === password_confirm) {
            if (password.length < 8) {
                show_error('Password most have at least 8 caracters.');
                return;
            }
            await axios
                .post(
                    `${baseurl}/accounts/reset_password/change/${
                        id ? id + '/' : ''
                    }`,
                    {
                        password,
                        password_confirm,
                    },
                    config
                )
                .then((res) => {
                    push('/');
                })
                .catch((err) => {
                    show_error(err.data);
                    // show_error('Uncorrect password.');
                });
        } else {
            show_error('Passwords not matching.');
        }
    };
    export let params = {};
</script>

{#if !isLoggin}
    <BackSection name="{'Change Password'}" />
{/if}
<Wapper>
    <div class="border sm:mx-2 mx-1 rounded shadow  mt-28 mb-2 ">
        <form
            class="dark:text-white  w-full sm:w-10/12 dark:bg-slate-800 
         shadow-gray-500  mx-auto rounded p-4 sm:p-8 "
            on:submit|preventDefault="{loginFunc}"
        >
            <div class="mb-4 relative">
                <label
                    class="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
                    for="password"
                >
                    Password
                </label>
                <div class="absolute p-2 pointer-events-none">
                    <svg
                        aria-hidden="true"
                        class="w-5 h-5 text-gray-500 dark:text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        ></path>
                    </svg>
                </div>
                {#if !isShow}
                    <input
                        class="shadow appearance-none border  rounded w-full  pl-10 z-0
                py-2 px-3 text-gray-700 mb-3 leading-tight pr-6 focus:outline-none focus:ring-rose-600 focus:border-rose-600"
                        id="password"
                        type="password"
                        bind:value="{password}"
                        placeholder="password"
                        autocomplete="current-password"
                        required
                    />
                    <div class="absolute right-2 top-9  z-300 cursor-pointer">
                        <svg
                            aria-hidden="true"
                            class="w-5 h-5 text-gray-500 dark:text-gray-400 cursor-pointer z-30"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            on:click="{() => {
                                isShow = !isShow;
                            }}"
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
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            ></path>
                        </svg>
                    </div>
                {:else}
                    <input
                        class="shadow appearance-none border  rounded w-full  pl-10 z-0
                py-2 px-3 text-gray-700 mb-3 leading-tight pr-6 focus:outline-none focus:ring-rose-600 focus:border-rose-600"
                        id="password"
                        type="text"
                        bind:value="{password}"
                        placeholder="password"
                        autocomplete="current-password"
                        required
                    />
                    <div class="absolute right-2 top-9  z-300 cursor-pointer">
                        <svg
                            aria-hidden="true"
                            class="w-5 h-5 text-gray-500 dark:text-gray-400 cursor-pointer z-30"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            on:click="{() => {
                                isShow = !isShow;
                            }}"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                            ></path>
                        </svg>
                    </div>
                {/if}
            </div>
            <div class="mb-6">
                <label
                    class="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
                    for="password_confirm"
                >
                    Password Conform
                </label>
                <div class="absolute p-2 pointer-events-none">
                    <svg
                        aria-hidden="true"
                        class="w-5 h-5 text-gray-500 dark:text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        ></path>
                    </svg>
                </div>
                <input
                    class="shadow appearance-none border  rounded w-full 
                py-2 pl-10 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-rose-600 focus:border-rose-600"
                    id="password_confirm"
                    type="password"
                    autocomplete="new-password"
                    bind:value="{password_confirm}"
                    placeholder="password conform"
                />
                <p
                    class="text-red-500 text-xs italic hidden"
                    id="login_error"
                ></p>
            </div>
            <div class="flex items-center justify-between flex-col ">
                <div
                    class=" text-gray-100 text-lg text-center border-rose-600 
                 w-full bg-rose-600 dark:bg-rose-600  h-10 
                rounded mb-6 "
                >
                    <button
                        type="submit"
                        class="outline-none  w-full h-full  space-x-2"
                        >Change Password
                    </button>
                </div>
            </div>
        </form>
    </div>
</Wapper>

<div
    class="mx-auto text-center w-[96%] absolute bottom-0 mb-2 text-gray-500 text-xs dark:text-white"
>
    &copy;{new Date().getUTCFullYear()} Acme Corp. All rights reserved.
</div>

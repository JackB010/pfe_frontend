<script>
    import axios from 'axios';
    import { onMount } from 'svelte';
    import { push } from 'svelte-spa-router';
    import { config, isLoggin, msg } from '../../stores/accounts/auth';
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
                show_error(
                    'Le mot de passe doit comporter au moins 8 caractères.'
                );
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
                    $isLoggin ? config : {}
                )
                .then((res) => {
                    msg.set('le mot de passe a été changé avec succès.');
                    push('/');
                })
                .catch((err) => {
                    console.log(err);
                    show_error(err.data);
                });
        } else {
            show_error('Le mot de passe ne correspond pas.');
        }
    };
    document.title = 'Changer le mot de passe';
    export let params = {};
</script>

{#if $isLoggin}
    <BackSection name="{'Changer le mot de passe'}" />
{/if}
<Wapper>
    <div class="border sm:mx-2 mx-1 rounded shadow mt-28 mb-2">
        <div class="flex items-center justify-between flex-col">
            <span
                class="w-[5rem] h-[5rem] border-2 bg-rose-600/25 dark:bg-white/50 mt-4 rounded-full text-center"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    version="1.0"
                    id="Layer_1"
                    class="w-12 h-12 mt-3 mx-auto"
                    viewBox="0 0 64 64"
                    enable-background="new 0 0 64 64"
                    xml:space="preserve"
                >
                    <g>
                        <path
                            fill="#231F20"
                            d="M52,24h-6V14c0-7.732-6.268-14-14-14S18,6.268,18,14v10h-6c-2.211,0-4,1.789-4,4v32c0,2.211,1.789,4,4,4h40   c2.211,0,4-1.789,4-4V28C56,25.789,54.211,24,52,24z M20,14c0-6.627,5.373-12,12-12s12,5.373,12,12v10h-4V14c0-4.418-3.582-8-8-8   s-8,3.582-8,8v10h-4V14z M26,14c0-3.313,2.687-6,6-6s6,2.687,6,6v10H26V14z M54,60c0,1.104-0.896,2-2,2H12c-1.104,0-2-0.896-2-2v-4   h44V60z M54,54H10V34h44V54z M54,32H10v-4c0-1.104,0.896-2,2-2h40c1.104,0,2,0.896,2,2V32z"
                        ></path>
                        <path
                            fill="#231F20"
                            d="M29,44.979V49c0,1.657,1.343,3,3,3s3-1.343,3-3v-4.021c1.209-0.912,2-2.348,2-3.979c0-2.762-2.238-5-5-5   s-5,2.238-5,5C27,42.631,27.791,44.066,29,44.979z M32,38c1.657,0,3,1.343,3,3c0,1.305-0.837,2.403-2,2.816V49c0,0.553-0.447,1-1,1   s-1-0.447-1-1v-5.184c-1.163-0.413-2-1.512-2-2.816C29,39.343,30.343,38,32,38z"
                        ></path>
                    </g>
                </svg>
            </span>
            <span class="mt-4 -mb-2 text-2xl dark:text-gray-200 text-gray-700">
                Changer le mot de passe
            </span>
        </div>
        <form
            class="dark:text-white w-full sm:w-10/12 dark:bg-slate-800
         shadow-gray-500 mx-auto rounded p-4 sm:p-8"
            on:submit|preventDefault="{loginFunc}"
        >
            <div class="mb-4 relative">
                <label
                    class="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
                    for="password"
                >
                    Nouveau mot de passe
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
                        class="shadow appearance-none border rounded w-full pl-10 z-0
                py-2 px-3 text-gray-700 mb-3 leading-tight pr-6 focus:outline-none focus:ring-rose-600 focus:border-rose-600"
                        id="password"
                        type="password"
                        bind:value="{password}"
                        placeholder="Nouveau mot de passe"
                        autocomplete="current-password"
                        required
                    />
                    <div class="absolute right-2 top-9 z-300 cursor-pointer">
                        <svg
                            aria-hidden="true"
                            class="w-5 h-5 text-gray-500 cursor-pointer z-30"
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
                        class="shadow appearance-none border rounded w-full pl-10 z-0
                py-2 px-3 text-gray-700 mb-3 leading-tight pr-6 focus:outline-none focus:ring-rose-600 focus:border-rose-600"
                        id="password"
                        type="text"
                        bind:value="{password}"
                        placeholder="Nouveau mot de passe"
                        autocomplete="current-password"
                        required
                    />
                    <div class="absolute right-2 top-9 z-300 cursor-pointer">
                        <svg
                            aria-hidden="true"
                            class="w-5 h-5 text-gray-500 cursor-pointer z-30"
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
                    Retapez le nouveau mot de passe
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
                    class="shadow appearance-none border rounded w-full
                py-2 pl-10 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-rose-600 focus:border-rose-600"
                    id="password_confirm"
                    type="password"
                    autocomplete="new-password"
                    bind:value="{password_confirm}"
                    placeholder="Retapez le nouveau mot de passe"
                />
                <p class="text-red-500 text-xs italic hidden" id="error"></p>
            </div>
            <div class="flex items-center justify-between flex-col">
                <div
                    class=" text-gray-100 text-lg text-center border-rose-600
                 w-full bg-rose-600 dark:bg-rose-600 h-10
                rounded mb-6"
                >
                    <button
                        type="submit"
                        class="outline-none w-full h-full space-x-2"
                        >Changer le mot de passe
                    </button>
                </div>
            </div>
        </form>
    </div>
    <div
        class="text-center flex flex-col items-center text-gray-500 text-xs dark:text-white"
    >
        <div>
            &copy;{new Date().getUTCFullYear()} USTHB. All rights reserved.
        </div>
    </div>
</Wapper>

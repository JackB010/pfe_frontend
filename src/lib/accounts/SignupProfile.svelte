<script>
    import axios from 'axios';
    import { push, link } from 'svelte-spa-router';
    import { baseurl } from '../functions';
    import Wapper from '../Wapper.svelte';
    import { msg, username } from '../../stores/accounts/auth';

    let username_ = '',
        email = '',
        password = '',
        password1 = '',
        isShow = false;

    const show_error = (msg) => {
        let error = document.querySelector('#login_error');
        error.innerHTML = msg;
        error.classList.remove('hidden');
        setTimeout(() => {
            error.classList.add('hidden');
        }, 2500);
    };
    const signupFunc = async () => {
        if (password === password1) {
            if (password.length < 8) {
                show_error('Password most have at least 8 caracters.');
                return;
            }
            await axios
                .post(`${baseurl}/accounts/register/`, {
                    username: username_,
                    email,
                    password,
                    password1,
                })
                .then((res) => {
                    username.set(username_);

                    push('/conform');
                })
                .catch((err) => {
                    console.log(err.response['data']);
                    if (err.response['data']['username'])
                        show_error(err.response['data']['username'][0]);
                    if (err.response['data']['email'])
                        show_error(err.response['data']['email'][0]);
                    if (err.response['data']['non_field_errors'])
                        show_error(err.response['data']['non_field_errors'][0]);
                });
        } else {
            show_error('Passwords not matching.');
        }
    };
    document.title = "S'inscrire en tant que profil";
    export const params = {};
</script>

<Wapper>
    <div class="border sm:mx-2 mx-1 rounded shadow mt-16">
        <div class="flex items-center justify-between flex-col">
            <span
                class="w-[5rem] h-[5rem] border-2 bg-rose-600/25 dark:bg-white/50 mt-4 rounded-full text-center"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-12 h-12 mt-3 mx-auto"
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <path
                        stroke="#231F20"
                        d="M17.5 21.0001H6.5C5.11929 21.0001 4 19.8808 4 18.5001C4 14.4194 10 14.5001 12 14.5001C14 14.5001 20 14.4194 20 18.5001C20 19.8808 18.8807 21.0001 17.5 21.0001Z"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"></path>
                    <path
                        stroke="#231F20"
                        d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"></path>
                </svg>
            </span>
            <span
                class="mt-4 -mb-1 sm:text-2xl dark:text-gray-200 text-gray-700"
            >
                Inscrivez-vous en tant que profil
            </span>
        </div>
        <form
            class="dark:text-white w-full sm:w-10/12 dark:bg-slate-800
         shadow-gray-500 mx-auto rounded p-4 sm:p-8"
            on:submit|preventDefault="{signupFunc}"
        >
            <div class="mb-4 relative">
                <label
                    class="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
                    for="username"
                >
                    Nom d'utilisateur
                </label>
                <div class="absolute p-2 pointer-events-none">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-5 h-5 stroke-gray-500"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <path
                            d="M17.5 21.0001H6.5C5.11929 21.0001 4 19.8808 4 18.5001C4 14.4194 10 14.5001 12 14.5001C14 14.5001 20 14.4194 20 18.5001C20 19.8808 18.8807 21.0001 17.5 21.0001Z"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"></path>
                        <path
                            d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"></path>
                    </svg>
                </div>
                <input
                    class="shadow appearance-none border pl-10 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-rose-600 focus:border-rose-600"
                    id="username"
                    type="text"
                    bind:value="{username_}"
                    placeholder="Nom d'utilisateur"
                    autocomplete="username"
                    required
                />
            </div>
            <div class="mb-4">
                <label
                    class="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
                    for="email"
                >
                    Email
                </label>
                <div class="relative mb-6">
                    <div
                        class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                    >
                        <svg
                            class="w-5 h-5 stroke-gray-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                            ><path
                                d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                            ></path><path
                                d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
                            ></path></svg
                        >
                    </div>

                    <input
                        class="shadow appearance-none text-black border rounded w-full pl-10 py-2 pr-3 focus:ring-rose-600 focus:border-rose-600"
                        id="email"
                        type="email"
                        bind:value="{email}"
                        placeholder="email"
                    />
                </div>
            </div>
            <div class="mb-4 relative">
                <label
                    class="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
                    for="password"
                >
                    Mot de passe
                </label>
                <div class="absolute p-2 pointer-events-none">
                    <svg
                        aria-hidden="true"
                        class="w-5 h-5 stroke-gray-500"
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
                        placeholder="Mot de passe"
                        autocomplete="current-password"
                        required
                    />
                    <div class="absolute right-2 top-9 z-300 cursor-pointer">
                        <svg
                            aria-hidden="true"
                            class="w-5 h-5 stroke-gray-500 cursor-pointer z-30"
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
                        placeholder="Mot de passe"
                        autocomplete="current-password"
                        required
                    />
                    <div class="absolute right-2 top-9 z-300 cursor-pointer">
                        <svg
                            aria-hidden="true"
                            class="w-5 h-5 stroke-gray-500 cursor-pointer z-30"
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
                    for="password1"
                >
                    Confirmez le mot de passe
                </label>
                <div class="absolute p-2 pointer-events-none">
                    <svg
                        aria-hidden="true"
                        class="w-5 h-5 stroke-gray-500"
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
                    id="password1"
                    type="password"
                    autocomplete="new-password"
                    bind:value="{password1}"
                    placeholder="Confirmez le mot de passe"
                />
                <p
                    class="text-red-500 pt-1 text-sm italic hidden"
                    id="login_error"
                ></p>
            </div>
            <div class="flex items-center justify-between flex-col">
                <div
                    class=" text-gray-100 text-lg text-center border-rose-600
                 w-full bg-rose-600 dark:bg-rose-600 h-10
                rounded mb-2"
                >
                    <button
                        type="submit"
                        class="outline-none w-full h-full space-x-2"
                        >S'inscrire</button
                    >
                </div>
            </div>
        </form>
    </div>
    <div
        class="text-center flex flex-col mt-1 items-center text-gray-500 text-xs dark:text-white"
    >
        <div>
            &copy;{new Date().getUTCFullYear()} USTHB. All rights reserved.
        </div>
    </div>
</Wapper>

<script>
    import Text from './../ui/Text.svelte';
    import jwt_decode from 'jwt-decode';

    import axios from 'axios';
    import { setLogedIn } from './../../stores/accounts/auth';
    import { link } from 'svelte-spa-router';
    import { baseurl } from '../functions';

    let username = '',
        password = '';
    $: isShow = false;
    const loginFunc = async (e) => {
        await axios
            .post(`${baseurl}/accounts/token/`, {
                username,
                password,
            })
            .then(async (res) => {
                await localStorage.setItem(
                    'authTokens',
                    JSON.stringify(res.data)
                );
                const token = jwt_decode(res.data.access);
                // console.log(`${baseurl}/accounts/settings/${token['pid']}/`);
                await axios(
                    `${baseurl}/${
                        token['ftype'] === 'profile' ? 'accounts' : 'pages'
                    }/settings/${token['pid']}/`
                ).then(async (res) => {
                    localStorage.setItem('color-theme', res.data['theme']);
                });
                window.location.reload();
            })
            .catch((err) => {
                let error = document.querySelector('#login_error');
                error.classList.remove('hidden');
                username = '';
                password = '';
            });
        // await setLogedIn();
        // $location === "/login" ? push("/") : push($location);
    };

    export const params = {};
</script>

<div class="w-full max-w-xl mx-auto mt-32 ">
    <form
        on:submit|preventDefault="{loginFunc}"
        class="bg-white dark:text-white dark:bg-slate-800 border-2  shadow-gray-500 mx-3 shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
        <div class="mb-4 relative">
            <label
                class="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
                for="username"
            >
                Username
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
                        d="M16.563 15.9c-.159-.052-1.164-.505-.536-2.414h-.009c1.637-1.686 2.888-4.399 2.888-7.07c0-4.107-2.731-6.26-5.905-6.26c-3.176 0-5.892 2.152-5.892 6.26c0 2.682 1.244 5.406 2.891 7.088c.642 1.684-.506 2.309-.746 2.397c-3.324 1.202-7.224 3.393-7.224 5.556v.811c0 2.947 5.714 3.617 11.002 3.617c5.296 0 10.938-.67 10.938-3.617v-.811c0-2.228-3.919-4.402-7.407-5.557z"
                    ></path>
                </svg>
            </div>
            <input
                class="shadow appearance-none border pl-10 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-rose-600 focus:border-rose-600"
                id="username"
                type="text"
                bind:value="{username}"
                placeholder="Username"
                autocomplete="username"
                required
            />
        </div>
        <div class="mb-6 relative   ">
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

            <p class="text-red-500 text-xs italic hidden" id="login_error">
                Uncorrect username or password.
            </p>
        </div>
        <div class="flex items-center justify-between flex-col ">
            <button
                class="bg-rose-500 text-rose-500 text-lg dark:text-white active:text-white border-2 border-rose-600  w-full active:bg-rose-600  px-2 h-10 
                rounded-lg shadow outline-none focus:outline-none mr-1 mb-4 ease-linear transition-all duration-100"
                type="submit">Log In</button
            >

            <a href="/reset" use:link> <Text>Forgot Password?</Text></a>
        </div>
    </form>
    <p class="text-center text-gray-500 text-xs dark:text-white">
        &copy;{new Date().getUTCFullYear()} Acme Corp. All rights reserved.
    </p>
</div>

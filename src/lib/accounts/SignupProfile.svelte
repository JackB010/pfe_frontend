<script>
    import Text from '../ui/Text.svelte';
    import axios from 'axios';
    import { push, link } from 'svelte-spa-router';
    import { baseurl } from '../functions';

    let username = '',
        email = '',
        password = '',
        password1 = '';
    const show_error = (msg) => {
        let error = document.querySelector('#login_error');
        error.innerHTML = msg;
        error.classList.remove('hidden');
    };
    const signupFunc = async () => {
        if (password === password1) {
            if (password.length < 8) {
                show_error('Password most have at least 8 caracters.');
                return;
            }
            await axios
                .post(`${baseurl}/accounts/register/`, {
                    username,
                    email,
                    password,
                    password1,
                })
                .then((res) => {
                    push('/');
                })
                .catch((err) => {
                    show_error('Uncorrect username or password.');
                });
        } else {
            show_error('Passwords not matching.');
        }
    };

    export const params = {};
</script>

<div class="w-full max-w-xl mx-auto mt-28 ">
    <form
        class="bg-white dark:text-white dark:bg-slate-800 border-2  shadow-gray-500 mx-3 shadow-md rounded px-8 pt-6 pb-8 mb-4"
        on:submit|preventDefault="{signupFunc}"
    >
        <div class="mb-4">
            <label
                class="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
                for="username"
            >
                Username
            </label>
            <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-rose-600 focus:border-rose-600"
                id="username"
                type="text"
                autocomplete="username"
                bind:value="{username}"
                placeholder="Username"
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
                        class="w-5 h-5 text-gray-500 dark:text-gray-400"
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
                    class="shadow appearance-none border rounded w-full pl-10 py-2 pr-3 focus:ring-rose-600 focus:border-rose-600"
                    id="email"
                    type="email"
                    bind:value="{email}"
                    placeholder="email"
                />
            </div>
        </div>

        <div class="mb-4">
            <label
                class="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
                for="password"
            >
                Password
            </label>
            <input
                class="shadow appearance-none border  rounded w-full 
                py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-rose-600 focus:border-rose-600"
                id="password"
                type="password"
                autocomplete="new-password"
                bind:value="{password}"
                placeholder="password"
            />
            <div class="mb-6">
                <label
                    class="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
                    for="password1"
                >
                    Password Conform
                </label>
                <input
                    class="shadow appearance-none border  rounded w-full 
                py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-rose-600 focus:border-rose-600"
                    id="password1"
                    type="password"
                    autocomplete="new-password"
                    bind:value="{password1}"
                    placeholder="password conform"
                />
                <p
                    class="text-red-500 text-xs italic hidden"
                    id="login_error"
                ></p>
            </div>
            <div class="flex items-center justify-between flex-col ">
                <input
                    class="bg-rose-500 text-rose-500 text-lg dark:text-white active:text-white border-2 border-rose-600  w-full active:bg-rose-600  px-2 h-10 
                rounded-lg shadow outline-none focus:outline-none mr-1 mb-4 ease-linear transition-all duration-100"
                    type="submit"
                    value="Sign Up"
                />
                <a href="/reset" use:link> <Text>Forgot Password?</Text></a>
            </div>
        </div>
    </form>
    <p class="text-center text-gray-500 text-xs dark:text-white">
        &copy;{new Date().getUTCFullYear()} Acme Corp. All rights reserved.
    </p>
</div>

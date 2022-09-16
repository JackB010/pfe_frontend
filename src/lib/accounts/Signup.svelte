<script>
    import Text from './../ui/Text.svelte';
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
                    console.log(res.data);
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
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
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
            <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                bind:value="{email}"
                placeholder="email"
            />
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
                py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
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
                py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="password1"
                    type="password"
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

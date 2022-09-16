<script>
    import Text from './../ui/Text.svelte';
    import jwt_decode from 'jwt-decode';

    import axios from 'axios';
    import { setLogedIn } from './../../stores/accounts/auth';
    import { link } from 'svelte-spa-router';
    import { baseurl } from '../functions';

    let username, password;

    const loginFunc = async () => {
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
                    `${baseurl}/accounts/settings/${token['pid']}/`
                ).then(async (res) => {
                    // console.log(res);
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
                autocomplete="username"
                required
            />
        </div>
        <div class="mb-6">
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
                autocomplete="current-password"
                required
            />
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

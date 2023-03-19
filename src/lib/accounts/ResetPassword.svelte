<script>
    import axios from 'axios';
    import { push } from 'svelte-spa-router';
    import { baseurl } from '../functions';

    let username_email = '';
    const show_error = (msg) => {
        let error = document.querySelector('#login_error');
        error.innerHTML = msg;
        error.classList.remove('hidden');
    };
    const resetPassword = async () => {
        await axios
            .post(`${baseurl}/accounts/reset_password/`, { username_email })
            .then((res) => {
                push('/reset/code/');
            })
            .catch((err) => {});
    };

    export const params = {};
</script>

<div class="w-full max-w-xl mx-auto mt-32 ">
    <form
        class="bg-white dark:text-white dark:bg-slate-800 border-2 shadow-gray-500 mx-3 shadow-md rounded px-8 pt-6 pb-8 mb-4"
        on:submit|preventDefault="{resetPassword}"
    >
        <div class="mb-8">
            <label
                class="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
                for="username_email"
            >
                username_email or Email
            </label>
            <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username_email"
                type="text"
                bind:value="{username_email}"
                placeholder="Username or email"
                required
            />
            <p class="text-red-500 text-xs italic hidden" id="login_error"></p>
        </div>
        <div class="flex items-center justify-between flex-col ">
            <input
                class="bg-rose-500 text-rose-500 text-lg dark:text-white active:text-white border-2 border-rose-600  w-full active:bg-rose-600  px-2 h-10 
                rounded-lg shadow outline-none focus:outline-none mr-1 mb-2 ease-linear transition-all duration-100"
                type="submit"
                value="Send"
            />
        </div>
    </form>
    <p class="text-center text-gray-500 text-xs dark:text-white">
        &copy;{new Date().getUTCFullYear()} Acme Corp. All rights reserved.
    </p>
</div>

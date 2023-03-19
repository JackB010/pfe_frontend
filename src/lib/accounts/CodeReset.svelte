<script>
    import axios from 'axios';
    import { push } from 'svelte-spa-router';
    import { baseurl } from '../functions';

    let code;
    const show_error = (msg) => {
        let error = document.querySelector('#error');
        error.innerHTML = msg;
        error.classList.remove('hidden');
    };
    const loginFunc = async () => {
        await axios
            .post(`${baseurl}/accounts/reset_password/code/`, { code })
            .then((res) => {
                push(`/reset/change/${res.data.rid}`);
            })
            .catch((err) => {
                show_error('unmatched code !');
            });
    };
    export const params = {};
</script>

<div class="w-full max-w-xl mx-auto mt-32 ">
    <form
        class="bg-white dark:text-white dark:bg-slate-800 border-2 shadow-gray-500 mx-3 shadow-md rounded px-8 pt-6 pb-8 mb-4"
        on:submit|preventDefault="{loginFunc}"
    >
        <div class="mb-8">
            <label
                class="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
                for="code"
            >
                Code Reset
            </label>
            <input
                class="shadow appearance-none border placeholder:justify-center  placeholder:text-xl rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="code"
                max="9999999"
                min="1000000"
                type="number"
                bind:value="{code}"
                placeholder="#######"
                required
            />
            <p class="text-red-500 text-xs italic hidden" id="error"></p>
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

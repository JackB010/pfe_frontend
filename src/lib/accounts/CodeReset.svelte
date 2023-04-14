<script>
    import axios from 'axios';
    import { push } from 'svelte-spa-router';
    import { baseurl } from '../functions';
    import Wapper from '../Wapper.svelte';

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

<Wapper>
    <div class="border sm:mx-2 mx-1 rounded shadow  mt-36 mb-2 ">
        <form
            class="dark:text-white  w-full sm:w-10/12 dark:bg-slate-800 
         shadow-gray-500  mx-auto rounded p-4 sm:p-8 "
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
                <div
                    class=" text-gray-100 text-lg text-center border-rose-600 
                 w-full bg-rose-600 dark:bg-rose-600  h-10 
                rounded mb-6 "
                >
                    <button
                        type="submit"
                        class="outline-none  w-full h-full  space-x-2"
                        >Send</button
                    >
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

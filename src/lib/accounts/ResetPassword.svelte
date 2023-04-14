<script>
    import axios from 'axios';
    import { push } from 'svelte-spa-router';
    import { baseurl } from '../functions';
    import Wapper from '../Wapper.svelte';

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

<Wapper>
    <div class="border sm:mx-2 mx-1 rounded shadow  mt-36 mb-2 ">
        <form
            class="dark:text-white  w-full sm:w-10/12 dark:bg-slate-800 
         shadow-gray-500  mx-auto rounded p-4 sm:p-8 "
            on:submit|preventDefault="{resetPassword}"
        >
            <div class="mb-8">
                <label
                    class="block text-gray-500 text-sm font-bold mb-2 dark:text-white"
                    for="username_email"
                >
                    username or Email
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
                    class="shadow appearance-none border rounded w-full py-2 pl-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username_email"
                    type="text"
                    bind:value="{username_email}"
                    placeholder="Username or email"
                    required
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
                        >Reset</button
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

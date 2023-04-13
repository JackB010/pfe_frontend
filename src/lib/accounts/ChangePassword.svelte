<script>
    import axios from 'axios';
    import { onMount } from 'svelte';
    import { push } from 'svelte-spa-router';
    import { config } from '../../stores/accounts/auth';
    import { baseurl } from '../functions';
    import BackSection from '../ui/BackSection.svelte';
    import Wapper from '../Wapper.svelte';
    // let id;
    onMount(async () => {
        let id = params['id'];
    });

    let password = '',
        password_confirm = '';
    const show_error = (msg) => {
        let error = document.querySelector('#error');
        error.innerHTML = msg;
        error.classList.remove('hidden');
    };
    const loginFunc = async () => {
        let id = params['id'];

        if (password === password_confirm) {
            if (password.length < 8) {
                show_error('Password most have at least 8 caracters.');
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
                    config
                )
                .then((res) => {
                    push('/');
                })
                .catch((err) => {
                    show_error(err.data);
                    // show_error('Uncorrect password.');
                });
        } else {
            show_error('Passwords not matching.');
        }
    };
    export let params = {};
</script>

<BackSection name="{'Change Password'}" />
<Wapper>
    <div class="">
        <form
            class="bg-white dark:text-white mt-20 dark:bg-slate-800 ring-2   mx-3  rounded px-8 pt-6 pb-8 mb-4"
            on:submit|preventDefault="{loginFunc}"
        >
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
                        for="password_confirm"
                    >
                        Password Conform
                    </label>
                    <input
                        class="shadow appearance-none border  rounded w-full 
                py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password_confirm"
                        type="password"
                        bind:value="{password_confirm}"
                        placeholder="password conform"
                    />
                    <p
                        class="text-red-500 text-xs italic hidden"
                        id="error"
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
                            >Change Password
                        </button>
                    </div>
                </div>
            </div>
        </form>
        <p class="text-center text-gray-500 text-xs dark:text-white">
            &copy;{new Date().getUTCFullYear()} Acme Corp. All rights reserved.
        </p>
    </div>
</Wapper>

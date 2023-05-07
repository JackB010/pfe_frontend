<script>
    import Text from '../ui/Text.svelte';
    import axios from 'axios';
    import { push, link } from 'svelte-spa-router';
    import { baseurl, dynamicSort } from '../functions';
    import Wapper from '../Wapper.svelte';

    let username = '',
        email = '',
        about = '',
        categories = [],
        categorie = '',
        password = '',
        password1 = '',
        isShow = false;

    const handleKeydown = (event) => {
        if (event.code === 'Tab') {
            let incategories = false;
            for (let item of categories) {
                if (item === categorie) {
                    incategories = true;
                }
            }
            if (incategories) {
                show_error('categorie already exists');
            }
            if (!incategories && categorie.length > 0) {
                categories.push(categorie);
                categorie = '';
                categories.sort();
                categories = categories;
                event.target.focus();
            }
        }
    };
    const deleteCategorie = async (event) => {
        let list_categories = [],
            cat = event.target.id;
        for (let i = 0; i < categories.length; i++) {
            if (cat !== categories[i]) list_categories.push(categories[i]);
        }
        categories = list_categories;
    };
    const show_error = (msg) => {
        let error = document.querySelector('#error');
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
                .post(`${baseurl}/pages/register/`, {
                    username,
                    email,
                    about,
                    categories,
                    password,
                    password1,
                })
                .then((res) => {
                    push('/');
                })
                .catch((err) => {
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

    export const params = {};
</script>

<Wapper>
    <div class="border sm:mx-2 mx-1 rounded shadow mt-16 mb-2">
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
                        class="shadow appearance-none border text-black rounded w-full pl-10 py-2 pr-3 focus:ring-rose-600 focus:border-rose-600"
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
                        class="shadow appearance-none border rounded w-full pl-10 z-0
                py-2 px-3 text-gray-700 mb-3 leading-tight pr-6 focus:outline-none focus:ring-rose-600 focus:border-rose-600"
                        id="password"
                        type="password"
                        bind:value="{password}"
                        placeholder="password"
                        autocomplete="current-password"
                        required
                    />
                    <div class="absolute right-2 top-9 z-300 cursor-pointer">
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
                        class="shadow appearance-none border rounded w-full pl-10 z-0
                py-2 px-3 text-gray-700 mb-3 leading-tight pr-6 focus:outline-none focus:ring-rose-600 focus:border-rose-600"
                        id="password"
                        type="text"
                        bind:value="{password}"
                        placeholder="password"
                        autocomplete="current-password"
                        required
                    />
                    <div class="absolute right-2 top-9 z-300 cursor-pointer">
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
            </div>
            <div class="mb-4">
                <label
                    class="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
                    for="password1"
                >
                    Password Conform
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
                <input
                    class="shadow appearance-none border rounded w-full
                py-2 pl-10 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-rose-600 focus:border-rose-600"
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
            <div class="mb-4">
                <label
                    class="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
                    for="about"
                >
                    About
                </label>
                <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="about"
                    type="text"
                    bind:value="{about}"
                    placeholder="what is this page about?"
                />
            </div>
            <div class="mb-6">
                <label
                    class="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
                    for="categories"
                >
                    Categories
                </label>
                <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="categories"
                    type="text"
                    on:keydown="{handleKeydown}"
                    bind:value="{categorie}"
                    placeholder="categories"
                />
                <div class="w-full flex flex-wrap text-white -ml-2">
                    <div class=" space-x-2 space-y-2 flex flex-wrap">
                        <br />
                        {#each categories as item}
                            <div class="flex flex-wrap">
                                <span
                                    class="dark:bg-rose-600 w-fit shadow-md text-rose-600 dark:text-white text-sm sm:text-sm p-1.5 font-semibold flex-1 flex-row flex"
                                >
                                    <span class="pr-2">{item}</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-5 w-5 rotate-45 border rounded-full dark:bg-white cursor-pointer text-white bg-rose-600 dark:text-rose-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        on:click="{deleteCategorie}"
                                        on:keypress="{() => {}}"
                                        id="{item}"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                        ></path>
                                    </svg>
                                </span>
                            </div>
                        {/each}
                    </div>
                </div>
                <p
                    class="text-red-500 text-xs italic hidden mt-2"
                    id="error"
                ></p>
            </div>

            <div class="flex items-center justify-between flex-col">
                <div
                    class=" text-gray-100 text-lg text-center border-rose-600
                 w-full bg-rose-600 dark:bg-rose-600 h-10
                rounded mb-6"
                >
                    <button
                        type="submit"
                        class="outline-none w-full h-full space-x-2"
                        >Sign UP</button
                    >
                </div>
            </div>
        </form>
    </div>
</Wapper>
<div
    class="mx-auto text-center w-[96%] mb-2 text-gray-500 text-xs dark:text-white"
>
    &copy;{new Date().getUTCFullYear()} Acme Corp. All rights reserved.
</div>

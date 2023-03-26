<script>
    import Text from '../ui/Text.svelte';
    import axios from 'axios';
    import { push, link } from 'svelte-spa-router';
    import { baseurl, dynamicSort } from '../functions';

    let username = '',
        email = '',
        about = '',
        categories = [],
        categorie = '',
        password = '',
        password1 = '';

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
                autocomplete="new-password"
                bind:value="{password}"
                placeholder="password"
            />
        </div>
        <div class="mb-4">
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
                autocomplete="new-password"
                bind:value="{password1}"
                placeholder="password conform"
            />
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
            <div class="w-full flex  flex-wrap text-white -ml-2 ">
                <div class=" space-x-2 space-y-2 flex flex-wrap ">
                    <br />
                    {#each categories as item}
                        <div class="flex  flex-wrap">
                            <span
                                class="dark:bg-rose-600  w-fit shadow-md text-rose-600 dark:text-white text-sm sm:text-sm p-1.5 font-semibold  flex-1 flex-row flex"
                            >
                                <span class="pr-2 ">{item}</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-5 w-5 rotate-45 border rounded-full  dark:bg-white  cursor-pointer text-white bg-rose-600 dark:text-rose-600"
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
                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                </svg>
                            </span>
                        </div>
                    {/each}
                </div>
            </div>
            <p class="text-red-500 text-xs italic hidden mt-2" id="error"></p>
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
    </form>
    <p class="text-center text-gray-500 text-xs dark:text-white">
        &copy;{new Date().getUTCFullYear()} Acme Corp. All rights reserved.
    </p>
</div>

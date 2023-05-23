<script>
    import axios from 'axios';
    import { push } from 'svelte-spa-router';
    import { baseurl } from '../functions';
    import Wapper from '../Wapper.svelte';
    import { username } from '../../stores/accounts/auth';
    let username_ = '',
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
                show_error('La catégorie existe déjà');
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
        setTimeout(() => {
            error.classList.add('hidden');
        }, 2500);
    };
    const signupFunc = async () => {
        if (password === password1) {
            if (password.length < 8) {
                show_error(
                    'La plupart des mots de passe comportent au moins 8 caractères.'
                );
                return;
            }

            await axios
                .post(`${baseurl}/pages/register/`, {
                    username: username_,
                    email,
                    about,
                    categories,
                    password,
                    password1,
                })
                .then((res) => {
                    username.set(username_);
                    push('/conform');
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
            show_error('Les mots de passe ne correspondent pas.');
        }
    };
    document.title = "S'inscrire en tant que page";
    export const params = {};
</script>

<Wapper>
    <div class="border sm:mx-2 mx-1 rounded shadow mt-16 mb-2">
        <div class="flex items-center justify-between flex-col">
            <span
                class="w-[5rem] h-[5rem] border-2 bg-rose-600/25 dark:bg-white/50 mt-4 rounded-full text-center"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-12 h-12 mt-3 mx-auto"
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <path
                        stroke="#231F20"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d=" M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    ></path>
                </svg>
            </span>
            <span
                class="mt-4 -mb- sm:text-2xl dark:text-gray-200 text-gray-700"
            >
                Inscrivez-vous en tant que page
            </span>
        </div>
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
                    Nom d'utilisateur
                </label>
                <div class="absolute p-2 pointer-events-none">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-5 h-5 stroke-gray-500"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <path
                            d="M17.5 21.0001H6.5C5.11929 21.0001 4 19.8808 4 18.5001C4 14.4194 10 14.5001 12 14.5001C14 14.5001 20 14.4194 20 18.5001C20 19.8808 18.8807 21.0001 17.5 21.0001Z"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"></path>
                        <path
                            d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"></path>
                    </svg>
                </div>
                <input
                    class="shadow appearance-none border pl-10 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-rose-600 focus:border-rose-600"
                    id="username"
                    type="text"
                    bind:value="{username_}"
                    placeholder="Nom d'utilisateur"
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
                            class="w-5 h-5 stroke-gray-500"
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
                    Mot de passe
                </label>
                <div class="absolute p-2 pointer-events-none">
                    <svg
                        aria-hidden="true"
                        class="w-5 h-5 stroke-gray-500"
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
                py-2 px-3 text-gray-700 mb-2 leading-tight pr-6 focus:outline-none focus:ring-rose-600 focus:border-rose-600"
                        id="password"
                        type="password"
                        bind:value="{password}"
                        placeholder="Mot de passe"
                        autocomplete="current-password"
                        required
                    />
                    <div class="absolute right-2 top-9 z-300 cursor-pointer">
                        <svg
                            aria-hidden="true"
                            class="w-5 h-5 stroke-gray-500 cursor-pointer z-30"
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
                py-2 px-3 text-gray-700 mb-2 leading-tight pr-6 focus:outline-none focus:ring-rose-600 focus:border-rose-600"
                        id="password"
                        type="text"
                        bind:value="{password}"
                        placeholder="Mot de passe"
                        autocomplete="current-password"
                        required
                    />
                    <div class="absolute right-2 top-9 z-300 cursor-pointer">
                        <svg
                            aria-hidden="true"
                            class="w-5 h-5 stroke-gray-500 cursor-pointer z-30"
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
                    Confirmez le mot de passe
                </label>
                <div class="absolute p-2 pointer-events-none">
                    <svg
                        aria-hidden="true"
                        class="w-5 h-5 stroke-gray-500"
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
                py-2 pl-10 text-gray-700 mb-2 leading-tight focus:outline-none focus:ring-rose-600 focus:border-rose-600"
                    id="password1"
                    type="password"
                    autocomplete="new-password"
                    bind:value="{password1}"
                    placeholder="Confirmez le mot de passe"
                />
            </div>
            <div class="mb-4 relative">
                <label
                    class="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
                    for="about"
                >
                    À propos de la page
                </label>
                <input
                    class="shadow appearance-none border rounded w-full pl-10 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="about"
                    type="text"
                    bind:value="{about}"
                    placeholder="De quoi parle votre page ?"
                />
                <div class="absolute left-2 top-9 z-300">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        class="w-5 h-5 fill-gray-500"
                        viewBox="0 0 512 512"
                        version="1.1"
                    >
                        <title>about</title>
                        <g
                            id="Page-1"
                            stroke="none"
                            stroke-width="1.5"
                            fill-rule="evenodd"
                        >
                            <g
                                id="about-white"
                                transform="translate(42.666667, 42.666667)"
                            >
                                <path
                                    d="M213.333333,3.55271368e-14 C95.51296,3.55271368e-14 3.55271368e-14,95.51168 3.55271368e-14,213.333333 C3.55271368e-14,331.153707 95.51296,426.666667 213.333333,426.666667 C331.154987,426.666667 426.666667,331.153707 426.666667,213.333333 C426.666667,95.51168 331.154987,3.55271368e-14 213.333333,3.55271368e-14 Z M213.333333,384 C119.227947,384 42.6666667,307.43872 42.6666667,213.333333 C42.6666667,119.227947 119.227947,42.6666667 213.333333,42.6666667 C307.44,42.6666667 384,119.227947 384,213.333333 C384,307.43872 307.44,384 213.333333,384 Z M240.04672,128 C240.04672,143.46752 228.785067,154.666667 213.55008,154.666667 C197.698773,154.666667 186.713387,143.46752 186.713387,127.704107 C186.713387,112.5536 197.99616,101.333333 213.55008,101.333333 C228.785067,101.333333 240.04672,112.5536 240.04672,128 Z M192.04672,192 L234.713387,192 L234.713387,320 L192.04672,320 L192.04672,192 Z"
                                    id="Shape"
                                >
                                </path>
                            </g>
                        </g>
                    </svg>
                </div>
            </div>
            <div class="mb-6 relative">
                <label
                    class="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
                    for="categories"
                >
                    Catégories de votre page
                </label>
                <input
                    class="shadow appearance-none pl-10 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="categories"
                    type="text"
                    on:keydown="{handleKeydown}"
                    bind:value="{categorie}"
                    placeholder="Catégories de votre page"
                />
                <div class="absolute left-2 top-9 z-300">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-5 h-5 stroke-gray-500"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <path
                            d="M5 10H7C9 10 10 9 10 7V5C10 3 9 2 7 2H5C3 2 2 3 2 5V7C2 9 3 10 5 10Z"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"></path>
                        <path
                            d="M17 10H19C21 10 22 9 22 7V5C22 3 21 2 19 2H17C15 2 14 3 14 5V7C14 9 15 10 17 10Z"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"></path>
                        <path
                            d="M17 22H19C21 22 22 21 22 19V17C22 15 21 14 19 14H17C15 14 14 15 14 17V19C14 21 15 22 17 22Z"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"></path>
                        <path
                            d="M5 22H7C9 22 10 21 10 19V17C10 15 9 14 7 14H5C3 14 2 15 2 17V19C2 21 3 22 5 22Z"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"></path>
                    </svg>
                </div>
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
                    class="text-red-500 pt-1 text-sm italic hidden mt-2"
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
                        >S'inscrire</button
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

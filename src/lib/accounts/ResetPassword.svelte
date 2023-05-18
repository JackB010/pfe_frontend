<script>
    import axios from 'axios';
    import { push } from 'svelte-spa-router';
    import { baseurl } from '../functions';
    import Wapper from '../Wapper.svelte';
    import { msg, username } from '../../stores/accounts/auth';

    let username_email = '';

    const resetPassword = async () => {
        await axios
            .post(`${baseurl}/accounts/reset_password/`, { username_email })
            .then((res) => {
                username.set(username_email);
                push('/reset/code/');
            })
            .catch((err) => {});
    };
    document.title = 'Mot de passe oublié';
    export const params = {};
</script>

<Wapper>
    <div class="border sm:mx-2 mx-1 rounded shadow mt-36 mb-2">
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
                        d="M17.5 21.0001H6.5C5.11929 21.0001 4 19.8808 4 18.5001C4 14.4194 10 14.5001 12 14.5001C14 14.5001 20 14.4194 20 18.5001C20 19.8808 18.8807 21.0001 17.5 21.0001Z"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"></path>
                    <path
                        stroke="#231F20"
                        d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"></path>
                </svg>
            </span>
            <span
                class="mt-4 -mb-2 text-xl sm:text-2xl dark:text-gray-200 text-gray-700"
            >
                Difficulté à se connecter
            </span>
            <span
                class="mt-4 -mb-2 dark:text-gray-300 text-sm sm:w-6/12 text-center text-gray-700"
                >entrez votre nom d'utilisateur ou votre e-mail pour
                réinitialiser le mot de passe.
            </span>
        </div>
        <form
            class="dark:text-white w-full sm:w-10/12 dark:bg-slate-800
         shadow-gray-500 mx-auto rounded p-4 sm:p-8"
            on:submit|preventDefault="{resetPassword}"
        >
            <div class="mb-8">
                <div class="absolute p-2 pointer-events-none">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-5 h-5 stroke-gray-500 dark:stroke-gray-400"
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
                    class="shadow appearance-none border rounded w-full py-2 pl-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username_email"
                    type="text"
                    bind:value="{username_email}"
                    placeholder="nom d'utilisateur ou votre e-mail"
                    required
                />
                <p
                    class="text-red-500 text-xs italic hidden"
                    id="login_error"
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
                        >Envoyer</button
                    >
                </div>
            </div>
        </form>
    </div>
    <div
        class="text-center flex flex-col items-center text-gray-500 text-xs dark:text-white"
    >
        <div>
            &copy;{new Date().getUTCFullYear()} USTHB. All rights reserved.
        </div>
    </div>
</Wapper>

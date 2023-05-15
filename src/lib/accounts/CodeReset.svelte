<script>
    import axios from 'axios';
    import { push, location } from 'svelte-spa-router';
    import { baseurl } from '../functions';
    import Wapper from '../Wapper.svelte';
    import { username } from '../../stores/accounts/auth';
    import { onMount } from 'svelte';
    onMount(() => {
        if ($username === '' && $location.includes('/reset/code'))
            push('/reset');
    });
    let code;
    const show_error = (msg) => {
        let error = document.querySelector('#error');
        error.innerHTML = msg;
        error.classList.remove('hidden');
    };
    const reset_password = async () => {
        await axios
            .post(`${baseurl}/accounts/reset_password/code/`, { code })
            .then((res) => {
                push(`/reset/change/${res.data.rid}`);
            })
            .catch((err) => {
                show_error('unmatched code !');
            });
    };
    const resendCode = () => {
        axios(`${baseurl}/accounts/reset_password/resend/${$username}/`);
    };

    $: {
        if (`${code}`.length > 7) {
            code = `${code}`;
            code = code.slice(0, code.length - 1);
        }
    }
    export const params = {};
</script>

<Wapper>
    <div class="border sm:mx-2 mx-1 rounded shadow mt-36 mb-2">
        <div class="flex text-center items-center justify-between flex-col">
            <span
                class="w-[5rem] h-[5rem] border-2 bg-rose-600/25 dark:bg-white/50 mt-4 rounded-full text-center"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    version="1.0"
                    id="Layer_1"
                    class="w-12 h-12 mt-3 mx-auto"
                    viewBox="0 0 64 64"
                    enable-background="new 0 0 64 64"
                    xml:space="preserve"
                >
                    <g>
                        <path
                            fill="#231F20"
                            d="M52,24h-6V14c0-7.732-6.268-14-14-14S18,6.268,18,14v10h-6c-2.211,0-4,1.789-4,4v32c0,2.211,1.789,4,4,4h40   c2.211,0,4-1.789,4-4V28C56,25.789,54.211,24,52,24z M20,14c0-6.627,5.373-12,12-12s12,5.373,12,12v10h-4V14c0-4.418-3.582-8-8-8   s-8,3.582-8,8v10h-4V14z M26,14c0-3.313,2.687-6,6-6s6,2.687,6,6v10H26V14z M54,60c0,1.104-0.896,2-2,2H12c-1.104,0-2-0.896-2-2v-4   h44V60z M54,54H10V34h44V54z M54,32H10v-4c0-1.104,0.896-2,2-2h40c1.104,0,2,0.896,2,2V32z"
                        ></path>
                        <path
                            fill="#231F20"
                            d="M29,44.979V49c0,1.657,1.343,3,3,3s3-1.343,3-3v-4.021c1.209-0.912,2-2.348,2-3.979c0-2.762-2.238-5-5-5   s-5,2.238-5,5C27,42.631,27.791,44.066,29,44.979z M32,38c1.657,0,3,1.343,3,3c0,1.305-0.837,2.403-2,2.816V49c0,0.553-0.447,1-1,1   s-1-0.447-1-1v-5.184c-1.163-0.413-2-1.512-2-2.816C29,39.343,30.343,38,32,38z"
                        ></path>
                    </g>
                </svg>
            </span>
            <span
                class="mt-4 w-full -mb-2 text-xl sm:text-2xl dark:text-gray-200 text-gray-700"
            >
                Entrez le code de confirmation
            </span>
            <span class="mt-4 -mb-2 dark:text-gray-300 text-sm text-gray-700"
                >entrez 7 chiffres que nous vous avons envoyés.<span
                    on:click="{() => {
                        resendCode();
                    }}"
                    on:keypress="{() => {}}"
                    class="ml-2 cursor-pointer mt-0.5 font-semibold text-rose-600"
                    >Renvoyer le code.</span
                >
            </span>
        </div>
        <form
            class="dark:text-white w-full sm:w-10/12 dark:bg-slate-800
         shadow-gray-500 mx-auto rounded p-4 sm:p-8"
            on:submit|preventDefault="{reset_password}"
        >
            <div class="mb-8">
                <input
                    class="shadow appearance-none border placeholder:justify-center placeholder:text-xl rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center"
                    id="code"
                    max="9999999"
                    min="1000000"
                    maxlength="7"
                    type="number"
                    bind:value="{code}"
                    placeholder="#######"
                    required
                />
                <p class="text-red-500 text-xs italic hidden" id="error"></p>
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
        class="text-center flex flex-col mt-1 items-center text-gray-500 text-xs dark:text-white"
    >
        <div>
            &copy;{new Date().getUTCFullYear()} USTHB. All rights reserved.
        </div>
    </div>
</Wapper>

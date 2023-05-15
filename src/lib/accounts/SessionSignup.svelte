<script>
    import { push } from 'svelte-spa-router';
    import Wapper from '../Wapper.svelte';

    // import Button from './../ui/Button.svelte';
</script>

<!-- <div
    class="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto"
>
    <div class="animate-pulse flex space-x-4">
        <div class="rounded-full bg-slate-700 h-10 w-10"></div>
        <div class="flex-1 space-y-6 py-1">
            <div class="h-2 bg-slate-700 rounded"></div>
            <div class="space-y-3">
                <div class="grid grid-cols-3 gap-4">
                    <div class="h-2 bg-slate-700 rounded col-span-2"></div>
                    <div class="h-2 bg-slate-700 rounded col-span-1"></div>
                </div>
                <div class="h-2 bg-slate-700 rounded"></div>
            </div>
        </div>
    </div>
</div> -->

<Wapper>
    <div class="border sm:mx-2 mx-1 rounded shadow mt-28">
        <div class="flex flex-col md:justify-end mx-auto">
            <div
                class=" flex flex-col items-center bg-white dark:text-white dark:bg-slate-800 mx-3
                h-80"
            >
                <div
                    class="flex flex-col sm:flex-row text-center sm:space-x-6 sm:space-y-0 space-y-12 justify-around p-4 m-auto h-full w-full items-center mx-auto"
                >
                    <div
                        class="sm:w-auto w-full h-[75%] flex-1 rounded my-auto mx-auto flex flex-col items-center pt-2 cursor-pointer hover:scale-105 border-2 border-rose-600 dark:border-white"
                        on:click="{() => {
                            push('/signup/page/');
                        }}"
                        on:keypress="{() => {}}"
                    >
                        <span class="text-center justify-center"
                            ><svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-16 w-16 -translate-y-9 p-1 bg-white border-none ring-2 text-rose-600 ring-rose-600 text-center rounded-full shadow-lg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="1.5"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d=" M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                ></path>
                            </svg></span
                        >
                        <span
                            class="dark:text-white font-medium shadow sm:text-xl text-rose-600 w-10/12"
                            >Inscrivez-vous en tant que page</span
                        >
                    </div>
                    <div
                        class=" sm:w-auto w-full h-[75%] flex-1 rounded my-auto dark:border-white flex flex-col items-center pt-2 cursor-pointer hover:scale-105 border-2 border-rose-600"
                        on:click="{() => {
                            push('/signup/profile/');
                        }}"
                        on:keypress="{() => {}}"
                    >
                        <span
                            ><svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-16 w-16 ring-2 -translate-y-9 bg-white text-rose-600 ring-rose-600 p-1 rounded-full shadow-lg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="2"
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
                            </svg></span
                        >
                        <span
                            class="dark:text-white font-medium shadow sm:text-xl text-rose-600 w-10/12"
                            >Inscrivez-vous en tant que profil</span
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div
        class="text-center flex flex-col mt-1 items-center text-gray-500 text-xs dark:text-white"
    >
        <div>
            &copy;{new Date().getUTCFullYear()} USTHB. All rights reserved.
        </div>
    </div>
</Wapper>

<script>
    import Text from './../ui/Text.svelte';
    import jwt_decode from 'jwt-decode';
    import { theme } from '../functions';
    import axios from 'axios';
    import { setLogedIn } from './../../stores/accounts/auth';
    import { link } from 'svelte-spa-router';
    import { baseurl } from '../functions';
    import Wapper from '../Wapper.svelte';

    let username = '',
        password = '';
    $: isShow = false;
    const loginFunc = async (e) => {
        await axios
            .post(`${baseurl}/accounts/token/`, {
                username,
                password,
            })
            .then(async (res) => {
                await localStorage.setItem(
                    'authTokens',
                    JSON.stringify(res.data)
                );
                const token = jwt_decode(res.data.access);
                // console.log(`${baseurl}/accounts/settings/${token['pid']}/`);
                await axios(
                    `${baseurl}/${
                        token['ftype'] === 'profile' ? 'accounts' : 'pages'
                    }/settings/${token['pid']}/`
                ).then(async (res) => {
                    localStorage.setItem('color-theme', res.data['theme']);
                });
                window.location.reload();
            })
            .catch((err) => {
                let error = document.querySelector('#login_error');
                error.classList.remove('hidden');
                console.log(err.response['data']);

                username = '';
                password = '';
            });
        // await setLogedIn();
        // $location === "/login" ? push("/") : push($location);
    };
    // const show_error = (msg) => {
    //     let error = document.querySelector('#login_error');
    //     error.innerHTML = msg;
    //     error.classList.remove('hidden');
    // };
    export const params = {};
</script>

<Wapper>
    <div class="border sm:mx-2 mx-1 rounded shadow mt-28">
        <div class="flex flex-col items-center">
            <span>
                <svg
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-32 h-32 -mb-12"
                    viewBox="0 0 52 52"
                    version="1.1"
                >
                    <g id="brand">
                        <g id="Group">
                            <path
                                d="M0 0C17.3333 0 34.6666 0 52 0C52 17.3333 52 34.6666 52 52C34.6666 52 17.3333 52 0 52C0 34.6666 0 17.3333 0 0L0 0Z"
                                id="Shape"
                                fill="#{$theme === 'dark'
                                    ? '24293B'
                                    : 'FFFFFF'}"
                                fill-rule="evenodd"
                                stroke="none"></path>
                        </g>
                        <g id="Group" transform="translate(15.66169 4.939995)">
                            <path
                                d="M10.3383 0C13.2836 2.72857 16.1002 5.58857 18.7883 8.58C21.9226 14.0566 21.0992 18.8666 16.3183 23.01C10.0737 26.3692 5.0037 25.1126 1.1083 19.24C-0.719733 15.159 -0.286391 11.3457 2.4083 7.8C5.02437 5.14036 7.66768 2.54036 10.3383 0L10.3383 0Z"
                                id="Shape"
                                fill="#DB1D47"
                                fill-rule="evenodd"
                                stroke="none"></path>
                        </g>
                        <g id="Group" transform="translate(18.200005 8.580009)">
                            <path
                                d="M7.54 0C10.0381 2.02103 12.3347 4.27437 14.43 6.76C16.6559 11.9546 15.2259 15.8113 10.14 18.33C4.37538 19.24 0.995384 16.8134 0 11.05C0.0452925 9.52541 0.435292 8.09541 1.17 6.76C3.25138 4.46212 5.37472 2.20878 7.54 0L7.54 0Z"
                                id="Shape"
                                fill="#{$theme === 'dark'
                                    ? '24293B'
                                    : 'FFFFFF'}"
                                fill-rule="evenodd"
                                stroke="none"></path>
                        </g>
                        <g id="Group" transform="translate(20.9348 12.220001)">
                            <path
                                d="M4.80519 0C6.79289 1.42457 8.48289 3.15788 9.87519 5.2C10.8135 9.30301 9.21011 11.7297 5.06519 12.48C0.930459 11.7547 -0.672883 9.32807 0.255188 5.2C1.63238 3.34604 3.14904 1.6127 4.80519 0L4.80519 0Z"
                                id="Shape"
                                fill="#DB1D47"
                                fill-rule="evenodd"
                                stroke="none"></path>
                        </g>
                        <g id="Group" transform="translate(23.47377 15.860001)">
                            <path
                                d="M2.26623 0C3.37591 0.63245 4.28591 1.49911 4.99623 2.6C5.19513 5.17457 4.02513 6.34457 1.48623 6.11C0.0383696 5.06095 -0.35163 3.71761 0.316232 2.08C1.01953 1.42059 1.66953 0.727246 2.26623 0L2.26623 0Z"
                                id="Shape"
                                fill="#{$theme === 'dark'
                                    ? '24293B'
                                    : 'FFFFFF'}"
                                fill-rule="evenodd"
                                stroke="none"></path>
                        </g>
                        <g id="S" transform="translate(19.514725 31.889664)">
                            <path
                                d="M1.02527 0.0903311C2.74866 -0.265088 3.61531 0.428332 3.62527 2.17033C3.19193 2.17033 2.75861 2.17033 2.32527 2.17033C2.32527 1.91033 2.32527 1.65033 2.32527 1.39033C2.06527 1.39033 1.80527 1.39033 1.54527 1.39033C1.50453 1.74731 1.54787 2.09415 1.67527 2.43033C2.72731 3.21839 3.46397 4.21497 3.88527 5.42033C3.49421 6.93353 2.54089 7.45353 1.02527 6.98033C-0.423528 5.95853 -0.336868 5.22169 1.28527 4.77033C1.2549 5.28617 1.42824 5.71933 1.80527 6.07033C2.2688 5.84985 2.3988 5.50327 2.19527 5.03033C1.84861 4.33691 1.32861 3.81691 0.635271 3.47033C-0.310609 2.21349 -0.180609 1.08691 1.02527 0.0903311L1.02527 0.0903311Z"
                                id="Shape"
                                fill="#{$theme === 'dark'
                                    ? 'FFFFFF'
                                    : '24293B'}"
                                fill-rule="evenodd"
                                stroke="none"></path>
                        </g>
                        <g id="T" transform="translate(23.660004 31.94957)">
                            <path
                                d="M0 0.290431C1.1622 0.0340711 2.37554 -0.0525091 3.64 0.0304311C3.64 0.463852 3.64 0.897012 3.64 1.33043C3.29342 1.33043 2.94658 1.33043 2.6 1.33043C2.78434 1.09539 3.04434 1.00881 3.38 1.07043C3.38 0.810432 3.38 0.550432 3.38 0.290431C2.25334 0.290431 1.12666 0.290431 0 0.290431L0 0.290431Z"
                                id="Shape"
                                fill="#{$theme === 'dark'
                                    ? 'FFFFFF'
                                    : '24293B'}"
                                fill-rule="evenodd"
                                stroke="none"></path>
                        </g>
                        <g id="U" transform="translate(14.528664 31.953003)">
                            <path
                                d="M1.59134 0.286985C1.158 0.286985 0.724684 0.286985 0.291343 0.286985C0.291343 2.19356 0.291343 4.10041 0.291343 6.00698C0.0334224 4.06167 -0.0532618 2.06851 0.0313426 0.0269855C0.612547 -0.049714 1.13255 0.0371258 1.59134 0.286985L1.59134 0.286985Z"
                                id="Shape"
                                fill="#{$theme === 'dark'
                                    ? 'FFFFFF'
                                    : '24293B'}"
                                fill-rule="evenodd"
                                stroke="none"></path>
                        </g>
                        <g id="U" transform="translate(14.82 32.23999)">
                            <path
                                d="M1.3 0C1.25676 1.82208 1.3001 3.64208 1.43 5.46C1.98871 5.8084 2.29203 5.63498 2.34 4.94C2.59745 3.3423 2.68411 1.69572 2.6 0C3.03334 0 3.46666 0 3.9 0C4.01315 2.10886 3.88315 4.18886 3.51 6.24C2.66347 6.74154 1.75347 6.87154 0.78 6.63C0.375518 6.4428 0.115518 6.13938 0 5.72C0 3.81342 0 1.90658 0 0C0.433342 0 0.866658 0 1.3 0L1.3 0Z"
                                id="Shape"
                                fill="#{$theme === 'dark'
                                    ? 'FFFFFF'
                                    : '24293B'}"
                                fill-rule="evenodd"
                                stroke="none"></path>
                        </g>
                        <g id="U" transform="translate(17.160004 31.953003)">
                            <path
                                d="M1.56 0.286986C1.12666 0.286986 0.693342 0.286986 0.26 0.286986C0.34411 1.98271 0.257451 3.62928 0 5.22699C0 3.49356 0 1.76041 0 0.0269855C0.581203 -0.0497141 1.1012 0.0371259 1.56 0.286986L1.56 0.286986Z"
                                id="Shape"
                                fill="#{$theme === 'dark'
                                    ? 'FFFFFF'
                                    : '24293B'}"
                                fill-rule="evenodd"
                                stroke="none"></path>
                        </g>
                        <g id="T" transform="translate(23.660004 32.23999)">
                            <path
                                d="M0 0C1.12666 0 2.25334 0 3.38 0C3.38 0.26 3.38 0.52 3.38 0.78C3.04434 0.71838 2.78434 0.80496 2.6 1.04C2.34229 2.81138 2.25563 4.63138 2.34 6.5C1.90666 6.5 1.47334 6.5 1.04 6.5C1.04 4.68 1.04 2.86 1.04 1.04C0.693343 1.04 0.346658 1.04 0 1.04C0 0.69342 0 0.34658 0 0L0 0Z"
                                id="Shape"
                                fill="#{$theme === 'dark'
                                    ? 'FFFFFF'
                                    : '24293B'}"
                                fill-rule="evenodd"
                                stroke="none"></path>
                        </g>
                        <g id="H" transform="translate(27.82 31.979996)">
                            <path
                                d="M2.6 0.26C3.03342 0.26 3.46658 0.26 3.9 0.26C3.9 2.42658 3.9 4.59342 3.9 6.76C3.46658 6.76 3.03342 6.76 2.6 6.76C2.6 5.80658 2.6 4.85342 2.6 3.9C2.25342 3.9 1.90658 3.9 1.56 3.9C1.56 4.94 1.56 5.98 1.56 7.02C1.04 7.02 0.52 7.02 0 7.02C0 4.68 0 2.34 0 0C0.52 0 1.04 0 1.56 0C1.56 0.95342 1.56 1.90658 1.56 2.86C1.90658 2.86 2.25342 2.86 2.6 2.86C2.6 1.99342 2.6 1.12658 2.6 0.26L2.6 0.26Z"
                                id="Shape"
                                fill="#{$theme === 'dark'
                                    ? 'FFFFFF'
                                    : '24293B'}"
                                fill-rule="evenodd"
                                stroke="none"></path>
                        </g>
                        <g id="H" transform="translate(30.419998 31.953003)">
                            <path
                                d="M0 0.286985C0.4589 0.0371259 0.978901 -0.049714 1.56 0.0269855C1.56 2.36699 1.56 4.70699 1.56 7.04699C0.978901 7.12368 0.4589 7.03684 0 6.78699C0.43342 6.78699 0.866581 6.78699 1.3 6.78699C1.3 4.62041 1.3 2.45356 1.3 0.286985C0.866581 0.286985 0.43342 0.286985 0 0.286985L0 0.286985Z"
                                id="Shape"
                                fill="#{$theme === 'dark'
                                    ? 'FFFFFF'
                                    : '24293B'}"
                                fill-rule="evenodd"
                                stroke="none"></path>
                        </g>
                        <g id="B" transform="translate(33.020004 31.964005)">
                            <path
                                d="M0 0.0159941C0.871001 -0.0269061 1.73758 0.0165138 2.6 0.145994C3.77988 0.578635 4.16988 1.40205 3.77 2.61599C3.64 2.91942 3.42342 3.13599 3.12 3.26599C4.50112 4.45472 4.50112 5.66813 3.12 6.90599C2.08364 7.03573 1.04364 7.07915 0 7.03599C0 4.69599 0 2.35599 0 0.0159941L0 0.0159941Z"
                                id="Shape"
                                fill="#{$theme === 'dark'
                                    ? 'FFFFFF'
                                    : '24293B'}"
                                fill-rule="evenodd"
                                stroke="none"></path>
                        </g>
                        <g id="T" transform="translate(24.700005 33.28)">
                            <path
                                d="M1.56 0C1.56 1.90658 1.56 3.81342 1.56 5.72C0.978796 5.7967 0.458797 5.70986 0 5.46C0.433342 5.46 0.866657 5.46 1.3 5.46C1.21563 3.59138 1.30229 1.77138 1.56 0L1.56 0Z"
                                id="Shape"
                                fill="#{$theme === 'dark'
                                    ? 'FFFFFF'
                                    : '24293B'}"
                                fill-rule="evenodd"
                                stroke="none"></path>
                        </g>
                        <g id="B" transform="translate(34.58 33.28)">
                            <path
                                d="M0 0C1.001 0.0522592 1.261 0.52884 0.779999 1.43C0.53352 1.55558 0.27352 1.59874 0 1.56C0 1.04 0 0.520001 0 0L0 0Z"
                                id="Shape"
                                fill="#{$theme !== 'dark'
                                    ? 'FFFFFF'
                                    : '24293B'}"
                                fill-rule="evenodd"
                                stroke="none"></path>
                        </g>
                        <g id="B" transform="translate(34.58 35.866173)">
                            <path
                                d="M0 0.01383C0.776881 -0.0758704 1.12346 0.270712 1.04 1.05383C1.12346 1.83695 0.776881 2.18353 0 2.09383C0 1.40041 0 0.707253 0 0.01383L0 0.01383Z"
                                id="Shape"
                                fill="#{$theme !== 'dark'
                                    ? 'FFFFFF'
                                    : '24293B'}"
                                fill-rule="evenodd"
                                stroke="none"></path>
                        </g>
                    </g>
                </svg>
            </span>
        </div>
        <form
            on:submit|preventDefault="{loginFunc}"
            class="dark:text-white w-full sm:w-10/12 dark:bg-slate-800
         shadow-gray-500 mx-auto rounded p-4 sm:p-8"
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
            <div class="mb-6 relative">
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

                <p class="text-red-500 text-xs italic hidden" id="login_error">
                    Uncorrect username or password.
                </p>
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
                        >Log In</button
                    >
                </div>
                <a href="/reset" use:link> <Text>Forgot Password?</Text></a>
            </div>
        </form>
    </div>
</Wapper>

<div
    class="mx-auto text-center w-[96%] absolute bottom-2 text-gray-500 text-xs dark:text-white"
>
    &copy;{new Date().getUTCFullYear()} Acme Corp. All rights reserved.
</div>

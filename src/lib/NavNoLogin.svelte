<script>
    import { themeToggleBtn, theme, baseurl } from './functions';
    import { link, push } from 'svelte-spa-router';
    import { location } from 'svelte-spa-router';
    import Wapper from './Wapper.svelte';
    import axios from 'axios';
    import User from './accounts/User.svelte';
    import { fly } from 'svelte/transition';
    let searchedUser = [],
        done = false,
        search = '',
        next = '',
        active = false;
    const SearchUser = (e) => {
        axios(`${baseurl}/pages/search/?search=${search}`).then((res) => {
            searchedUser = res['data']['results'];
            next = res.data['next'];
            done = true;
        });
    };
    $: {
        if (search === '') done = false;
    }
    let y = 0,
        yy = 0;

    $: {
        if (yy - 50 === y - 50) {
            if (next) {
                axios(next).then(async (res) => {
                    searchedUser = [...searchedUser, ...res.data['results']];
                    next = res.data['next'];
                });
                yy = yy - 40;
            }
        }
    }

    // document.onclick((e)=>{
    //     done =false;
    // })
    // window.addEventListener('click', () => {
    //     done = false;
    // });
</script>

<Wapper>
    <div
        class=" flex items-center justify-between w-full bg-white dark:text-white dark:bg-slate-800 border rounded shadow
          py-3 pb-2"
    >
        <div
            class="sm:ml-3 flex items-center flex-[0.1] cursor-pointer"
            on:click="{() => {
                push('/');
            }}"
            on:keypress="{() => {}}"
        >
            <svg
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xmlns="http://www.w3.org/2000/svg"
                width="56px"
                height="56px"
                class="sm:-my-4 -my-2"
                viewBox="0 0 52 52"
                version="1.1"
            >
                <g id="brand">
                    <g id="Group">
                        <path
                            d="M0 0C17.3333 0 34.6666 0 52 0C52 17.3333 52 34.6666 52 52C34.6666 52 17.3333 52 0 52C0 34.6666 0 17.3333 0 0L0 0Z"
                            id="Shape"
                            fill="#{$theme === 'dark' ? '24293B' : 'FFFFFF'}"
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
                            fill="#{$theme === 'dark' ? '24293B' : 'FFFFFF'}"
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
                            fill="#{$theme === 'dark' ? '24293B' : 'FFFFFF'}"
                            fill-rule="evenodd"
                            stroke="none"></path>
                    </g>
                    <g id="S" transform="translate(19.514725 31.889664)">
                        <path
                            d="M1.02527 0.0903311C2.74866 -0.265088 3.61531 0.428332 3.62527 2.17033C3.19193 2.17033 2.75861 2.17033 2.32527 2.17033C2.32527 1.91033 2.32527 1.65033 2.32527 1.39033C2.06527 1.39033 1.80527 1.39033 1.54527 1.39033C1.50453 1.74731 1.54787 2.09415 1.67527 2.43033C2.72731 3.21839 3.46397 4.21497 3.88527 5.42033C3.49421 6.93353 2.54089 7.45353 1.02527 6.98033C-0.423528 5.95853 -0.336868 5.22169 1.28527 4.77033C1.2549 5.28617 1.42824 5.71933 1.80527 6.07033C2.2688 5.84985 2.3988 5.50327 2.19527 5.03033C1.84861 4.33691 1.32861 3.81691 0.635271 3.47033C-0.310609 2.21349 -0.180609 1.08691 1.02527 0.0903311L1.02527 0.0903311Z"
                            id="Shape"
                            fill="#{$theme === 'dark' ? 'FFFFFF' : '24293B'}"
                            fill-rule="evenodd"
                            stroke="none"></path>
                    </g>
                    <g id="T" transform="translate(23.660004 31.94957)">
                        <path
                            d="M0 0.290431C1.1622 0.0340711 2.37554 -0.0525091 3.64 0.0304311C3.64 0.463852 3.64 0.897012 3.64 1.33043C3.29342 1.33043 2.94658 1.33043 2.6 1.33043C2.78434 1.09539 3.04434 1.00881 3.38 1.07043C3.38 0.810432 3.38 0.550432 3.38 0.290431C2.25334 0.290431 1.12666 0.290431 0 0.290431L0 0.290431Z"
                            id="Shape"
                            fill="#{$theme === 'dark' ? 'FFFFFF' : '24293B'}"
                            fill-rule="evenodd"
                            stroke="none"></path>
                    </g>
                    <g id="U" transform="translate(14.528664 31.953003)">
                        <path
                            d="M1.59134 0.286985C1.158 0.286985 0.724684 0.286985 0.291343 0.286985C0.291343 2.19356 0.291343 4.10041 0.291343 6.00698C0.0334224 4.06167 -0.0532618 2.06851 0.0313426 0.0269855C0.612547 -0.049714 1.13255 0.0371258 1.59134 0.286985L1.59134 0.286985Z"
                            id="Shape"
                            fill="#{$theme === 'dark' ? 'FFFFFF' : '24293B'}"
                            fill-rule="evenodd"
                            stroke="none"></path>
                    </g>
                    <g id="U" transform="translate(14.82 32.23999)">
                        <path
                            d="M1.3 0C1.25676 1.82208 1.3001 3.64208 1.43 5.46C1.98871 5.8084 2.29203 5.63498 2.34 4.94C2.59745 3.3423 2.68411 1.69572 2.6 0C3.03334 0 3.46666 0 3.9 0C4.01315 2.10886 3.88315 4.18886 3.51 6.24C2.66347 6.74154 1.75347 6.87154 0.78 6.63C0.375518 6.4428 0.115518 6.13938 0 5.72C0 3.81342 0 1.90658 0 0C0.433342 0 0.866658 0 1.3 0L1.3 0Z"
                            id="Shape"
                            fill="#{$theme === 'dark' ? 'FFFFFF' : '24293B'}"
                            fill-rule="evenodd"
                            stroke="none"></path>
                    </g>
                    <g id="U" transform="translate(17.160004 31.953003)">
                        <path
                            d="M1.56 0.286986C1.12666 0.286986 0.693342 0.286986 0.26 0.286986C0.34411 1.98271 0.257451 3.62928 0 5.22699C0 3.49356 0 1.76041 0 0.0269855C0.581203 -0.0497141 1.1012 0.0371259 1.56 0.286986L1.56 0.286986Z"
                            id="Shape"
                            fill="#{$theme === 'dark' ? 'FFFFFF' : '24293B'}"
                            fill-rule="evenodd"
                            stroke="none"></path>
                    </g>
                    <g id="T" transform="translate(23.660004 32.23999)">
                        <path
                            d="M0 0C1.12666 0 2.25334 0 3.38 0C3.38 0.26 3.38 0.52 3.38 0.78C3.04434 0.71838 2.78434 0.80496 2.6 1.04C2.34229 2.81138 2.25563 4.63138 2.34 6.5C1.90666 6.5 1.47334 6.5 1.04 6.5C1.04 4.68 1.04 2.86 1.04 1.04C0.693343 1.04 0.346658 1.04 0 1.04C0 0.69342 0 0.34658 0 0L0 0Z"
                            id="Shape"
                            fill="#{$theme === 'dark' ? 'FFFFFF' : '24293B'}"
                            fill-rule="evenodd"
                            stroke="none"></path>
                    </g>
                    <g id="H" transform="translate(27.82 31.979996)">
                        <path
                            d="M2.6 0.26C3.03342 0.26 3.46658 0.26 3.9 0.26C3.9 2.42658 3.9 4.59342 3.9 6.76C3.46658 6.76 3.03342 6.76 2.6 6.76C2.6 5.80658 2.6 4.85342 2.6 3.9C2.25342 3.9 1.90658 3.9 1.56 3.9C1.56 4.94 1.56 5.98 1.56 7.02C1.04 7.02 0.52 7.02 0 7.02C0 4.68 0 2.34 0 0C0.52 0 1.04 0 1.56 0C1.56 0.95342 1.56 1.90658 1.56 2.86C1.90658 2.86 2.25342 2.86 2.6 2.86C2.6 1.99342 2.6 1.12658 2.6 0.26L2.6 0.26Z"
                            id="Shape"
                            fill="#{$theme === 'dark' ? 'FFFFFF' : '24293B'}"
                            fill-rule="evenodd"
                            stroke="none"></path>
                    </g>
                    <g id="H" transform="translate(30.419998 31.953003)">
                        <path
                            d="M0 0.286985C0.4589 0.0371259 0.978901 -0.049714 1.56 0.0269855C1.56 2.36699 1.56 4.70699 1.56 7.04699C0.978901 7.12368 0.4589 7.03684 0 6.78699C0.43342 6.78699 0.866581 6.78699 1.3 6.78699C1.3 4.62041 1.3 2.45356 1.3 0.286985C0.866581 0.286985 0.43342 0.286985 0 0.286985L0 0.286985Z"
                            id="Shape"
                            fill="#{$theme === 'dark' ? 'FFFFFF' : '24293B'}"
                            fill-rule="evenodd"
                            stroke="none"></path>
                    </g>
                    <g id="B" transform="translate(33.020004 31.964005)">
                        <path
                            d="M0 0.0159941C0.871001 -0.0269061 1.73758 0.0165138 2.6 0.145994C3.77988 0.578635 4.16988 1.40205 3.77 2.61599C3.64 2.91942 3.42342 3.13599 3.12 3.26599C4.50112 4.45472 4.50112 5.66813 3.12 6.90599C2.08364 7.03573 1.04364 7.07915 0 7.03599C0 4.69599 0 2.35599 0 0.0159941L0 0.0159941Z"
                            id="Shape"
                            fill="#{$theme === 'dark' ? 'FFFFFF' : '24293B'}"
                            fill-rule="evenodd"
                            stroke="none"></path>
                    </g>
                    <g id="T" transform="translate(24.700005 33.28)">
                        <path
                            d="M1.56 0C1.56 1.90658 1.56 3.81342 1.56 5.72C0.978796 5.7967 0.458797 5.70986 0 5.46C0.433342 5.46 0.866657 5.46 1.3 5.46C1.21563 3.59138 1.30229 1.77138 1.56 0L1.56 0Z"
                            id="Shape"
                            fill="#{$theme === 'dark' ? 'FFFFFF' : '24293B'}"
                            fill-rule="evenodd"
                            stroke="none"></path>
                    </g>
                    <g id="B" transform="translate(34.58 33.28)">
                        <path
                            d="M0 0C1.001 0.0522592 1.261 0.52884 0.779999 1.43C0.53352 1.55558 0.27352 1.59874 0 1.56C0 1.04 0 0.520001 0 0L0 0Z"
                            id="Shape"
                            fill="#{$theme !== 'dark' ? 'FFFFFF' : '24293B'}"
                            fill-rule="evenodd"
                            stroke="none"></path>
                    </g>
                    <g id="B" transform="translate(34.58 35.866173)">
                        <path
                            d="M0 0.01383C0.776881 -0.0758704 1.12346 0.270712 1.04 1.05383C1.12346 1.83695 0.776881 2.18353 0 2.09383C0 1.40041 0 0.707253 0 0.01383L0 0.01383Z"
                            id="Shape"
                            fill="#{$theme !== 'dark' ? 'FFFFFF' : '24293B'}"
                            fill-rule="evenodd"
                            stroke="none"></path>
                    </g>
                </g>
            </svg>
            <div class="font-semibold -ml-2 sm:ml-0 text-md sm:text-lg">
                USTHB
            </div>
        </div>
        <div class="flex space-x-2">
            <div class="flex flex-col">
                <span
                    class="flex flex-row-reverse cursor-pointer text-gray-100 sm:text-lg text-sm text-center border-rose-600
                  bg-rose-600 px-1 sm:px-3 py-2 sm:py-2.5 sm:mt-0.5 mt-1 rounded"
                    on:click="{() => {
                        active = true;
                    }}"
                    on:keypress="{() => {}}"
                >
                    <span class="text-white text-xs sm:text-md">Recherche</span>
                    <span>
                        <svg
                            class="w-4 h-4 stroke-white mx-auto mr-1 sm:mt-0"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2.5"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            ></path>
                        </svg>
                    </span>
                </span>
            </div>

            <div class="flex justify-end items-center">
                <div class=" mr-3">
                    <div class="float-right">
                        {#if $location === '/'}
                            <a href="/signup" use:link
                                ><div
                                    class="px-1.5 sm:px-3 py-2 sm:py-2.5 text-white sm:text-md text-xs text-center border-rose-600
                 w-full bg-rose-600
                rounded"
                                >
                                    S'inscrire
                                </div></a
                            >
                        {:else}
                            <a href="/" use:link
                                ><div
                                    class="px-1.5 sm:px-3 py-2 sm:py-2.5 text-white sm:text-md text-xs text-center border-rose-600
                 w-full bg-rose-600
                rounded"
                                >
                                    Se connecter
                                </div></a
                            >{/if}
                    </div>
                </div>
                <div class=" ">
                    <button
                        on:click="{themeToggleBtn}"
                        id="theme-toggle"
                        type="button"
                        class="text-gray-500 mr-2 dark:text-gray-400 hover:bg-gray-100
     dark:hover:bg-gray-700 focus:outline-none ring-gray-200 dark:ring-gray-700 ring-2 rounded text-sm p-2.5"
                    >
                        {#if $theme === 'dark'}
                            <svg
                                id="theme-toggle-dark-icon"
                                class="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
                                ></path>
                            </svg>
                        {:else}
                            <svg
                                id="theme-toggle-light-icon"
                                class="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"></path>
                            </svg>
                        {/if}
                    </button>
                </div>
            </div>
        </div>
    </div>
</Wapper>

{#if active}
    <div
        class="absolute z-[1234123123] w-screen h-screen min-h-screen min-w-full overflow-hidden top-1/4 bg-black/60 left-1/2 transform -translate-x-1/2 -translate-y-1/4"
    >
        <div
            in:fly="{{ y: 400, duration: 400 }}"
            out:fly="{{ y: -400, duration: 100 }}"
        >
            <div in:fly="{{ y: -100, duration: 800 }}">
                <div class="h-4"></div>
                <Wapper>
                    <div
                        class="flex flex-col items-center px-4 py-2 text-center border rounded shadow-lg w-full"
                    >
                        <form
                            class="w-full flex border-2 rounded border-rose-600"
                            on:submit|preventDefault="{SearchUser}"
                        >
                            <input
                                bind:value="{search}"
                                placeholder="Rechercher une page"
                                class="h-10 flex-1 text-base text-rose-700 w-full pointer-events-auto
                                     pl-4 outline-none focus:outline-none rounded dark:bg-inherit dark:text-white"
                            />
                            <span class="border w-0 h-6 my-auto border-rose-600"
                            ></span>
                            <button
                                class=" text-rose-600 dark:text-white px-2 pointer-events-auto
                                    outline-none focus:outline-none ease-linear transition-all duration-100"
                            >
                                <svg
                                    class="w-5 h-5 stroke-rose-600"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2.5"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    ></path>
                                </svg>
                            </button>
                        </form>
                        {#if done}
                            <div
                                class=" py-1 z-[10000] w-full h-96 mt-2 rounded border-y-2 border-y-rose-600 overflow-y-scroll"
                                bind:clientHeight="{y}"
                                on:scroll="{(e) => {
                                    yy = e.target['scrollHeight'];
                                    y =
                                        e.target['scrollTop'] +
                                        e.target['clientHeight'];
                                }}"
                            >
                                {#if searchedUser.length !== 0}
                                    <div class="h-full w-full">
                                        {#each searchedUser as page}
                                            <div
                                                class="cursor-pointer w-full pointer-events-auto"
                                                on:click="{() => {
                                                    push(
                                                        `/page/${page.username}`
                                                    );
                                                    searchedUser = [];
                                                    done = false;
                                                    active = false;
                                                    search = '';
                                                }}"
                                                on:keypress="{() => {}}"
                                            >
                                                <User
                                                    src="{page.photo_icon}"
                                                    username="{page.username}"
                                                    type="{page.ftype}"
                                                    count_followed_by="{page.count_followed_by}"
                                                />
                                            </div>
                                        {/each}
                                    </div>
                                {:else if search !== ''}
                                    <span
                                        class="w-full text-center text-gray-700 dark:text-gray-300 py-4 text-lg"
                                        >Aucun utilisateur trouvé</span
                                    >{/if}
                            </div>
                        {/if}
                    </div>
                    <div class=" bg-black/60 w-full">
                        <span
                            class="float-right flex items-center bg-white mt-3 px-2 py-0.5 rounded font-semibold text-red-600 cursor-pointer pointer-events-auto"
                            on:click="{() => {
                                active = false;
                                search = '';
                            }}"
                            on:keypress="{() => {}}"
                        >
                            <span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-6 w-6 rotate-45"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                </svg></span
                            >
                            <span>Fermer</span></span
                        >
                    </div>
                </Wapper>
            </div>
        </div>
    </div>
{/if}

{#if active}
    <style>
        body {
            pointer-events: none;
            overflow: hidden;
        }
    </style>
{/if}

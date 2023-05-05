<script>
    import Button from './ui/Button.svelte';
    import { themeToggleBtn, theme, baseurl } from './functions';
    import { link, push } from 'svelte-spa-router';
    import { location } from 'svelte-spa-router';
    import Wapper from './Wapper.svelte';
    import axios from 'axios';
    import User from './accounts/User.svelte';
    import brand from '../brand.jpg';
    let searchedUser = [],
        done = false,
        search = '',
        next = '';
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
</script>

<Wapper>
    <div
        class=" flex items-center justify-between  w-full bg-white dark:text-white dark:bg-slate-800 border rounded shadow
          py-3  pb-2 "
    >
        <div class="ml-3 flex-[0.1]">
            <p><img src="{brand}" alt="brand" class="h-16" /></p>
        </div>
        <div
            class="flex-[0.8] sm:flex-[0.7]  shadow rounded w-full self-center   justify-center"
        >
            <span
                class="flex px-1 mx-auto w-full text-sm items-center transition-colors  dark:text-light  space-x-2 cursor-pointer"
            >
                <form
                    class="w-full flex  border-2 rounded border-rose-600 "
                    on:submit|preventDefault="{SearchUser}"
                >
                    <input
                        bind:value="{search}"
                        class="h-8 sm:h-10 flex-1 text-base text-rose-700 w-full
                                     pl-4 outline-none focus:outline-none rounded dark:bg-inherit dark:text-white"
                    />
                    <span class="border w-0 h-6 my-auto   border-rose-600 "
                    ></span>
                    <button
                        class=" text-rose-600 dark:text-white 
                                                          px-2     
                                    outline-none focus:outline-none  ease-linear transition-all duration-100"
                    >
                        <svg
                            class="w-5 h-5"
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
            </span>
        </div>
        <div class="flex  justify-end items-center ">
            <div class=" mr-3 ">
                <div class="float-right ">
                    {#if $location === '/'}
                        <a href="/signup" use:link
                            ><div
                                class=" text-gray-100 sm:text-lg text-sm  text-center border-rose-600 
                 w-full bg-rose-600 dark:bg-rose-600  px-3 py-2 
                rounded "
                            >
                                Sign Up
                            </div></a
                        >
                    {:else}
                        <a href="/" use:link
                            ><div
                                class=" text-gray-100 sm:text-lg text-sm text-center border-rose-600 
                 w-full bg-rose-600 dark:bg-rose-600  px-3 py-2 
                rounded "
                            >
                                Log In
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
     dark:hover:bg-gray-700 focus:outline-none  ring-gray-200 dark:ring-gray-700 ring-2 rounded text-sm p-2.5"
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
</Wapper>
{#if done}
    <div
        class=" absolute top-25 left-[32%]  w-72 md:w-96 py-1 mb-4 z-[10000] h-72  rounded shadow min-w-max  ring-1 ring-black ring-opacity-25 dark:bg-dark  focus:outline-none bg-white dark:bg-slate-900 dark:text-white overflow-y-scroll "
        bind:clientHeight="{y}"
        on:scroll="{(e) => {
            yy = e.target['scrollHeight'];
            y = e.target['scrollTop'] + e.target['clientHeight'];
        }}"
    >
        <span
            class="flex px-1 text-sm items-center transition-colors  dark:text-light  space-x-2 cursor-pointer"
        >
            {#if searchedUser.length !== 0}
                <div class="h-full w-full">
                    {#each searchedUser as page}
                        <div
                            class="cursor-pointer w-full"
                            on:click="{() => {
                                push(`/page/${page.username}`);
                                searchedUser = [];
                                done = false;
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
                </div>{:else}
                <span
                    class="w-full text-center text-gray-700 dark:text-gray-300 py-4  text-lg"
                    >No user found !!</span
                >{/if}
        </span>
    </div>
{/if}

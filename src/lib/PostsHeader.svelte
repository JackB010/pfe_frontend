<script>
    import axios from 'axios';
    import { push, location } from 'svelte-spa-router';
    import { config } from '../stores/accounts/auth';
    import { postItems, postsLoaded } from '../stores/posts/posts';
    import { nexturl } from '../stores/tools';
    import { baseurl } from './functions';
    import SearchSection from './ui/SearchSection.svelte';
    export let profile = '';

    const searchFunc = async (search) => {
        // postsLoaded.set(false);
        await axios(
            `${baseurl}/posts/?search=${search}${
                profile ? `&user=${profile}` : ''
            }`,
            config
        ).then((res) => {
            nexturl.set(res.data['next']);
            postItems.set(res.data['results']);
            postsLoaded.set(true);
        });
    };
    const addItem = () => {
        push('/post/add');
    };
</script>

<div class="flex mx-4">
    <div class="flex w-full  px-1 justify-center items-end space-x-3 mb-6 mt-4">
        <div
            class="h-12 w-12 rounded-lg flex  items-center cursor-pointer border-2 border-rose-600 dark:border-white text-white bg-rose-600 hove:bg-rose-600 "
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-7 w-7 mx-auto  "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                on:click="{addItem}"
                on:keypress="{() => {}}"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
        </div>
        <!-- <div class=" flex-1 ">
            <form
                class="w-full h-12 flex"
                on:submit|preventDefault="{searchFunc}"
            >
                <input
                    bind:value="{search}"
                    class="-mr-1 h-12 w-full border-y-2  border-l-2 rounded-l-lg border-rose-600 text-rose-700
                                     text-lg pl-4 outline-none focus:outline-none"
                />

                <button
                    class=" text-white border-y-2 border-rose-600 dark:border-white  border-r-2  bg-rose-600 active:bg-rose-600  px-2 h-12  rounded-r-lg shadow 
                                    outline-none focus:outline-none  ease-linear transition-all duration-100"
                >
                    <svg
                        class="w-7 h-7"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        ></path>
                    </svg>
                </button>
            </form>
        </div> -->
        <div class=" flex-1  ">
            <SearchSection searchFunc="{searchFunc}" />
        </div>
    </div>
</div>

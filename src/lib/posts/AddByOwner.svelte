<script>
    import axios from 'axios';
    import { onMount } from 'svelte';
    import { config, usershortinfo } from '../../stores/accounts/auth';
    import User from '../accounts/User.svelte';
    import { baseurl } from '../functions';
    export let user;
    $: isActive = false;
    $: isSelected = false;
    let pages = [];
    onMount(async () => {
        usershortinfo.subscribe(async (data) => {
            await axios(`${baseurl}/accounts/profile/user/pages/`, config).then(
                (res) => {
                    pages = [data, ...res.data];
                }
            );
        });

        pages = pages;
    });
</script>

<div class="flex flex-col">
    <span
        on:click="{() => (isActive = !isActive)}"
        on:keypress="{() => {}}"
        class="flex items-center p-2 mb-4 border border-rose-600 dark:text-white transition-colors rounded-md dark:text-light w-full text-rose-600  dark:bg-rose-600"
        role="button"
    >
        <span>
            <svg
                class="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                ></path>
            </svg>
        </span>
        <span class="ml-2 text-sm"> creater </span>
        <span class="ml-auto">
            <svg
                class="w-4 h-4 transition-transform transform {isActive
                    ? ''
                    : 'rotate-180'}"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"></path>
            </svg>
        </span>
    </span>

    <div class="{!isActive ? 'hidden' : ''} w-full ">
        <div
            class="absolute border  rounded-lg overflow-hidden  h-32  overflow-y-scroll bg-white w-11/12 -mt-3"
        >
            {#each pages as page, index}
                <span
                    on:click="{() => {
                        if (index === 0) {
                            user = {
                                id: '',
                                photo_icon: pages[0].photo_icon,
                                username: pages[0].username,
                                ftype: pages[0].ftype,
                            };
                        } else user = pages[index];
                        isActive = false;
                        isSelected = true;
                    }}"
                    on:keypress="{() => {}}"
                >
                    <User
                        src="{page.photo_icon}"
                        username="{page.username}"
                        type="{page.ftype}"
                    />
                </span>
            {/each}
        </div>
    </div>
    <div
        class="shadow bg-white w-full cursor-default mb-3 {!isActive &&
        !isSelected
            ? 'hidden'
            : ''}"
    >
        <User
            src="{user.photo_icon}"
            username="{user.username}"
            type="{user.ftype}"
        />
    </div>
</div>

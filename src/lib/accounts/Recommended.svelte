<script>
    import Wapper from '../Wapper.svelte';
    import { config, usershortinfo } from '../../stores/accounts/auth';
    import { baseurl } from '../functions';
    import axios from 'axios';
    import { recommended, showRecommended } from '../../stores/tools';
    import Number from '../Number.svelte';
    import { link } from 'svelte-spa-router';

    let is_loaded = false;

    $: {
        let suggestedUrl = '';
        if ($usershortinfo.ftype === 'profile') {
            suggestedUrl = '/accounts/suggestedusers/user_user/';
        } else {
            suggestedUrl = '/pages/suggestedpages/';
        }
        if ($usershortinfo.ftype !== null) {
            axios(`${baseurl}${suggestedUrl}`, config).then((res) => {
                recommended.set(res.data['results']);
                is_loaded = true;
            });
        }
    }
    const followUser = (username, ftype) => {
        let userftype = $usershortinfo.ftype === 'profile' ? 'user' : 'page';
        ftype = ftype === 'profile' ? 'user' : 'page';
        axios
            .post(
                `${baseurl}/accounts/follow/${userftype}_${ftype}/`,
                {
                    username,
                },
                config
            )
            .then((res) => {
                let elm = document.getElementById(username);
                // let elm2 = document.getElementById(`${username}_Abonnés`);
                elm.classList.toggle('bg-rose-600');
                elm.classList.toggle('text-white');
                elm.classList.toggle('text-rose-600');
                elm.classList.toggle('ring-1');
                elm.classList.toggle('ring-rose-600');
                elm.classList.toggle('dark:text-white');

                if (elm.innerText === 'Abonner') {
                    // count_followed_by = count_followed_by + 1;
                    elm.innerText = 'Désabonner';
                } else {
                    // count_followed_by = count_followed_by - 1;
                    elm.innerText = 'Abonner';
                }
                // elm2.innerText = `${count_followed_by} Abonnés`;
            });
    };
</script>

{#if is_loaded}
    <Wapper>
        <div class="h-fit w-full border mb-2 rounded">
            <div class="flex flex-row items-center mt-2 mx-4">
                <div
                    class="font-bold text-xl flex-1 dark:text-white text-gray-900"
                >
                    Suggestions
                </div>
                <div class=" cursor-pointer float-right">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6 rotate-45 text-rose-600 rounded-full hover:bg-rose-600 hover:text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        on:click="{() => {
                            showRecommended.set(false);
                        }}"
                        on:keypress="{() => {}}"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                </div>
            </div>
            <div
                class="flex flex-row items-center mx-3 my-1 overflow-hidden"
                id="homesuggestion"
            >
                {#each $recommended as user}
                    <div
                        class="h-full relative flex flex-col items-center mb-4 m-2 px-8 dark:ring-1 ring-rose-600 shadow rounded"
                    >
                        <a
                            href="{`/${user.ftype}/${user.username}`}"
                            use:link
                            class="text-center"
                        >
                            <div
                                style="background-image: url({user.photo_icon})"
                                class="w-14 h-14 bg-cover bg-center self-center cursor-pointer object-cover {user.ftype ===
                                'profile'
                                    ? 'rounded-full'
                                    : 'rounded-lg'} border-1 mt-2 mx-auto shadow"
                            ></div>
                            <div class="text-semibold mt-1">
                                {user.username}
                            </div>
                        </a>
                        <div
                            class="text-xs text-center text-gray-700 dark:text-gray-300 mb-2"
                        >
                            <Number number="{user.count_followed_by}" /><span
                                class="ml-1">Abonnés</span
                            >
                        </div>
                        <div
                            class="relative mx-auto w-full h-10 mb-3 flex flex-col items-center m-2 px-9"
                        >
                            <span
                                id="{user.username}"
                                on:click="{() => {
                                    followUser(user.username, user.ftype);
                                    let elm = document.getElementById(
                                        user.username
                                    );
                                    if (elm.innerText !== 'Désabonner') {
                                        user.count_followed_by =
                                            user.count_followed_by + 1;
                                    } else {
                                        user.count_followed_by =
                                            user.count_followed_by - 1;
                                    }
                                }}"
                                on:keypress="{() => {}}"
                                class="cursor-pointer
                                     bg-rose-600 text-white absolute mx-auto
                                       px-4 h-fit w-fit py-1 rounded shadow justify-center"
                                >Abonner</span
                            >
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </Wapper>
{/if}

<style>
    #homesuggestion:hover {
        overflow-x: overlay;
        z-index: 12;
    }

    #homesuggestion::-webkit-scrollbar {
        height: 8px;

        border-radius: 50%;
    }
</style>

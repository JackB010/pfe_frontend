<script>
    import axios from 'axios';
    import { onMount } from 'svelte';
    import { push } from 'svelte-spa-router';
    import { fade, fly } from 'svelte/transition';
    import {
        config,
        setLogedOut,
        usershortinfo,
    } from '../../stores/accounts/auth';
    import { baseurl } from '../functions';
    import Wapper from '../Wapper.svelte';
    import Alert from '../ui/Alert.svelte';

    let email,
        first_name,
        is_active,
        last_name,
        username,
        username_h,
        is_delete = false,
        updated = false,
        error = false;
    onMount(() => {
        axios(`${baseurl}/accounts/profile/user/`, config).then((res) => {
            email = res.data['email'];
            first_name = res.data['first_name'];
            is_active = res.data['is_active'];
            last_name = res.data['last_name'];
            username = res.data['username'];
            username_h = res.data['username'];
        });
    });
    const UpdateUser = () => {
        // /accounts/profile/user/
        axios
            .put(
                `${baseurl}/accounts/profile/user/`,
                {
                    email,
                    first_name,
                    is_active,
                    last_name,
                    username,
                },
                config
            )
            .then((res) => {
                email = res.data['email'];
                first_name = res.data['first_name'];
                is_active = res.data['is_active'];
                last_name = res.data['last_name'];
                username = res.data['username'];
                error = false;
                if (!is_active) setLogedOut();
                if (username !== username_h) {
                    usershortinfo.update((data) => {
                        data.username = username;
                        return data;
                    });
                }
                setTimeout(() => {
                    updated = true;
                }, 50);
                setTimeout(() => {
                    updated = false;
                }, 5000);
            })
            .catch((err) => {
                error = true;
                setTimeout(() => {
                    updated = true;
                }, 50);
                setTimeout(() => {
                    updated = false;
                }, 5000);
            });
    };
</script>

<Wapper>
    <div class="mb-2 border rounded pt-3">
        <div
            class="flex items-center h-10 mb-3 dark:bg-gray-600 bg-gray-300 w-[98%] rounded shadow border mx-auto"
        >
            <div class="ml-2 flex-1 text-center sm:text-lg text-base">
                Paramètres personnels
            </div>
        </div>
        {#if updated}
            <Alert error="{error}" />
        {/if}
        {#if !is_delete}
            <div class="m-2 flex flex-col space-y-3" in:fade>
                <div
                    class="flex items-center px-2 text-white font-semibold rounded bg-rose-600 h-11 shadow cursor-pointer"
                    on:click="{() => {
                        push(
                            `/profile/${$usershortinfo.username}/settings/change`
                        );
                    }}"
                    on:keypress="{() => {}}"
                >
                    <div class="flex-1">Changer le mot de passe</div>
                    <div class="">
                        <svg
                            class="w-5 h-5 transition-transform transform -rotate-90 hover:text-rose-600 hover:scale-105 hover:bg-white rounded-full"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2.5"
                                d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </div>
                </div>
                <div>
                    <div class="mb-4">
                        <label
                            class="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
                            for="username"
                        >
                            Username
                        </label>
                        <input
                            class="shadow appearance-none border pl-4 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-rose-600 focus:border-rose-600"
                            id="username"
                            type="text"
                            bind:value="{username}"
                            placeholder="Username"
                            autocomplete="username"
                            required
                        />
                    </div>
                </div>
                <div>
                    <div class="mb-4">
                        <label
                            class="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
                            for="email"
                        >
                            Email
                        </label>
                        <input
                            class="shadow appearance-none border pl-4 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-rose-600 focus:border-rose-600"
                            id="email"
                            type="email"
                            bind:value="{email}"
                            placeholder="email"
                            autocomplete="email"
                            required
                        />
                    </div>
                </div>
                <div>
                    <div class="mb-4">
                        <label
                            class="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
                            for="first_name"
                        >
                            First Name
                        </label>
                        <input
                            class="shadow appearance-none border pl-4 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-rose-600 focus:border-rose-600"
                            id="first_name"
                            type="text"
                            bind:value="{first_name}"
                            placeholder="First Name"
                            autocomplete="username"
                            required
                        />
                    </div>
                </div>
                <div>
                    <div class="mb-4">
                        <label
                            class="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
                            for="last_name"
                        >
                            Last Name
                        </label>
                        <input
                            class="shadow appearance-none border pl-4 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-rose-600 focus:border-rose-600"
                            id="last_name"
                            type="text"
                            bind:value="{last_name}"
                            placeholder="Last Name"
                            autocomplete="Last Name"
                            required
                        />
                    </div>
                </div>

                <div class=" flex items-center">
                    <div class="text-center flex-1">
                        <div
                            class=" flex items-center text-white space-x-1 float-left bg-[#FF0000] mb-2 text-xs sm:text-sm rounded-lg cursor-pointer shadow-lg px-1.5 w-fit py-2"
                            on:click="{() => {
                                is_delete = !is_delete;
                            }}"
                            on:keypress="{() => {}}"
                        >
                            <div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    ></path>
                                </svg>
                            </div>
                            <div>Supprimer compte</div>
                        </div>
                    </div>
                    <div class="text-center">
                        <span
                            class="float-right bg-rose-600 text-white mr-4 mb-2 rounded cursor-pointer shadow w-fit px-2 py-2"
                            on:click="{() => {
                                UpdateUser();
                            }}"
                            on:keypress="{() => {}}">Mise à jour</span
                        >
                    </div>
                </div>
            </div>
        {:else}
            <div class="h-[30rem] flex flex-row items-center">
                <div
                    in:fly="{{ y: 100, duration: 1000 }}"
                    class="bg-white w-8/12 z-50 items-center flex flex-col space-y-4 pb-4 pt-2 rounded-2xl absolute translate-x-1/4"
                >
                    <div class="text-rose-600 font-bold">
                        Voulez-vous supprimer votre compte ?
                    </div>

                    <div class="flex flex-1 w-full justify-center items-center">
                        <div
                            class="text-center flex-1"
                            on:click="{() => {
                                is_active = false;
                                UpdateUser();
                            }}"
                            on:keypress="{() => {}}"
                        >
                            <span
                                class="bg-gray-700 pointer-events-auto text-white rounded cursor-pointer shadow-lg w-24 py-2 px-5"
                                >Conforme</span
                            >
                        </div>

                        <div
                            class="text-center flex-1"
                            on:click="{() => {
                                is_delete = !is_delete;
                            }}"
                            on:keypress="{() => {}}"
                        >
                            <span
                                class=" bg-[#FF0000] pointer-events-auto text-white rounded cursor-pointer shadow-lg w-24 py-2 px-5"
                                >Annuler</span
                            >
                        </div>
                    </div>
                </div>
            </div>
        {/if}
    </div>
</Wapper>
{#if is_delete}
    <style>
        body {
            overflow: hidden;
            pointer-events: none;
        }
    </style>
{/if}

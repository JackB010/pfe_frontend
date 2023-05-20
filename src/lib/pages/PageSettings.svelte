<script>
    import { onMount } from 'svelte';
    import Wapper from '../Wapper.svelte';
    import axios from 'axios';
    import { config } from '../../stores/accounts/auth';
    import { baseurl } from '../functions';
    import Alert from '../ui/Alert.svelte';
    let data = {},
        updated = false,
        error = false;

    onMount(() => {
        axios(`${baseurl}/pages/settings/`, config).then((res) => {
            data = res.data;
        });
    });

    const UpdateSettings = () => {
        axios
            .put(`${baseurl}/pages/settings/`, data, config)
            .then((res) => {
                data = res.data;
                error = false;

                setTimeout(() => {
                    updated = true;
                }, 50);
                setTimeout(() => {
                    updated = false;
                }, 5000);

                if (localStorage.getItem('color-theme') !== data.theme) {
                    if (data.theme === 'dark') {
                        document.documentElement.classList.add('dark');
                    } else {
                        document.documentElement.classList.remove('dark');
                    }
                    localStorage.setItem('color-theme', data.theme);
                }
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
        {#if updated}
            <Alert error="{error}" />
        {/if}
        <div class="mx-2">
            <div>
                <div>
                    <div class="mb-4 flex w-full">
                        <div
                            class="mb-4 flex flex-1 flex-row ml-1 items-center h-5"
                        >
                            <input
                                bind:checked="{data.show_owners}"
                                type="checkbox"
                                class="outline-none cursor-pointer focus:ring-0 active:ring-0 focus:outline-none
                                   focus:border-none w-5 h-5 rounded-full text-rose-600"
                            />

                            <label
                                class=" text-gray-700 text-sm font-bold ml-4 dark:text-white"
                                for="show_owners"
                                ><span>show owners</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div>
                    <div class="mb-4 flex w-full">
                        <div
                            class="mb-4 flex flex-1 flex-row ml-1 items-center h-5"
                        >
                            <input
                                bind:checked="{data.hide_content}"
                                type="checkbox"
                                class="outline-none cursor-pointer focus:ring-0 active:ring-0 focus:outline-none
                                   focus:border-none w-5 h-5 rounded-full text-rose-600"
                            />

                            <label
                                class=" text-gray-700 text-sm font-bold ml-4 dark:text-white"
                                for="hide_content"
                                ><span>hide content</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div>
                    <div class="mb-4 flex w-full">
                        <div
                            class="mb-4 flex flex-1 flex-row ml-1 items-center h-5"
                        >
                            <input
                                bind:checked="{data.followers_limit}"
                                type="checkbox"
                                class="outline-none cursor-pointer focus:ring-0 active:ring-0 focus:outline-none
                                   focus:border-none w-5 h-5 rounded-full text-rose-600"
                            />

                            <label
                                class=" text-gray-700 text-sm font-bold ml-4 dark:text-white"
                                for="hide_content"
                                ><span>limit followers</span>
                            </label>
                        </div>
                    </div>
                </div>
                {#if data.followers_limit}
                    <div>
                        <div class="mb-4 flex w-full">
                            <div class="mb-4 flex flex-1 flex-col ml-1 h-5">
                                <label
                                    class=" text-gray-700 text-sm font-bold dark:text-white"
                                    for="hide_content"
                                    ><span>muber limit followers</span>
                                </label>
                                <input
                                    bind:value="{data.followers_limit_num}"
                                    type="number"
                                    min="0"
                                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none
                            focus:outline-none border-rose-600 focus:border-rose-600"
                                />
                            </div>
                        </div>
                    </div>
                    <br />
                {/if}
                <div>
                    <div class="mb-4 flex w-full">
                        <span>
                            <span class="text-lg">Thème</span>
                            <div class="flex w-full flex-col ml-6">
                                <label>
                                    <input
                                        type="radio"
                                        bind:group="{data.theme}"
                                        name="themes"
                                        value="dark"
                                        class="outline-none cursor-pointer focus:ring-0 active:ring-0 focus:outline-none
                                   focus:border-none w-5 h-5 rounded-full text-rose-600"
                                    />
                                    Dark
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        bind:group="{data.theme}"
                                        name="themes"
                                        value="light"
                                        class="outline-none cursor-pointer focus:ring-0 active:ring-0 focus:outline-none
                                   focus:border-none w-5 h-5 rounded-full text-rose-600"
                                    />
                                    Light
                                </label>
                            </div>
                        </span>
                    </div>
                </div>
                <div class="text-center">
                    <span
                        class="float-right text-white bg-rose-600 mr-4 mb-4 rounded cursor-pointer shadow w-fit px-2 py-2"
                        on:click="{() => {
                            UpdateSettings();
                        }}"
                        on:keypress="{() => {}}">Mise à jour</span
                    >
                </div>
            </div>
        </div>
    </div></Wapper
>

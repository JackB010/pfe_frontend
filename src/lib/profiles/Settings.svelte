<script>
    import { onMount } from 'svelte';
    import Wapper from '../Wapper.svelte';
    import axios from 'axios';
    import { config } from '../../stores/accounts/auth';
    import { baseurl } from '../functions';
    import Alert from '../ui/Alert.svelte';
    import { theme } from '../functions';

    let params = {};
    let updated = false,
        error = false;
    let data = {
        birth_day: null,
        show_birth_day: 'everyone',
        show_full_name: 'everyone',
        show_pages_owned: 'everyone',
        show_gender: 'everyone',
        show_photo_profile: 'everyone',
        gender: 'none',
        theme: 'dark',
        show_photo_logout: true,
    };
    const items = [
        { value: 'everyone', label: 'Tout le monde' },
        { value: 'followers', label: 'Abonnés' },
        { value: 'onlyme', label: 'Seulement moi' },
    ];
    const genderList = [
        { value: 'none', label: 'None' },
        { value: 'female', label: 'Female' },
        { value: 'male', label: 'Male' },
    ];

    let themes = ['dark', 'light'];

    onMount(() => {
        axios(`${baseurl}/accounts/settings/`, config).then((res) => {
            data = res.data;
        });
    });

    const UpdateSettings = () => {
        axios
            .put(`${baseurl}/accounts/settings/`, data, config)
            .then((res) => {
                data = res.data;
                if (localStorage.getItem('color-theme') !== data.theme) {
                    if (data.theme === 'dark') {
                        document.documentElement.classList.add('dark');
                    } else {
                        document.documentElement.classList.remove('dark');
                    }
                    localStorage.setItem('color-theme', data.theme);
                    $theme = data.theme;
                }
                error = false;

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
                Paramètres généraux
            </div>
        </div>
        {#if updated}
            <Alert error="{error}" />
        {/if}

        <div class="mx-2">
            <div>
                <div class="mb-4 flex w-full">
                    <div class="flex w-full flex-col">
                        <label for="birth_day"> Date de naissance </label>
                        <input
                            name="birth_day"
                            type="date"
                            bind:value="{data.birth_day}"
                            class=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight outline-none
                            focus:outline-none border-rose-600 focus:border-rose-600"
                        />
                    </div>
                </div>
                <div>
                    <div class="mb-4 flex w-full">
                        <div class="flex w-full flex-col">
                            <label for="show_birth_day">
                                Montrer l'anniversaire à
                            </label>
                            <select
                                bind:value="{data.show_birth_day}"
                                name="show_birth_day"
                                class=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight outline-none
                            focus:outline-none border-rose-600 focus:border-rose-600"
                            >
                                {#each items as item}
                                    <option
                                        value="{item.value}"
                                        class="shadow appearance-none border checked:text-rose-600 rounded w-full p-3 text-gray-900 leading-tight outline-none
                            focus:outline-none"
                                    >
                                        {item.label}
                                    </option>
                                {/each}</select
                            >
                        </div>
                    </div>
                </div>
                <div>
                    <div class="mb-4 flex w-full">
                        <div class="flex w-full flex-col">
                            <label for="show_full_name">
                                Montrer le nom complet à
                            </label>
                            <select
                                name="show_full_name"
                                bind:value="{data.show_full_name}"
                                class=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight outline-none
                            focus:outline-none border-rose-600 focus:border-rose-600"
                            >
                                {#each items as item}
                                    <option
                                        value="{item.value}"
                                        class="shadow appearance-none border checked:text-rose-600 rounded w-full p-3 text-gray-900 leading-tight outline-none
                            focus:outline-none"
                                    >
                                        {item.label}
                                    </option>
                                {/each}</select
                            >
                        </div>
                    </div>
                </div>
                <div>
                    <div class="mb-4 flex w-full">
                        <div class="flex w-full flex-col">
                            <label for="show_pages_owned">
                                Afficher les pages synchronisées à
                            </label>
                            <select
                                name="show_pages_owned"
                                bind:value="{data.show_pages_owned}"
                                class=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight outline-none
                            focus:outline-none border-rose-600 focus:border-rose-600"
                            >
                                {#each items as item}
                                    <option
                                        value="{item.value}"
                                        class="shadow appearance-none border checked:text-rose-600 rounded w-full p-3 text-gray-900 leading-tight outline-none
                            focus:outline-none"
                                    >
                                        {item.label}
                                    </option>
                                {/each}</select
                            >
                        </div>
                    </div>
                </div>
                <div>
                    <div class="mb-4 flex w-full">
                        <div class="flex w-full flex-col">
                            <label for="show_gender"> Montrer le sexe à </label>
                            <select
                                name="show_gender"
                                bind:value="{data.show_gender}"
                                class=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight outline-none
                            focus:outline-none border-rose-600 focus:border-rose-600"
                            >
                                {#each items as item}
                                    <option
                                        value="{item.value}"
                                        class="shadow appearance-none border checked:text-rose-600 rounded w-full p-3 text-gray-900 leading-tight outline-none
                            focus:outline-none"
                                    >
                                        {item.label}
                                    </option>
                                {/each}</select
                            >
                        </div>
                    </div>
                </div>
                <div>
                    <div class="mb-4 flex w-full">
                        <div class="flex w-full flex-col">
                            <label for="gender"> Genre </label>
                            <select
                                name="gender"
                                bind:value="{data.gender}"
                                class=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight outline-none
                            focus:outline-none border-rose-600 focus:border-rose-600"
                            >
                                {#each genderList as item}
                                    <option
                                        value="{item.value}"
                                        class="shadow appearance-none border checked:text-rose-600 rounded w-full p-3 text-gray-900 leading-tight outline-none
                            focus:outline-none"
                                    >
                                        {item.label}
                                    </option>
                                {/each}</select
                            >
                        </div>
                    </div>
                </div>
                <div>
                    <div class="mb-4 flex w-full">
                        <span>
                            <div class="flex w-full space-x-4">
                                <div class="text-lg">Thème</div>
                                <div
                                    class="flex w-full space-x-6 justify-around flex-row items-center"
                                >
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
                            </div>
                        </span>
                    </div>
                </div>
                <div class="text-center">
                    <span
                        class="float-right bg-rose-600 text-white mr-4 mb-4 rounded cursor-pointer shadow w-fit px-2 py-2"
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

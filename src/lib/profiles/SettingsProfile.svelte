<script>
    import axios from 'axios';
    import { onMount } from 'svelte';
    import {
        config,
        userinfo,
        userUrl,
        usershortinfo,
        getProfileShortInfo,
    } from '../../stores/accounts/auth';
    import { baseurl } from '../functions';
    import Loader from '../ui/Loader.svelte';
    import Wapper from '../Wapper.svelte';

    $: photo_holder = $userinfo['photo'];
    let bio,
        photo,
        about,
        categories = [],
        categorie,
        username,
        is_loaded = false;
    let fileInput, files;
    onMount(() => {
        axios(`${baseurl}${$userUrl}`, config).then((res) => {
            photo_holder = res.data['photo'];
            photo = photo_holder;
            bio = res.data['bio'];
            about = res.data['about'];
            categories = res.data['categories'];
            username = res.data['user']['username'];
            is_loaded = true;
        });
    });

    $: {
        if (files) {
            for (const file of files) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = (e) => {
                    photo_holder = e.target.result;
                };
                photo_holder = photo_holder;
            }
        }
    }
    const UpdateProfile = () => {
        let data = new FormData();
        data.append('bio', bio);
        if (photo !== photo_holder && files !== undefined)
            data.append('photo', files[0], files[0].name);

        if ($userUrl.includes('page')) {
            data.append('about', about);

            axios.post(
                `${baseurl}/pages/categories/`,
                { categories: categories },
                config
            );
        }
        axios
            .put(`${baseurl}${$userUrl}${username}/ `, data, config)
            .then(async (res) => {
                bio = res.data['bio'];
                photo = res.data['photo'];
                if ($userUrl.includes('page')) {
                    about = res.data['about'];
                }
                usershortinfo.set(
                    await getProfileShortInfo(
                        res.data['id'],
                        $usershortinfo.ftype
                    )
                );

                userinfo.set(res.data);
            });
    };
    const handleKeydown = (event) => {
        if (event.code === 'Tab') {
            let incategories = false;
            for (let item of categories) {
                if (item === categorie) {
                    incategories = true;
                }
            }
            if (incategories) {
                show_error('categorie already exists');
            }
            if (!incategories && categorie.length > 0) {
                categories.push(categorie);
                categorie = '';
                categories.sort();
                categories = categories;
                event.target.focus();
            }
        }
    };
    const show_error = (msg) => {
        let error = document.querySelector('#error');
        error.innerHTML = msg;
        error.classList.remove('hidden');
    };
    const deleteCategorie = async (event) => {
        let list_categories = [],
            cat = event.target.id;
        for (let i = 0; i < categories.length; i++) {
            if (cat !== categories[i]) list_categories.push(categories[i]);
        }
        categories = list_categories;
    };
</script>

{#if is_loaded}
    <Wapper>
        <div
            class="flex sm:flex-row sm:items-center m-2  sm:space-x-3 flex-col"
        >
            <div class="self-center">
                <div
                    style="background-image: url({photo_holder})"
                    class="{$usershortinfo.ftype === 'profile'
                        ? 'rounded-full'
                        : 'rounded-lg'} w-32 h-32  bg-cover   bg-center   border-4 object-cover shadow"
                ></div>
                <div class="relative ">
                    <input
                        bind:files="{files}"
                        bind:this="{fileInput}"
                        type="file"
                        id="multi-upload-input "
                        class=" w-full hidden "
                        accept="image/png, image/jpeg"
                    />
                    <svg
                        class="w-8 h-8  absolute -top-[2.2rem] rounded-full cursor-pointer bg-white left-[5.8rem]  text-rose-600 "
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        on:click="{() => fileInput.click()}"
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
            <div class="flex flex-col flex-1 ml-2">
                <div class="flex-1  ">
                    <label
                        class="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
                        for="bio"
                    >
                        Bio
                    </label>
                    <textarea
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  outline-none
                            focus:outline-none border-rose-600 focus:border-rose-600 h-24"
                        id="bio"
                        placeholder="Write your bio ..."
                        autocomplete="bio"
                        bind:value="{bio}"
                        required></textarea>
                </div>
            </div>
        </div>
        {#if $usershortinfo.ftype === 'page'}
            <div class="mx-1 mb-4">
                <div class="flex-1 mb-4 ">
                    <label
                        class="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
                        for="bio"
                    >
                        About
                    </label>
                    <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  outline-none
                            focus:outline-none border-rose-600 focus:border-rose-600 "
                        id="About"
                        placeholder="Write your bio ..."
                        autocomplete="About"
                        bind:value="{about}"
                        required
                    />
                </div>
                <div>
                    <label
                        class="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
                        for="categories"
                    >
                        Categories
                    </label>
                    <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="categories"
                        type="text"
                        on:keydown="{handleKeydown}"
                        bind:value="{categorie}"
                        placeholder="categories"
                    />
                    <div
                        class="  flex flex-row flex-wrap mb-2 space-x-1 mt-3  "
                    >
                        {#each categories as item}
                            <div class="flex  flex-nowrap mb-2">
                                <span
                                    class="flex items-center  dark:bg-rose-600 cursor-pointer shadow-md text-rose-600 dark:text-white text-sm sm:text-sm p-1.5 font-semibold w-fit"
                                >
                                    <span class="pr-2 ">{item}</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-5 w-5 rotate-45 border rounded-full  dark:bg-white  cursor-pointer text-white bg-rose-600 dark:text-rose-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        on:click="{deleteCategorie}"
                                        on:keypress="{() => {}}"
                                        id="{item}"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                        ></path>
                                    </svg>
                                </span>
                            </div>
                        {/each}
                    </div>
                    <p
                        class="text-red-500 text-xs italic hidden mt-2"
                        id="error"
                    ></p>
                </div>
            </div>
        {/if}
        <div class="text-center ">
            <span
                on:click="{() => {
                    UpdateProfile();
                }}"
                on:keypress="{() => {}}"
                class="float-right text-white bg-rose-600 mr-4 mb-2 rounded-lg cursor-pointer shadow-lg w-24 py-2"
                >Update</span
            >
        </div>
    </Wapper>
{:else}
    <Loader />
{/if}

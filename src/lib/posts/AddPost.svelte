<script>
    import { baseurl } from '../functions';
    import { config, usershortinfo } from './../../stores/accounts/auth';
    import axios from 'axios';
    import { push } from 'svelte-spa-router';
    import Tags from './Tags.svelte';
    import AddByOwner from './AddByOwner.svelte';
    import ShowTo from './ShowTo.svelte';
    import ImagesInput from './ImagesInput.svelte';
    import { postItem, postItems } from '../../stores/posts/posts';
    import Wapper from '../Wapper.svelte';
    import { onMount } from 'svelte';
    import Loader from '../ui/Loader.svelte';
    import BackSection from '../ui/BackSection.svelte';

    const items = [
        { value: 'everyone', label: 'Tout le monde' },
        { value: 'followers', label: 'Abonnés' },
        { value: 'onlyme', label: 'Seulement moi' },
    ];
    let content = '',
        show_post_to = { value: 'everyone', label: 'Tout le monde' },
        allow_comments = true,
        tags = [],
        images = [],
        fimages = [],
        dimages = [];
    $: is_loaded = false;

    let user = {
        id: '',
        photo_icon: '',
        username: '',
        ftype: '',
        count_followed_by: 0,
    };

    onMount(() => {
        document.title = `${params.id ? 'Mise à jour' : 'Créer'} Post`;

        if (params.id) {
            axios(`${baseurl}/posts/${params.id}/`, config).then((res) => {
                postItem.set(res.data);
                content = res.data['content'];
                items.forEach((data) => {
                    if (res.data['show_post_to'] === data.value)
                        show_post_to = data;
                });
                allow_comments = res.data['allow_comments'];
                tags = res.data['tags'];

                res.data['images'].forEach((data) => {
                    images.push(data.image);
                });
                fimages = images;
                dimages = res.data['images'];
                user = res.data['profile'];
                if (user.username === $usershortinfo.username) user.id = '';
                is_loaded = true;
            });
        } else {
            is_loaded = true;
        }
    });
    const createPost = async () => {
        let data = {
            user: $usershortinfo.id === user.id ? '' : user.id, // === $usershortinfo.id=== user.id ?  '' : user.id,
            content,
            show_post_to: show_post_to.value,
            tags,
            allow_comments,
            deleted: false,
        };
        let id = '';
        await axios.post(`${baseurl}/posts/`, data, config).then((res) => {
            id = res.data.id;
            images.forEach((image) => {
                let data = new FormData();
                data.append('image', image, image.name);
                data.append('user', id);
                axios
                    .post(`${baseurl}/posts/images/`, data, config)
                    .then((res) => {
                        postItem.update((data) => {
                            data['images'].push(res.data);
                            return data;
                        });
                    });
            });
        });
        push(`/post/${id}`);
    };

    const updatePost = () => {
        let data = {
            user: $usershortinfo.id === user.id ? '' : user.id,
            content,
            show_post_to: show_post_to.value,
            tags,
            allow_comments,
            deleted: false,
        };
        axios
            .patch(`${baseurl}/posts/${$postItem['id']}/`, data, config)
            .then((res) => {
                postItems.update((data) => {
                    return data.map((data) => {
                        if (data.id === res.data.id) return res.data;
                        return data;
                    });
                });
                if (fimages !== images) {
                    let deleted_images = dimages.filter(
                        (n) => !images.includes(n['image'])
                    );
                    console.log(deleted_images);
                    deleted_images.forEach((data) => {
                        axios.post(
                            `${baseurl}/posts/images/clear/${data['id']}/`,
                            config
                        );
                    });

                    images.forEach((image) => {
                        let data = new FormData();
                        if (image instanceof File) {
                            data.append('user', $postItem['id']);
                            data.append('image', image, image.name);

                            axios
                                .post(`${baseurl}/posts/images/`, data, config)
                                .then((res) => {
                                    postItem.update((data) => {
                                        data['images'].push(res.data);
                                        return data;
                                    });
                                });
                        }
                    });
                }

                push(`/post/${$postItem['id']}`);
            });
    };

    export let params = {};
</script>

<!-- <div
    class="flex flex-wrap lg:float-right xl:mr-16  mt-10 md:mt-0 mx-2 md:w-7/12 lg:w-6/12 "
>
    <div
        class="relative w-full flex flex-col  break-words bg-white dark:bg-slate-800
             dark:text-white  border-2 mb-6 shadow-lg rounded  "
    > -->
<BackSection name="{`${params.id ? 'Mise à jour' : 'Créer'} Post`}" />

{#if is_loaded}
    <Wapper>
        <div class="border rounded shadow">
            <!-- <div
        class="ml-6 mt-3 cursor-pointer  bg-white rounded-full text-rose-600 p-2 mx-auto font-bold "
        on:click="{$}"
        on:keypress="{(e) => {}}"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
        >
            <path
                fill-rule="evenodd"
                d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                clip-rule="evenodd"></path>
        </svg>
    </div> -->
            <div class=" mx-auto mt-4 flex-auto w-full">
                <div
                    class="tab-content tab-space l
                "
                >
                    <form
                        class="w-11/12 flex flex-col mx-auto"
                        on:submit|preventDefault="{params.id
                            ? updatePost
                            : createPost}"
                    >
                        <div class="mb-2">
                            <label
                                class="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
                                for="content"
                            >
                                Contenu
                            </label>
                            <textarea
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none
                            focus:outline-none border-rose-600 focus:border-rose-600"
                                id="content"
                                placeholder="Écrivez ce que vous pensez..."
                                autocomplete="content"
                                bind:value="{content}"
                                required></textarea>
                        </div>
                        {#if $usershortinfo.ftype === 'profile'}
                            <ShowTo bind:value="{show_post_to}" />
                        {/if}
                        <Tags bind:tags="{tags}" />
                        {#if $usershortinfo.ftype === 'profile'}
                            <AddByOwner bind:user="{user}" />
                        {/if}
                        <ImagesInput bind:images="{images}" />
                        <div
                            class="mb-4 flex flex-1 flex-row ml-1 items-center h-5"
                        >
                            <input
                                bind:checked="{allow_comments}"
                                type="checkbox"
                                class="outline-none cursor-pointer focus:ring-0 active:ring-0 focus:outline-none
                                   focus:border-none w-5 h-5 rounded-full text-rose-600"
                            />

                            <label
                                class=" text-gray-700 text-sm font-bold ml-4 dark:text-white"
                                for="allow_comments"
                                ><span>Autoriser les commentaires</span>
                            </label>
                        </div>

                        <div class="bg-rose-600 object-cover rounded-lg mb-6">
                            <input
                                type="submit"
                                value="{params.id
                                    ? 'Mise à jour'
                                    : 'Créer'} Post"
                                class="text-white w-full px-2 h-10 rounded shadow bg-rose-600 dark:border-rose-600 outline-none focus:outline-none cursor-pointer"
                            />
                        </div>
                    </form>
                </div>
            </div>
            <!-- </div>
</div> -->
        </div>
    </Wapper>
{:else}
    <Loader />
{/if}

<script>
    import { baseurl } from '../functions';
    import { config, usershortinfo } from './../../stores/accounts/auth';
    import axios from 'axios';
    import { push } from 'svelte-spa-router';
    import { backurls } from './../../stores/tools';
    import Tags from './Tags.svelte';
    import AddByOwner from './AddByOwner.svelte';
    import ShowTo from './ShowTo.svelte';
    import ImagesInput from './ImagesInput.svelte';
    import { postItem } from '../../stores/posts/posts';

    const items = [
        { value: 'everyone', label: 'Everyone' },
        { value: 'followers', label: 'Followers' },
        { value: 'onlyme', label: 'Only me' },
    ];
    let content = '',
        show_post_to = items[0],
        allow_comments = true,
        tags = [],
        images;

    $: user = { id: '', photo_icon: '', username: '', ftype: '' };

    const createPost = async () => {
        let data = {
            user: user.id,
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
                axios.post(`${baseurl}/posts/images/`, data, config);
            });
            axios(`${baseurl}/posts/${res.data.id}/`, config).then((res) => {
                postItem.set(res.data);
            });
        });
        push(`/post/${id}`);
    };
    let url;
    const back = () => {
        if (url === undefined)
            backurls.update((data) => {
                url = data[data.length - 1];
                return data.filter((urls) => urls !== url);
            });
        push(url);
    };
</script>

<div
    class="flex flex-wrap lg:float-right xl:mr-16  mt-10 md:mt-0 mx-2 md:w-7/12 lg:w-6/12 "
>
    <div
        class="relative w-full flex flex-col  break-words bg-white dark:bg-slate-800
             dark:text-white  border-2 mb-6 shadow-lg rounded  "
    >
        <!--  <div
            class="ml-6 mt-3 cursor-pointer  bg-white rounded-full text-rose-600 p-2 mx-auto font-bold "
            on:click="{back}"
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
        <div class=" mx-auto mt-4 flex-auto w-full ">
            <div
                class="tab-content tab-space l
                "
            >
                <form
                    class="w-11/12 flex  flex-col mx-auto"
                    on:submit|preventDefault="{createPost}"
                >
                    <div class="mb-2">
                        <label
                            class="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
                            for="content"
                        >
                            Content
                        </label>
                        <textarea
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  outline-none
                            focus:outline-none border-rose-600 focus:border-rose-600"
                            id="content"
                            placeholder="Write what you think ..."
                            autocomplete="content"
                            bind:value="{content}"
                            required></textarea>
                    </div>
                    <ShowTo bind:show_post_to="{show_post_to}" />
                    <Tags bind:tags="{tags}" />
                    <AddByOwner bind:user="{user}" />
                    <ImagesInput bind:images="{images}" />
                    <div class="mb-4 flex flex-1 ml-1  space-y-0.5">
                        <div class="rounded-full  h-fit w-fit">
                            <input
                                bind:checked="{allow_comments}"
                                type="checkbox"
                                class="outline-none mx-auto focus:ring-rose-600 focus:outline-none 
                                   focus:border-none w-4 h-4  rounded-full text-rose-600"
                            />
                        </div>
                        <label
                            class="block flex-1 text-gray-700 text-sm font-bold ml-4 dark:text-white"
                            for="allow_comments"
                            ><span>Allow comments</span>
                        </label>
                    </div>

                    <div class="bg-rose-600 object-cover rounded-lg mb-6">
                        <input
                            type="submit"
                            value="Create Post"
                            class="text-white w-full px-2 h-10  rounded-lg shadow bg-rose-600 dark:border-rose-600 border-2 
     outline-none focus:outline-none cursor-pointer"
                        />
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

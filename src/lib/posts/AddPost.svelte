<script>
    import Fa from 'svelte-fa/src/fa.svelte';
    import { baseurl, dynamicSort } from '../functions';
    import { config } from './../../stores/accounts/auth';
    import axios from 'axios';
    import { push } from 'svelte-spa-router';
    import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
    import { backurls } from './../../stores/tools';

    // @ts-nocheck

    const items = [
        { value: 'everyone', label: 'Everyone' },
        { value: 'followers', label: 'Followers' },
        { value: 'onlyme', label: 'Only me' },
    ];
    let content = '',
        tag = '',
        show_post_to = items[0],
        allow_comments = true,
        tags = [];

    // $: tags = [{ name: 'lol' }, { name: 'dool' }];
    const handleKeydown = (event) => {
        // prevent that a space is typed
        if (event.code === 'Space' || event.code === 'Digit3')
            event.preventDefault();
        if (event.code === 'Tab') {
            let intags = false;
            for (let item of tags) {
                if (item['name'] === tag) {
                    intags = true;
                }
            }
            if (!intags && tag.length > 0) {
                tags.push({ name: tag });
                tag = '';
                tags.sort(dynamicSort('name'));
                tags = tags;
                event.target.focus();
            }
        }
        console.log(event);
    };
    const handleInput = (event) => {
        // remove spaces from pasted text
        tag = tag.replaceAll(' ', '');
    };

    const deleteTag = async (e) => {
        let list_tags = [],
            tag = e.target.id;
        for (let i = 0; i < tags.length; i++) {
            if (tag !== tags[i].name) list_tags.push(tags[i]);
        }
        tags = list_tags;
    };
    const createPost = () => {
        console.log({
            content,
            show_post_to,
            tags,
            allow_comments,
            deleted: false,
        });
        axios
            .post(
                `${baseurl}/posts/`,
                {
                    content,
                    show_post_to: show_post_to.value,
                    tags,
                    allow_comments,
                    deleted: false,
                },
                config
            )
            .then((res) => {
                push(`/post/${res.data.id}`);
            });
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
        <div
            class="ml-6 mt-3 cursor-pointer  bg-white rounded-full text-rose-600 p-2 mx-auto font-bold "
            on:click="{back}"
        >
            <Fa icon="{faArrowLeftLong}" />
        </div>
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
                    <div class="mb-4 flex w-full">
                        <div class="flex w-full">
                            <select
                                value="{show_post_to}"
                                class=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight  outline-none
                            focus:outline-none border-rose-600 focus:border-rose-600"
                            >
                                {#each items as item}
                                    <option
                                        value="{item}"
                                        class="shadow appearance-none border  checked:text-white rounded w-full  p-3 text-gray-900 leading-tight  outline-none
                            focus:outline-none"
                                    >
                                        {item.label}
                                    </option>
                                {/each}</select
                            >
                        </div>
                    </div>
                    <div class="mb-4 text-rose-600 inline">
                        <input
                            bind:value="{tag}"
                            on:keydown="{handleKeydown}"
                            on:input="{handleInput}"
                            class="flex max-w-min min-w-full {tags.length === 10
                                ? 'cursor-not-allowed bg-gray-200 text-gray-400'
                                : ''}   shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  outline-none
                            focus:outline-none border-rose-600 focus:border-rose-600"
                        />

                        <div class="w-full flex  flex-wrap text-white -ml-2 ">
                            <div class=" space-x-2 space-y-2 flex flex-wrap ">
                                <br />
                                {#each tags as item}
                                    <div class="flex  flex-wrap">
                                        <span
                                            class="bg-rose-500 space-y-1 active:bg-rose-600 pr-2 text-white justify-center inline-block cursor-pointer rounded-full px-2.5  py-0.5 text-xs sm:text-sm font-medium  "
                                            ># {item.name}
                                            <span
                                                class="font-bold ml-0.5 pb-0.5 px-1.5 -mr-2 border-2 rounded-full hover:border-2 hover:bg-rose-500 "
                                                on:click="{deleteTag}"
                                                id="{item.name}"
                                            >
                                                x
                                            </span>
                                        </span>
                                    </div>
                                {/each}
                            </div>
                        </div>
                    </div>

                    <div class="mb-4 flex ">
                        <div
                            class="border-2 h-6  w-6 mr-4   rounded-full border-rose-600"
                        >
                            <input
                                bind:value="{allow_comments}"
                                type="checkbox"
                                class=" outline-2 mx-auto 
                                 h-5 w-5 shadow-rose-600 -translate-y-1 rounded-full active:outline-none active:border-none border-none focus:outline-none focus:border-none text-rose-600"
                            />
                        </div>
                        <label
                            class="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
                            for="allow_comments"
                            >Allow comments
                        </label>
                    </div>

                    <div class="bg-rose-600 object-cover rounded-lg mb-6">
                        <input
                            type="submit"
                            class="text-white w-full px-2 h-10  rounded-lg shadow bg-rose-600 dark:border-rose-600 border-2 
     outline-none focus:outline-none "
                        />
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

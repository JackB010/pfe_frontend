<script>
    // import 'emoji-picker-element';
    import Image from '../posts/Image.svelte';
    import { images_chat } from '../../stores/chats/chat';
    import { isLoggin } from '../../stores/accounts/auth';

    export let sendFunc;
    export let placeholder;
    export let images = [];
    export let outImages = [];

    let fileInput;
    let files;
    let emoji_list = true;
    export let text = '';

    $: if (files) {
        for (const file of files) {
            getBase64(file);
            getimage(file);
        }
    }
    const getimage = (image) => {
        images = [...images, image];
        images = images;
    };
    const getBase64 = (image) => {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = (e) => {
            outImages = [...outImages, e.target.result];
            outImages = outImages;
        };
    };
    const onEmoji = (event) => {
        text += event.detail.emoji.unicode;
    };

    const handelsend = async () => {
        images_chat.set(images);
        if (text.length !== 0 || images.length != 0) {
            sendFunc(text);
            text = '';
            images = [];
            outImages = [];
            outImages = outImages;
            images = images;
        }
    };
</script>

<div class=" h-fit w-full flex flex-col ">
    <div
        class="ml-7  h-fit w-11/12 flex flex-1 mx-auto overflow-y-auto  flex-row pl-2 pr-2 space-x-1 -mb-3"
    >
        {#each outImages as image, index}
            <span class="relative"
                ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    class=" h-4 w-4 bg-white rounded-full absolute  mx-auto z-10 left-3/4 cursor-pointer"
                    fill="red"
                    viewBox="0 0 1792 1792"
                    on:click="{() => {
                        outImages = outImages.filter(
                            (image, key) => index != key
                        );
                        images = images.filter((image, key) => index != key);

                        images = images;
                        outImages = outImages;
                    }}"
                    on:keypress="{() => {}}"
                >
                    <path
                        d="M1277 1122q0-26-19-45l-181-181 181-181q19-19 19-45 0-27-19-46l-90-90q-19-19-46-19-26 0-45 19l-181 181-181-181q-19-19-45-19-27 0-46 19l-90 90q-19 19-19 46 0 26 19 45l181 181-181 181q-19 19-19 45 0 27 19 46l90 90q19 19 46 19 26 0 45-19l181-181 181 181q19 19 45 19 27 0 46-19l90-90q19-19 19-46zm387-226q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"
                    >
                    </path>
                </svg>
                <Image image="{image}" /></span
            >
        {/each}
    </div>
    <div class="flex w-full flex-1 mb-3">
        <input
            bind:files="{files}"
            bind:this="{fileInput}"
            type="file"
            id="multi-upload-input "
            class=" w-full hidden "
            accept="image/png, image/jpeg"
            multiple
        />
    </div>
</div>

<form class="flex w-full mx-auto mb-3 " on:submit|preventDefault="{handelsend}">
    {#if placeholder.includes('message')}
        <span
            class="flex items-center border  cursor-pointer w-14 ml-4 rounded-l-md justify-center bg-white text-gray-400 hover:text-gray-600 "
        >
            <svg
                class="w-5 h-5"
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
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                ></path>
            </svg>
        </span>
    {/if}
    <div class="flex-grow  {!placeholder.includes('message') ? 'pl-5' : ''} ">
        <div class="relative w-full">
            <input
                bind:value="{text}"
                placeholder="{placeholder}"
                class="placeholder:text-xs
                {isLoggin
                    ? ' pointer-events-none cursor-not-allowed  '
                    : ''}  sm:placeholder:text-sm flex w-full outline-none pr-10 focus:outline-none  border  focus:border-rose-600 pl-4 h-10 text-black {!placeholder.includes(
                    'message'
                )
                    ? 'rounded-l-md'
                    : ''} "
            />
            <span
                class="absolute flex z-30 {!$isLoggin
                    ? ' pointer-events-none cursor-not-allowed '
                    : ''} items-center justify-center h-full w-12 right-0 top-0  text-gray-400 hover:text-gray-600"
            >
                <svg
                    class="w-6 h-6 cursor-pointer"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    on:click="{() => {
                        emoji_list = !emoji_list;
                    }}"
                    on:keypress="{(e) => {}}"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                </svg>
            </span>
            <emoji-picker
                on:emoji-click="{onEmoji}"
                on:mouseleave="{() => {
                    emoji_list = true;
                }}"
                emoji-version="14.0"
                class="dark:dark light max-h-64 absolute md:right-2 bottom-12 -right-16 {emoji_list
                    ? 'hidden'
                    : ''}"></emoji-picker>
        </div>
    </div>
    <div class="bg-white w-14 mr-4 rounded-r-md active:bg-none border">
        <input
            bind:files="{files}"
            bind:this="{fileInput}"
            type="file"
            id="multi-upload-input "
            class=" w-full hidden  "
            accept="image/png, image/jpeg"
            multiple
        />
        <button
            type="submit"
            class="w-14 h-full {!$isLoggin
                ? ' pointer-events-none cursor-not-allowed '
                : ''}  mr-4 rounded-r-md active:bg-none border focus:outline-none"
            ><svg
                class="w-5 h-5 transform rotate-45 mx-auto -mt-px text-gray-400
                 hover:text-gray-600 "
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
            </svg></button
        >
    </div>
</form>

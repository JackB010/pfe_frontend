<script>
    import { onMount } from 'svelte';
    import Image from './Image.svelte';
    export let images = [];
    let outImages = images;
    let fileInput;
    let files;

    $: outkey = 0;
    $: imageout = '';
    $: isopen = false;
    $: deleted = false;
    $: if (deleted) {
        outImages = outImages.filter((image, index) => index != outkey);
        images = images.filter((image, index) => index != outkey);
        deleted = false;
        deleted = deleted;
        images = images;
        outImages = outImages;
    }
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
    onMount(() => {
        if (images.length > 0) {
            // for (const image of images) {
            //     getBase64(image);
            // }
            outImages = images;
        }
    });
</script>

<div class=" h-fit w-full flex flex-col">
    <div class="{isopen ? '' : 'hidden'}   bg-slate-400">
        <div
            class="h-[99%] w-[99%] rounded-lg bg-cover mx-auto bg-center -mt-0.5 absolute top-[0.3rem] left-[0.2rem]"
            style="background-image: url({imageout})"
        >
            <span>
                <span>
                    <svg
                        class="h-6 w-6 bg-white rounded-full mx-auto mr-4 mt-1 cursor-pointer"
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="currentColor"
                        fill="green"
                        viewBox="0 0 1792 1792"
                        on:click="{() => {
                            isopen = false;
                            isopen = isopen;
                        }}"
                        on:keypress="{() => {}}"
                    >
                        <path
                            d="M1412 734q0-28-18-46l-91-90q-19-19-45-19t-45 19l-408 407-226-226q-19-19-45-19t-45 19l-91 90q-18 18-18 46 0 27 18 45l362 362q19 19 45 19 27 0 46-19l543-543q18-18 18-45zm252 162q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"
                        >
                        </path>
                    </svg>
                </span>
                <span
                    ><svg
                        xmlns="http://www.w3.org/2000/svg"
                        class=" h-6 w-6 bg-white rounded-full mx-auto mr-4 mt-2 cursor-pointer"
                        fill="red"
                        viewBox="0 0 1792 1792"
                        on:click="{() => {
                            deleted = true;
                            isopen = false;
                            isopen = isopen;
                            deleted = deleted;
                        }}"
                        on:keypress="{() => {}}"
                    >
                        <path
                            d="M1277 1122q0-26-19-45l-181-181 181-181q19-19 19-45 0-27-19-46l-90-90q-19-19-46-19-26 0-45 19l-181 181-181-181q-19-19-45-19-27 0-46 19l-90 90q-19 19-19 46 0 26 19 45l181 181-181 181q-19 19-19 45 0 27 19 46l90 90q19 19 46 19 26 0 45-19l181-181 181 181q19 19 45 19 27 0 46-19l90-90q19-19 19-46zm387-226q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"
                        >
                        </path>
                    </svg></span
                ></span
            >
        </div>
    </div>
    <div
        class=" z-[100] {isopen
            ? 'bottom-2 absolute w-[90%]'
            : ''} h-fit w-full flex flex-1 overflow-y-auto flex-row space-x-1 justify-start mx-auto"
    >
        {#each outImages as image, index}
            <Image
                image="{image}"
                bind:imageout="{imageout}"
                bind:isopen="{isopen}"
                key="{index}"
                bind:outkey="{outkey}"
            />
        {/each}
    </div>
    <div class="flex items-center flex-1 mb-3 cursor-pointer w-fit">
        <input
            bind:files="{files}"
            bind:this="{fileInput}"
            type="file"
            id="multi-upload-input "
            class=" w-full hidden"
            accept="image/png, image/jpeg"
            multiple
        />
        <span>
            <svg
                class="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                on:click="{() => fileInput.click()}"
                on:keypress="{() => {}}"
            >
                <path
                    d="M13 4H8.8C7.11984 4 6.27976 4 5.63803 4.32698C5.07354 4.6146 4.6146 5.07354 4.32698 5.63803C4 6.27976 4 7.11984 4 8.8V15.2C4 16.8802 4 17.7202 4.32698 18.362C4.6146 18.9265 5.07354 19.3854 5.63803 19.673C6.27976 20 7.11984 20 8.8 20H15.2C16.8802 20 17.7202 20 18.362 19.673C18.9265 19.3854 19.3854 18.9265 19.673 18.362C20 17.7202 20 16.8802 20 15.2V11"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"></path>
                <path
                    d="M4 16L8.29289 11.7071C8.68342 11.3166 9.31658 11.3166 9.70711 11.7071L13 15M13 15L15.7929 12.2071C16.1834 11.8166 16.8166 11.8166 17.2071 12.2071L20 15M13 15L15.25 17.25"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"></path>
                <path
                    d="M18.5 3V5.5M18.5 8V5.5M18.5 5.5H16M18.5 5.5H21"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"></path>
            </svg>
        </span>
        <span
            class="text-gray-700 text-sm font-bold ml-4 dark:text-white"
            on:click="{() => fileInput.click()}"
            on:keypress="{() => {}}"><span>Importer des images</span></span
        >
    </div>
</div>

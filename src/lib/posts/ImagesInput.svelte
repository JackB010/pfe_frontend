<script>
    import Image from './Image.svelte';
    export let images = [];
    export let outImages = [];
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
</script>

<div class=" h-fit w-full flex flex-col  ">
    <div class="{isopen ? '' : 'hidden'}   bg-slate-400">
        <div
            class="h-[99%] w-[99%] rounded-lg bg-cover bg-center -mt-0.5  absolute top-0.5  left-0.5 translate-y-0.5"
            style="background-image: url({imageout})"
        >
            <span>
                <span>
                    <svg
                        class="h-6 w-6 bg-white rounded-full mx-auto   mr-4 mt-1 cursor-pointer"
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
                        class=" h-6 w-6 bg-white rounded-full   mx-auto mr-4 mt-2 cursor-pointer"
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
        class="  h-fit w-full flex flex-1 overflow-y-auto flex-row  space-x-1 justify-start  mx-auto"
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
        <span
            class="cursor-pointer"
            on:click="{() => fileInput.click()}"
            on:keypress="{() => {}}">placeholder</span
        >
    </div>
</div>

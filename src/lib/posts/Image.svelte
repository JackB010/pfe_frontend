<script>
    export let image = '';
    export let imageout = '';
    export let isopen = false;
    export let key = -1;
    export let outkey = -1;

    const showImage = () => {
        imageout = image;
        isopen = true;
        outkey = key;
        outkey = outkey;
        imageout = imageout;
        isopen = isopen;
    };
</script>

<span
    on:click="{showImage}"
    on:keypress="{() => {}}"
    class="cursor-pointer w-fit h-fit"
>
    <div id="" class="">
        <div
            class="sm:h-16 w-10 h-10 sm:w-16 p-3 mb-3 rounded-lg bg-cover bg-center"
            style="background-image: url({image})"
        ></div>
    </div>
</span>

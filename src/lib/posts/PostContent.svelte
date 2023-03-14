<script>
    import { link } from 'svelte-spa-router';
    import Badge from '../ui/Badge.svelte';
    export let content, tags, images, id;
    let index = 0;
    const next = async () => {
        await index++;
    };
    const previous = async () => {
        await index--;
    };
</script>

<div class="min-w-full">
    <div>
        <a href="{`/post/${id}`}" use:link>
            <p
                class="text-gray-900 dark:text-white ml-4 mb-3 line-clamp-2 font-mono text-sm"
            >
                {content}
            </p>
        </a>
        {#if images.length > 0}
            <div class="relative">
                {#each [images[index]] as img}
                    <a href="{`/post/${id}`}" use:link>
                        <img
                            src="{img.image}"
                            alt="aza"
                            class="object-cover p-2  sm:h-[480px] h-[380px]  w-full"
                        />
                    </a>
                {/each}
                <!-- The previous button -->

                {#if index > 0}
                    <button
                        class="absolute left-3 top-1/2 px-2.5 py-0.5 -translate-y-1/2 bg-black/30 hover:bg-black/50 border-b-2 border-t-2 border-rose-600
                 text-white hover:text-rose-500 cursor-pointer outline-none focus:outline-none rounded-full shadow-lg"
                        on:click="{previous}">❮</button
                    >
                {/if}

                <!-- The next button -->

                {#if index < images.length - 1}
                    <button
                        class="absolute right-3 top-1/2 px-2.5 py-0.5 -translate-y-1/2 bg-black/30 hover:bg-black/50 border-b-2 border-t-2 border-rose-600
                 text-white hover:text-rose-500 cursor-pointer outline-none focus:outline-none  rounded-full  shadow-lg "
                        on:click="{next}">❯</button
                    >
                {/if}
            </div>
        {/if}
    </div>

    <div class=" space-y-2 space-x-1 ml-4 my-2 ">
        {#each tags as tag}
            <Badge>{tag['name']}</Badge>
        {/each}
    </div>
</div>

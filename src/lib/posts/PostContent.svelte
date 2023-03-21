<script>
    import { link } from 'svelte-spa-router';
    import Badge from '../ui/Badge.svelte';
    import { location } from 'svelte-spa-router';

    export let content, tags, images, id;
    let index = 0;
    $: seeMore = false;
    const next = async () => {
        await index++;
    };
    const previous = async () => {
        await index--;
    };
</script>

<div class="min-w-full ">
    <div>
        <div class="flex items-start px-4 ">
            <span class="text-sm text-gray-900 dark:text-white ml-2 mb-2">
                <span
                    class="{seeMore == false
                        ? 'line-clamp-2'
                        : 'line-clam-none'} "
                    ><a
                        href="{`/post/${id}`}"
                        class="{$location.startsWith('/post/')
                            ? 'cursor-default'
                            : ''}"
                        use:link
                    >
                        {content}
                    </a>
                </span>
                {#if content.length > 120}
                    <span
                        class="overflow-visible cursor-pointer font-bold text-rose-400"
                        on:keypress="{() => {}}"
                        on:click="{(e) => {
                            seeMore = !seeMore;
                        }}"
                        >see {#if !seeMore}more{:else}less{/if}</span
                    >{/if}
            </span>
        </div>

        <div class="flex items-start px-4 w-full">
            {#if images.length > 0}
                <div class="relative w-full duration-700 ease-in-out">
                    {#each [images[index]] as img (index)}
                        <div>
                            <a href="{`/post/${id}`}" use:link>
                                <div
                                    style="background-image: url({img.image})"
                                    class="object-cover  w-full p-2 duration-700 ease-in-out bg-cover bg-center border dark:border-black rounded-md shadow-lg sm:h-[480px] h-[400px]  "
                                ></div>
                            </a>
                        </div>
                    {/each}
                    <!-- The previous button -->

                    {#if index > 0}
                        <button
                            class="absolute left-3 top-1/2  w-8 h-8 -translate-y-1/2 bg-black/50 hover:bg-black/70 border-2  border-rose-600
                 text-white hover:text-rose-500 cursor-pointer outline-none focus:outline-none rounded-full shadow-lg"
                            on:click="{previous}">❮</button
                        >
                    {/if}

                    <!-- The next button -->

                    {#if index < images.length - 1}
                        <button
                            class="absolute right-3 top-1/2  w-8 h-8 -translate-y-1/2 bg-black/30 hover:bg-black/50 border-2  border-rose-600
                 text-white hover:text-rose-500 cursor-pointer outline-none focus:outline-none  rounded-full  shadow-lg "
                            on:click="{next}">❯</button
                        >
                    {/if}
                </div>
            {/if}
        </div>
    </div>

    <div class=" space-y-2 space-x-1 ml-4 my-2 ">
        {#each tags as tag}
            <Badge>{tag['name']}</Badge>
        {/each}
    </div>
</div>

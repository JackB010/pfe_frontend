<script>
    import a from './../../imgs/a.jpg';
    import b from './../../imgs/b.jpg';
    import c from './../../imgs/c.jpg';
    import d from './../../imgs/d.jpg';
    import f from './../../imgs/f.jpg';
    import g from './../../imgs/g.jpg';
    let index = 0;
    let imgs = [a, b, c, d, g, f];
    const next = async () => {
        await index++;
    };
    const previous = async () => {
        await index--;
    };
</script>

<div>
    <p class="text-black dark:text-white mx-3 mb-2 line-clamp-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat odit
        ipsa suscipit praesentium ipsum, voluptas adipisci earum molestiae? Odio
        provident, sed recusandae aliquid nobis ipsa quos minus quibusdam
    </p>
    <div class="relative">
        {#each [imgs[index]] as img}
            <img
                src="{img}"
                alt="aza"
                class="object-cover p-2  sm:h-[480px] h-[380px]  w-full"
            />
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

        {#if index < imgs.length - 1}
            <button
                class="absolute right-3 top-1/2 px-2.5 py-0.5 -translate-y-1/2 bg-black/30 hover:bg-black/50 border-b-2 border-t-2 border-rose-600
                 text-white hover:text-rose-500 cursor-pointer outline-none focus:outline-none  rounded-full  shadow-lg "
                on:click="{next}">❯</button
            >
        {/if}
    </div>

    <!-- <img
        src="{aza}"
        alt="aza"
        class="object-cover p-2 {img == 1 ? 'hidden' : 'block'} rounded-2xl"
    /> -->
</div>

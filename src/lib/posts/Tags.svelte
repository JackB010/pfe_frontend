<script>
    import { dynamicSort } from '../functions';
    export let tags = [];
    let tag = '';
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
    };

    const handleInput = (event) => {
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
</script>

<div class="mb-4 text-rose-600 inline">
    <input
        bind:value="{tag}"
        on:keydown="{handleKeydown}"
        on:input="{handleInput}"
        placeholder="Tags"
        class="flex max-w-min min-w-full {tags.length === 10
            ? 'cursor-not-allowed bg-gray-200 text-gray-400'
            : ''} {tag.length > 30
            ? 'ring-2 ring-red-600 border-red-600'
            : ''}  shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  outline-none
                            focus:outline-none border-rose-600 focus:border-rose-600"
    />

    <div class="w-full flex  flex-wrap text-white -ml-2 ">
        <div class=" space-x-2 space-y-2 flex flex-wrap ">
            <br />
            {#each tags as item}
                <div class="flex  flex-wrap">
                    <span
                        class="bg-rose-500  w-fit active:bg-rose-600  text-white   rounded-2xl text-xs sm:text-sm py-0.5 px-1 font-semibold  flex-1 flex-row flex"
                    >
                        <span class="pr-2 "
                            ><span class="pr-0.5">#</span>{item.name}</span
                        >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5 rotate-45 border rounded-full  hover:bg-white  cursor-pointer hover:text-rose-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            on:click="{deleteTag}"
                            on:keypress="{() => {}}"
                            id="{item.name}"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                    </span>
                </div>
            {/each}
        </div>
    </div>
</div>

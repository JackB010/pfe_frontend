<script>
    import Badge from '../ui/Badge.svelte';

    export let content, tags;
</script>

<div class="min-w-full">
    <p class="text-black dark:text-white ml-4 mb-3 line-clamp-2 ">
        {content}
    </p>
    <div class=" space-y-2 space-x-1 ml-4 my-2 ">
        {#each tags as tag}
            <Badge>{tag['name']}</Badge>
        {/each}
    </div>
</div>

<script>
    import Number from '../Number.svelte';
    export let src;
    export let username;
    export let count_followed_by;
    export let type;
</script>

<div
    class="w-full px-4 py-2 border-b flex items-start hover:bg-rose-50/30 cursor-pointer"
>
    <div
        style="background-image: url({src})"
        class="h-10 w-10 border {type === 'profile'
            ? 'rounded-full'
            : 'rounded-lg'} bg-cover bg-center cursor-pointer object-cover"
    ></div>
    <div class="ml-4 flex flex-col">
        <p
            class="text-md font-semibold text-black dark:text-rose-600 m-0 p-0 self-start"
        >
            {username}
        </p>
        <p class="text-xs text-slate-400 -mt-0.5">
            <Number number="{count_followed_by}" />
            Abonnés{#if count_followed_by !== 1}s{/if}
        </p>
    </div>
</div>

<script>
    import { fade, fly } from 'svelte/transition';

    export let error = false;
    export let text = '';
</script>

<div
    in:fly="{{ y: 20, duration: 300 }}"
    out:fade="{{ duration: 300 }}"
    class="w-full h-10 {error
        ? 'bg-red-400/60 dark:bg-red-400/40'
        : 'bg-green-300/60 dark:bg-green-300/40'} text-center w-[96%] space-x-2 pl-2 rounded shadow mx-auto mb-5 text-lg flex items-center"
>
    <span
        ><svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
        >
            <path
                d="M12 16H12.01M12 8V12M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                stroke="{error ? '#f00' : '#12a530'}"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"></path>
        </svg></span
    >
    <span class="text-sm">
        {#if text.length !== 0}
            {text}
        {:else if !error}
            Paramètres mis à jour avec succès
        {:else}Échec de la mise à jour des paramètres
        {/if}
    </span>
</div>

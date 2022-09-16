<script>
    import { isLoggin } from '../stores/accounts/auth';
    import Button from './ui/Button.svelte';
    import { link } from 'svelte-spa-router';
</script>

<div class="flex md:justify-end max-w-xl mx-auto flex-col">
    <div
        class=" flex flex-col bg-white dark:text-white dark:bg-slate-800 mx-3 mt-32 border-2  h-72 "
    >
        <div class="font-bold text-2xl mx-auto mt-20">Page Not Found</div>
        <div class="mx-auto mt-12">
            <a href="/" use:link>
                <Button
                    >{#if $isLoggin}Back Home {:else} Go Login {/if}</Button
                ></a
            >
        </div>
    </div>
</div>

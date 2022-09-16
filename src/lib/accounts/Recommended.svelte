<script>
    import Text from '../ui/Text.svelte';
    import { link } from 'svelte-spa-router';

    export let icon, username, id;
</script>

<div class="flex  space-x-3 ml-2 p-2 pt-3">
    <div class=" w-3/5 ">
        <a href="{`/profile/${id}`}" use:link>
            <div class="flex">
                <img
                    src="{icon}"
                    class="rounded-full w-10 h-10"
                    alt="{username} profile icon"
                />
                <div class="mt-2 mx-3"><Text>{username}</Text></div>
            </div>
        </a>
    </div>
    <div class="mt-2 flex justify-end">
        <button
            class="text-white px-6 ml-10 bg-rose-500 active:bg-rose-600  h-6  rounded-full shadow 
     outline-none focus:outline-none  ease-linear transition-all duration-100"
            >Follow</button
        >
    </div>
</div>

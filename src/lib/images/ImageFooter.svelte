<script>
    import { faComments, faHeart } from '@fortawesome/free-solid-svg-icons';
    import Fa from 'svelte-fa/src/fa.svelte';
</script>

<div class="flex  p-1 py-2">
    <button
        class="w-1/2 p-1 mx-2 border-2 border-gray-600 dark:border-white rounded-full  hover:outline-none  shadow 
     outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-100 dark:active:text-rose-500"
    >
        <Fa icon="{faHeart}" class="inline" />
        Like</button
    >
    <button
        class="w-1/2 p-1 mx-2 border-2 border-gray-600 dark:border-white text-rose-600 rounded-full  hover:outline-none  shadow 
     outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-100 "
        ><Fa icon="{faComments}" class="inline" />
        Commets</button
    >
</div>

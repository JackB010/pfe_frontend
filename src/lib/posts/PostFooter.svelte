<script>
    import {
        faAlignLeft,
        faArrowRight,
        faArrowRightFromBracket,
        faArrows,
        faArrowsTurnRight,
        faCarBurst,
        faComments,
        faFolderClosed,
        faHeart,
        faMessage,
        faPaperPlane,
        faPlane,
        faPlaneArrival,
        faSeedling,
    } from '@fortawesome/free-solid-svg-icons';
    import axios from 'axios';
    import { config } from './../../stores/accounts/auth';
    import Fa from 'svelte-fa/src/fa.svelte';
    import { baseurl } from '../functions';
    export let num_comments, num_likes, is_liked;
    const makeLikeFunc = (e) => {
        let id = e.path[2].id;
        axios.post(`${baseurl}/posts/like/`, { id }, config).then((res) => {
            if (is_liked) num_likes = num_likes - 1;
            else num_likes = num_likes + 1;
            is_liked = !is_liked;
        });
    };
</script>

<div class="flex  p-1">
    <button
        on:click="{makeLikeFunc}"
        class="w-1/2 p-1 mx-2 border-2 border-gray-600 dark:border-white rounded-full  hover:outline-none  shadow 
     outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-100  {is_liked
            ? 'text-rose-600 dark:text-white dark:bg-rose-500 dark:active:text-white'
            : ''}"
    >
        <Fa icon="{faHeart}" class="inline" />
        {num_likes} Like{#if num_likes !== 1}s{/if}
    </button>
    <button
        class="w-1/2 p-1 mx-2 border-2 border-gray-600 dark:border-white  rounded-full text-rose-600 dark:text-white hover:outline-none  shadow 
     outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-100 "
        ><Fa icon="{faComments}" class="inline text-rose-600" />
        {num_comments} Commet{#if num_comments !== 1}s{/if}</button
    >
</div>
<form class="flex ">
    <input
        placeholder="Write your comment . . ."
        class="placeholder:pl-2 placeholder:focus:pl-0"
    />
    <button><Fa icon="{faPaperPlane}" /></button>
</form>

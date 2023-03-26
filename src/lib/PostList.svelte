<script>
    import { afterUpdate, onMount } from 'svelte';
    import { baseurl } from './functions';
    import axios from 'axios';
    import { config } from '../stores/accounts/auth';
    import { location, push } from 'svelte-spa-router';
    import { postItems, postsLoaded } from '../stores/posts/posts';
    import Loader from './ui/Loader.svelte';
    import {
        nexturl,
        recommended,
        showEventList,
        showRecommended,
        eventList,
    } from '../stores/tools';
    import Wapper from './Wapper.svelte';
    import Posts from './posts/Posts.svelte';
    import PostsHeader from './PostsHeader.svelte';
    import Recommended from './accounts/Recommended.svelte';
    import ShortEventList from './events/ShortEventList.svelte';
    let is_loaded = false;
    onMount(() => {
        if ($location === '/') {
            axios(`${baseurl}/posts/`, config).then((res) => {
                nexturl.set(res.data['next']);
                postItems.set(res.data['results']);
                postsLoaded.set(true);
            });
            axios(`${baseurl}/events/`, config).then((res) => {
                eventList.set(res.data);
                is_loaded = true;
            });
        }
    });
</script>

{#if $showEventList && $eventList.length !== 0}
    <ShortEventList is_loaded="{is_loaded}" />
{/if}
{#if $showRecommended && $recommended.length !== 0}
    <Recommended />
{/if}
<Wapper>
    {#if $location === '/'}
        <PostsHeader profile="{false}" />
    {/if}
    <div class="px-4 py-5 flex-auto ">
        <div
            class="tab-content tab-space l
                "
        >
            <div>
                {#if $postsLoaded}
                    <Posts />
                {:else}
                    <Loader />
                {/if}
            </div>
        </div>
    </div>
</Wapper>

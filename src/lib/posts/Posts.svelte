<script>
    import axios from 'axios';
    import { config } from '../../stores/accounts/auth';
    import { postItems } from '../../stores/posts/posts';
    import { nexturl } from '../../stores/tools';
    import NoThing from '../ui/NoThing.svelte';
    import PostItem from './PostItem.svelte';
    import { fly } from 'svelte/transition';
    export let num_total_likes = -1;
    export let num_total_saved = -1;
    let y = 0;
    $: {
        let html = document.documentElement;
        if (y + html.clientHeight - 50 === html.offsetHeight - 50) {
            if ($nexturl) {
                axios($nexturl, config).then(async (res) => {
                    let data = [];
                    postItems.subscribe((posts) => {
                        data = posts;
                    });
                    data = [...data, ...res.data['results']];
                    postItems.set(data);
                    nexturl.set(res.data['next']);
                    y = y - 20;
                });
            }
        }
    }
</script>

<svelte:window bind:scrollY="{y}" />

<div>
    {#if $postItems.length != 0}
        <div class="space-y-3">
            {#each $postItems as post, i}
                <div in:fly="{{ y: 50, duration: (i % 10) * 200 }}">
                    <PostItem
                        post="{post}"
                        bind:num_total_likes="{num_total_likes}"
                        bind:num_total_saved="{num_total_saved}"
                    />
                </div>
            {/each}
        </div>
    {:else}
        <NoThing
            message="No Post To See"
            dSVG="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
    {/if}
</div>

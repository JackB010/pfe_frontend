<script>
    import { location } from 'svelte-spa-router';

    import PostContent from './PostContent.svelte';
    import PostFooter from './PostFooter.svelte';
    import PostHeader from './PostHeader.svelte';
    export let post = {};
    export let num_total_likes = -1;
    export let num_total_saved = -1;
    let is_delete = false;
</script>

<!-- dark:bg-slate-600 -->
<div class="felx flex-col pb-1 border my-3 rounded" id="{post['id']}">
    <PostHeader
        profile="{post['profile']}"
        owner="{post['by_owner']}"
        created="{post.created}"
        is_saved="{post['is_saved']}"
        show_post_to="{post['show_post_to']}"
        id="{post['id']}"
        bind:is_delete="{is_delete}"
        bind:num_total_saved="{num_total_saved}"
    />
    <div class="{is_delete ? 'blur-sm' : 'blur-none'}">
        <PostContent
            content="{post['content']}"
            tags="{post['tags']}"
            images="{post['images']}"
            id="{post['id']}"
        />

        <PostFooter
            num_comments="{post['num_comments']}"
            num_likes="{post['num_likes']}"
            is_liked="{post['is_liked']}"
            allow_comments="{post['allow_comments']}"
            id="{post['id']}"
            bind:num_total_likes="{num_total_likes}"
        />
    </div>
</div>

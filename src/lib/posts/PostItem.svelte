<script>
    import { link } from 'svelte-spa-router';
    import PostContent from './PostContent.svelte';
    import PostFooter from './PostFooter.svelte';
    import PostHeader from './PostHeader.svelte';
    export let post = {};
</script>

<div
    class="felx border-2 flex-col bg-white dark:bg-slate-600 rounded-lg mb-4"
    id="{post['id']}"
>
    <PostHeader
        username="{post['profile']['username']}"
        photo_icon="{post['profile']['photo_icon']}"
        created="{post.created}"
    />
    <a href="{`/post/${post['id']}`}" use:link>
        <PostContent content="{post['content']}" tags="{post['tags']}" />
    </a>
    <PostFooter
        num_comments="{post['num_comments']}"
        num_likes="{post['num_likes']}"
        is_liked="{post['is_liked']}"
        allow_comments="{post['allow_comments']}"
    />
</div>

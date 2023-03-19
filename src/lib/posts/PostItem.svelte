<script>
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
        profile="{post['profile']}"
        owner="{post['by_owner']}"
        created="{post.created}"
    />
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
    />
</div>

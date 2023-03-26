<script>
    import axios from 'axios';
    import { afterUpdate, onMount } from 'svelte';
    import { config, usershortinfo } from '../../stores/accounts/auth';
    import { baseurl } from '../functions';
    import Loader from '../ui/Loader.svelte';
    import ProfileHeader from './ProfileHeader.svelte';
    import { postItems, postsLoaded } from '../../stores/posts/posts';
    import Wapper from '../Wapper.svelte';
    import { nexturl } from '../../stores/tools';
    import Posts from '../posts/Posts.svelte';
    import PostsHeader from '../PostsHeader.svelte';

    let userdata = {},
        loaded = false,
        user = '';
    afterUpdate(async () => {
        if (params.username != null) {
            if (user !== params.username) {
                postsLoaded.set(false);
                loaded = false;
                user = params.username;
                await axios(
                    `${baseurl}/accounts/profile/${params.username}/`,
                    config
                ).then((res) => {
                    userdata = res.data;
                    userdata = userdata;
                    loaded = true;
                });
            }
            axios(`${baseurl}/posts/?search=${params.username}`, config).then(
                (res) => {
                    nexturl.set(res.data['next']);
                    postItems.set(res.data['results']);
                    postsLoaded.set(true);
                }
            );
        }
    });
    onMount(async () => {
        user = params.username;
        await axios(
            `${baseurl}/accounts/profile/${params.username}/`,
            config
        ).then((res) => {
            userdata = res.data;
            userdata = userdata;
            loaded = true;
        });
    });
    onMount(async () => {
        axios(`${baseurl}/posts/?search=${params.username}`, config).then(
            (res) => {
                nexturl.set(res.data['next']);

                postItems.set(res.data['results']);
                postsLoaded.set(true);
            }
        );
    });
    export let params = {};
</script>

{#if loaded}
    <ProfileHeader userdata="{userdata}" />
    <Wapper>
        <div>
            {#if $postsLoaded}
                <PostsHeader />
                <div class="px-4 mt-3">
                    <Posts />
                </div>
            {:else}
                <Loader />
            {/if}
        </div>
    </Wapper>
{:else}
    <Loader />
{/if}

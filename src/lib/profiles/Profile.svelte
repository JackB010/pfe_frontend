<script>
    import axios from 'axios';
    import { afterUpdate, onMount } from 'svelte';
    import {
        config,
        selectedByNav,
        usershortinfo,
    } from '../../stores/accounts/auth';
    import { baseurl } from '../functions';
    import Loader from '../ui/Loader.svelte';
    import ProfileHeader from './ProfileHeader.svelte';
    import { postItems, postsLoaded } from '../../stores/posts/posts';
    import Wapper from '../Wapper.svelte';
    import { nexturl } from '../../stores/tools';
    import Posts from '../posts/Posts.svelte';
    import PostsHeader from '../PostsHeader.svelte';
    import BackSection from '../ui/BackSection.svelte';

    let userdata = {},
        loaded = false,
        user = '',
        show = !$selectedByNav;
    if ($selectedByNav) selectedByNav.set(false);
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
            axios(`${baseurl}/posts/?user=${params.username}`, config).then(
                (res) => {
                    nexturl.set(res.data['next']);
                    postItems.set(res.data['results']);
                    postsLoaded.set(true);
                }
            );
        }
    });
    // onMount(async () => {
    //     user = params.username;
    //     await axios(
    //         `${baseurl}/accounts/profile/${params.username}/`,
    //         config
    //     ).then((res) => {
    //         userdata = res.data;
    //         userdata = userdata;
    //         loaded = true;
    //     });
    //     axios(`${baseurl}/posts/?user=${params.username}`, config).then(
    //         (res) => {
    //             nexturl.set(res.data['next']);
    //             postItems.set(res.data['results']);
    //             postsLoaded.set(true);
    //         }
    //     );
    // });
    export let params = {};
</script>

{#if loaded}
    {#if show}
        <BackSection name="{userdata['user']['username']}" />
    {/if}
    <ProfileHeader userdata="{userdata}" />
    <Wapper>
        <div>
            {#if $postsLoaded}
                <PostsHeader profile="{params.username}" />
                <div class="px-4 mt-3">
                    <Posts
                        bind:num_total_likes="{userdata['num_total_likes']}"
                        bind:num_total_saved="{userdata['num_total_saved']}"
                    />
                </div>
            {:else}
                <Loader />
            {/if}
        </div>
    </Wapper>
{:else}
    <Loader />
{/if}

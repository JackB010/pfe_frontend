<script>
    import axios from 'axios';
    import { push } from 'svelte-spa-router';
    import { config, usershortinfo } from '../../stores/accounts/auth';
    import { postItems, postsLoaded } from '../../stores/posts/posts';
    import { nexturl } from '../../stores/tools';
    import { baseurl } from '../functions';
    import BackSection from '../ui/BackSection.svelte';
    import Loader from '../ui/Loader.svelte';
    import Wapper from '../Wapper.svelte';
    import Posts from './Posts.svelte';
    let count = 0,
        y;
    $: username = params.username;
    let is_owner = false;
    $: {
        if (username && !is_owner) {
            if ($usershortinfo.ftype === 'profile') {
                if ($usershortinfo.username !== username) {
                    axios(
                        `${baseurl}/accounts/profile/user/pages/`,
                        config
                    ).then((res) => {
                        res.data.forEach((page) => {
                            if (page['username'] === username) {
                                is_owner = true;
                                is_owner = is_owner;
                            }
                        });
                        if (!is_owner) push('/');
                    });
                }
            }
        }
    }

    $: {
        axios(`${baseurl}/posts/savedposts/${username}/`, config).then(
            (res) => {
                y = 0;
                nexturl.set(res.data['next']);
                count = res.data['count'];
                postItems.set(res.data['results']);
                postsLoaded.set(true);
            }
        );
    }

    export let params = {};
</script>

<svelte:window bind:scrollY="{y}" />
<BackSection name="Saved Posts" />
<Wapper>
    <div class="flex flex-col items-center space-y-2 space-x-2">
        <div
            class="flex items-center  mt-4 space-x-2 shadow rounded-lg px-3 py-1"
        >
            <div class="text-2xl ">{username}</div>
        </div>
        <div class="text-lg shadow w-fit text-rose-600 mx-auto p-2 rounded-lg">
            {count} Post{count === 1 ? '' : 's'} saved
        </div>
    </div>

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

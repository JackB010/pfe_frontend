<script>
    import axios from 'axios';
    import { config } from '../../stores/accounts/auth';
    import { postItems, postsLoaded } from '../../stores/posts/posts';
    import { nexturl } from '../../stores/tools';
    import { baseurl } from '../functions';
    import BackSection from '../ui/BackSection.svelte';
    import Loader from '../ui/Loader.svelte';
    import Wapper from '../Wapper.svelte';
    import Posts from './Posts.svelte';
    let count = 0,
        y;
    $: tag = params.tag;
    $: {
        document.title = `Tag: ${params.tag}`;
        axios(`${baseurl}/posts/search/tag/?search=${tag}`, config).then(
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
<BackSection name="Tag: {tag}" />

<Wapper>
    <div class=" border rounded mb-2">
        <div class="flex flex-col items-center space-y-2 space-x-2">
            <div
                class="flex items-center mt-4 space-x-2 shadow rounded-lg px-3 py-1"
            >
                <div class="text-3xl rounded-full ring-1 shadow-md w-fit h-fit">
                    <span class="rounded px-2.5">#</span>
                </div>
                <div class="text-2xl">{tag}</div>
            </div>
            <div
                class="text-lg shadow w-fit text-rose-600 mx-auto p-2 rounded-lg"
            >
                {count} Post{count === 1 ? '' : 's'}
            </div>
        </div>

        <div class="px-4 py-5 flex-auto">
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
    </div>
</Wapper>

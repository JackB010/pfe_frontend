<script>
    import axios from 'axios';
    import { config } from '../../stores/accounts/auth';
    import { baseurl } from '../functions';
    import FullInput from '../ui/FullInput.svelte';
    import ReplyItem from './ReplyItem.svelte';

    export let replies = [];
    export let commentid;
    export let num_replies;

    const addreply = (reply) => {
        if (reply.trim().length !== 0) {
            axios
                .post(
                    `${baseurl}/posts/comment/reply/${commentid}/`,
                    { reply },
                    config
                )
                .then((res) => {
                    replies = [...replies, res.data];

                    num_replies = num_replies + 1;
                });
            replies = replies;
        }
    };
</script>

<div class="border mt-3 mx-auto w-11/12"></div>
<div class="mx-auto">
    {#each replies as reply}
        <ReplyItem reply="{reply}" />
    {/each}
    <div class="{replies.length === 0 ? 'mt-2' : ''}">
        <FullInput sendFunc="{addreply}" placeholder="Write your reply . . ." />
    </div>
</div>

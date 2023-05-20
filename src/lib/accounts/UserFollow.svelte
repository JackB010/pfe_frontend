<script>
    import axios from 'axios';
    import { link } from 'svelte-spa-router';
    import { config, usershortinfo } from '../../stores/accounts/auth';
    import { baseurl } from '../functions';
    import Number from '../Number.svelte';
    import { fly } from 'svelte/transition';
    export let user;

    const followUser = (username, ftype) => {
        let userftype = $usershortinfo.ftype === 'profile' ? 'user' : 'page';
        ftype = ftype === 'profile' ? 'user' : 'page';
        axios
            .post(
                `${baseurl}/accounts/follow/${userftype}_${ftype}/`,
                {
                    username,
                },
                config
            )
            .then((res) => {
                user.is_following = !user.is_following;
                user.count_followed_by =
                    user.count_followed_by + (!user.is_following ? -1 : 1);
            });
    };
</script>

<div
    class="flex items-center relative my-1 border border-black/20 rounded-lg ml-1"
    in:fly="{{ y: 40, duration: 2 * 200 }}"
>
    <div
        class="w-full px-4 py-2 dark:border-0 dark:shadow-lg border rounded-lg flex items-start cursor-pointer"
    >
        <a href="{`/${user.ftype}/${user.username}`}" use:link>
            <div
                style="background-image: url({user.photo_icon})"
                class="h-10 w-10 border {user.ftype === 'profile'
                    ? 'rounded-full'
                    : 'rounded-lg'} bg-cover bg-center cursor-pointer object-cover shadow"
            ></div></a
        >
        <div class="ml-4">
            <p
                class="text-md font-semibold dark:text-white text-gray-700 m-0 p-0"
            >
                <a href="{`/${user.ftype}/${user.username}`}" use:link>
                    {user.username}
                </a>
            </p>
            <p class="text-xs text-gray-700 dark:text-gray-300 -mt-0.5">
                <Number number="{user.count_followed_by}" />
                Abonnés{#if user.count_followed_by !== 1}s{/if}
            </p>
        </div>
    </div>
    {#if user.id !== $usershortinfo.id}
        {#if $usershortinfo.ftype === 'profile' || (user.ftype === 'page' && $usershortinfo.ftype === 'page')}
            <div class=" absolute right-2">
                <span
                    id="{user.username}"
                    on:click="{() => {
                        followUser(user.username, user.ftype);
                    }}"
                    on:keypress="{() => {}}"
                    class="  {user.is_following
                        ? 'text-rose-600 ring-1 ring-rose-600 dark:text-white '
                        : 'bg-rose-600 text-white '}  cursor-pointer text-xs sm:text-sm sm:mr-3
                                       px-3 h-fit w-fit py-1 rounded-md shadow-md justify-center"
                    >{user.is_following ? 'Se désabonner' : "S'abonner"}</span
                >
            </div>
        {/if}
    {/if}
</div>

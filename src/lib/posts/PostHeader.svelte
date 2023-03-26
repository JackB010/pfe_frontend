<script>
    import moment from 'moment';
    import { link } from 'svelte-spa-router';
    export let profile = undefined,
        created = undefined,
        owner = undefined;
    $: username = profile['username'];
    $: image = profile['photo_icon'];
    $: ftype = profile['ftype'];
    $: changed = false;
    const infoChange = () => {
        if (changed) {
            username = profile['username'];
            image = profile['photo_icon'];
            ftype = profile['ftype'];
            changed = !changed;
        } else {
            username = owner['username'];
            image = owner['photo_icon'];
            ftype = owner['ftype'];
            changed = !changed;
        }
    };
</script>

<div class="flex p-0.5 space-x-2 w-full mb-2">
    <div class="flex items-center px-4 py-2 w-full ">
        <div class="">
            <a href="{`/${ftype}/${username}`}" use:link>
                <div
                    style="background-image: url({image})"
                    class="w-12 h-12 bg-cover bg-center {ftype === 'profile'
                        ? 'rounded-full'
                        : 'rounded-lg'} cursor-pointer object-cover mr-4 shadow"
                ></div>
            </a>
        </div>

        <div class="  w-fit">
            <div class="flex flex-col items-start justify-between">
                <span>
                    <span
                        class="text-lg cursor-pointer font-semibold text-gray-900 dark:text-white -mt-1"
                    >
                        <a href="{`/${ftype}/${username}`}" use:link>
                            {username}</a
                        ></span
                    >
                    <span class="text-sm font-semibold">
                        {#if owner.username !== undefined}<span
                                >{#if changed} to {:else} by{/if}
                            </span>
                            <span
                                class="text-rose-400 cursor-pointer text-[0.93rem]"
                                on:click="{infoChange}"
                                on:keypress="{() => {}}"
                            >
                                {#if changed}
                                    {profile.username}
                                {:else}
                                    {owner.username}{/if}
                            </span>{/if}
                    </span>
                </span>

                <div>
                    <small class="text-sm text-gray-700 dark:text-slate-200"
                        >{moment(created).fromNow()}</small
                    >
                </div>
            </div>
        </div>

        <div class="flex-1   px-3 ">
            <span class="font-bold float-right  cursor-pointer">...</span>
        </div>
    </div>
</div>

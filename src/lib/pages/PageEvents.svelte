<script>
    import axios from 'axios';
    import { afterUpdate, onMount } from 'svelte';
    import { config } from '../../stores/accounts/auth';
    import { eventList, eventsLoaded, nexturl } from '../../stores/tools';
    import EventList from '../events/EventList.svelte';
    import { baseurl } from '../functions';
    import Loader from '../ui/Loader.svelte';
    import NoThing from '../ui/NoThing.svelte';

    export let username = '';
    export let is_Selected = false;

    if (is_Selected) {
        // eventList.set([]);
        // eventsLoaded.set(false);
        // nexturl.set('');
    }
    eventList.set([{}]);
    eventsLoaded.set(false);
    let y = 0,
        yy = -1;
    onMount(() => {
        axios(
            `${baseurl}/events/${username ? `?search=${username}` : ''}`,
            config
        ).then(async (res) => {
            eventList.update((data) => [...res.data['results']]);
            nexturl.set(res.data['next']);
            eventsLoaded.set(true);
        });
    });
    $: {
        if (yy - 100 === y - 100) {
            if ($nexturl) {
                axios($nexturl, config).then(async (res) => {
                    await eventList.update((data) => [
                        ...data,
                        ...res.data['results'],
                    ]);
                    nexturl.set(res.data['next']);
                    yy = yy - 100;
                });
            }
        }
    }
</script>

{#if $eventList.length !== 0}
    <div
        class="px-4 mt-6 mb3 w-full h-[34rem]  overflow-hidden"
        bind:clientHeight="{y}"
        on:scroll="{(e) => {
            yy = e.target['scrollHeight'];
            y = e.target['scrollTop'] + e.target['clientHeight'];
        }}"
        id="homeevents"
    >
        {#if $eventsLoaded}
            <EventList />
        {:else}
            <Loader />{/if}
    </div>
{:else}
    <div class="px-4 mt-3 mb3">
        <NoThing
            message="No Event To See"
            dSVG="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
    </div>
{/if}

<style>
    #homeevents:hover {
        overflow-y: overlay;
    }
</style>

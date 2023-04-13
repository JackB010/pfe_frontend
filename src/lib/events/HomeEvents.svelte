<script>
    import PageEvents from '../pages/PageEvents.svelte';
    import Wapper from '../Wapper.svelte';
    import EventsHeader from './EventsHeader.svelte';
</script>

<Wapper>
    <div class="border rounded shadow mb-3">
        <EventsHeader />
        <PageEvents />
    </div>
</Wapper>

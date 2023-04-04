<script>
    import { eventList } from '../../stores/tools';
    import Event from './Event.svelte';
</script>

<div class="mx-3 ">
    {#each $eventList as event, i}
        <Event event="{event}" i="{i}" />
    {/each}
</div>

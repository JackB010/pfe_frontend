<script>
    import SettingsProfile from './SettingsProfile.svelte';
    import SettingsUser from './SettingsUser.svelte';
    import Settings from './Settings.svelte';
    import { usershortinfo } from '../../stores/accounts/auth';
    import BackSection from '../ui/BackSection.svelte';
    import PageSettings from '../pages/PageSettings.svelte';
</script>

<!-- <Wapper> -->
<div class=" mx-auto">
    <BackSection name="Settings" />
    <div><SettingsProfile /></div>
    {#if $usershortinfo.ftype === 'profile'}
        <div><Settings /></div>
    {:else}
        <div><PageSettings /></div>{/if}
    <div><SettingsUser /></div>
</div>
<!-- </Wapper> -->

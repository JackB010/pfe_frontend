<script>
    import SettingsProfile from './SettingsProfile.svelte';
    import SettingsUser from './SettingsUser.svelte';
    import Settings from './Settings.svelte';
    import { onMount } from 'svelte';

    import { config, userinfo, userUrl } from '../../stores/accounts/auth';
    import { baseurl } from '../functions';
    import axios from 'axios';
</script>

<!-- <Wapper> -->
<div class=" mx-auto ">
    <div><Settings /></div>
    <div><SettingsProfile /></div>
    <div><SettingsUser /></div>
</div>
<!-- </Wapper> -->

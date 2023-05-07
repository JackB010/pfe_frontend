<script>
    import Router, { push } from 'svelte-spa-router';
    // import Nav from './lib/_Nav.svelte';
    import TryNav from './lib/TryNav.svelte';
    import NavNoLogin from './lib/NavNoLogin.svelte';
    import { nonroutes, routes, conform } from './routesHolder';
    import './style/app.css';

    import {
        config,
        isLoggin,
        setLogedIn,
        setLogedOut,
        updateToken,
        userToken,
        userinfo,
    } from './stores/accounts/auth';

    import { onMount } from 'svelte';
    import { baseurl } from './lib/functions';
    import axios from 'axios';
    import { unread_messages } from './stores/chats/chat';
    import { unread_notifications } from './stores/notifications/notifications';
    import { chating_with, getChatContacts } from './stores/chats/chat';
    import moment from 'moment';

    onMount(() => {
        moment.locale('fr');
        const pathname = window.location.pathname;
        if (!$userinfo['is_conformed']) {
            push('/conform');
        }
        if (!pathname.startsWith('/chat')) {
            chating_with.set('');
        }

        if (localStorage.getItem('authTokens')) setLogedIn();
        else setLogedOut();
        if ($isLoggin) {
            updateToken($userToken.refresh);
        }
        let intervaltime40 = 1000 * 60 * 40;
        let interval = setInterval(() => {
            if ($userToken) {
                updateToken($userToken['refresh']);
            } else {
                setLogedOut();
            }
        }, intervaltime40);
        return () => clearInterval(interval);
    });
    // onMount(async () => {
    //     let chatIntervalID = setInterval(getChatContacts, 5000);
    //     return () => clearInterval(chatIntervalID);
    // });

    // onMount(async () => {
    //     await axios
    //         .all([
    //             axios(`${baseurl}/chats/unread_num/`, config),
    //             axios(`${baseurl}/notifications/unread_num/`, config),
    //         ])
    //         .then((res) => {
    //             unread_messages.set(res[0].data['unread_num']);
    //             unread_notifications.set(res[1].data['unread_num']);
    //         });

    //     let interval = setInterval(async () => {
    //         await axios
    //             .all([
    //                 axios(`${baseurl}/chats/unread_num/`, config),
    //                 axios(`${baseurl}/notifications/unread_num/`, config),
    //             ])
    //             .then((res) => {
    //                 unread_messages.set(res[0].data['unread_num']);
    //                 unread_notifications.set(res[1].data['unread_num']);
    //             });
    //     }, 5000);
    //     return () => clearInterval(interval);
    // });
</script>

<main class=" lg:container mx-auto">
    {#if $isLoggin}
        <div class="md:mt-5">
            <!-- <Nav /> -->
            <TryNav />
            {#if !$userinfo['is_conformed']}
                <Router routes="{conform}" />
            {:else}
                <Router routes="{routes}" />
            {/if}
        </div>
    {:else}
        <NavNoLogin />
        <Router routes="{nonroutes}" />
    {/if}
</main>

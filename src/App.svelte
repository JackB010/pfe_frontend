<script>
    import Router from 'svelte-spa-router';
    import Nav from './lib/Nav.svelte';
    import NavNoLogin from './lib/NavNoLogin.svelte';
    import Login from './lib/accounts/Login.svelte';
    import Page404 from './lib/Page404.svelte';
    import './style/app.css';
    import {
        config,
        isLoggin,
        setLogedIn,
        setLogedOut,
        updateToken,
        userToken,
    } from './stores/accounts/auth';
    import Signup from './lib/accounts/Signup.svelte';
    import { location } from 'svelte-spa-router';
    import ResetPassword from './lib/accounts/ResetPassword.svelte';
    import CodeReset from './lib/accounts/CodeReset.svelte';
    import ChangePassword from './lib/accounts/ChangePassword.svelte';
    import { onMount } from 'svelte';
    import { baseurl } from './lib/functions';
    import axios from 'axios';
    import { unread_messages } from './stores/chats/chats';
    import { unread_notifications } from './stores/accounts/notifications';
    import PostItem from './lib/posts/PostItem.svelte';
    import PostImage from './lib/PostImage.svelte';
    import { chating_with, getChatContacts } from './stores/chats/chat';
    import HomeChat from './lib/chats/HomeChat.svelte';
    import ChatRoom from './lib/chats/ChatRoom.svelte';
    import Post from './lib/posts/Post.svelte';
    import AddPost from './lib/posts/AddPost.svelte';

    onMount(() => {
        const pathname = window.location.pathname;
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

    const routes = new Map();
    routes.set('/', PostImage);
    routes.set('/chat', HomeChat);
    routes.set('/chat/:username', ChatRoom);
    routes.set('/post/add', AddPost);
    routes.set('/post/:id', Post);
    // routes.set('/Page404', Page404);
    routes.set('*', Page404);

    const nonroutes = new Map();

    nonroutes.set('/', Login);
    nonroutes.set('/signup', Signup);
    nonroutes.set('/reset', ResetPassword);
    nonroutes.set('/reset/code', CodeReset);
    nonroutes.set('/reset/change/:id', ChangePassword);
    nonroutes.set('/Page404', Page404);
    nonroutes.set('*', Page404);
</script>

<main class=" container mx-auto ">
    {#if $isLoggin}
        <div class="md:mt-5">
            <Nav />
            <Router routes="{routes}" />
        </div>
    {:else}
        <NavNoLogin />
        <Router routes="{nonroutes}" />
    {/if}
</main>

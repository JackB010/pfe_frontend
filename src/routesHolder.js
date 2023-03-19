import HomeChat from './lib/chats/HomeChat.svelte';
import ChatRoom from './lib/chats/ChatRoom.svelte';
import Post from './lib/posts/Post.svelte';
import AddPost from './lib/posts/AddPost.svelte';
import SignupPage from './lib/accounts/SignupPage.svelte';
import SignupProfile from './lib/accounts/SignupProfile.svelte';
import SessionSignup from './lib/accounts/SessionSignup.svelte';
import PostList from './lib/PostList.svelte';
import ResetPassword from './lib/accounts/ResetPassword.svelte';
import CodeReset from './lib/accounts/CodeReset.svelte';
import ChangePassword from './lib/accounts/ChangePassword.svelte';
import Login from './lib/accounts/Login.svelte';
import Page404 from './lib/Page404.svelte';
import RootNotification from './lib/notifications/RootNotification.svelte';

export const routes = new Map();
routes.set('/', PostList);
routes.set('/chat', HomeChat);
routes.set('/notifications', RootNotification);
routes.set('/chat/:username', ChatRoom);
routes.set('/post/add', AddPost);
routes.set('/post/:id', Post);
// routes.set('/Page404', Page404);
routes.set('*', Page404);

export const nonroutes = new Map();

nonroutes.set('/', Login);
nonroutes.set('/signup', SessionSignup);
nonroutes.set('/signup/page', SignupPage);
nonroutes.set('/signup/profile', SignupProfile);
nonroutes.set('/reset', ResetPassword);
nonroutes.set('/reset/code', CodeReset);
nonroutes.set('/reset/change/:id', ChangePassword);
nonroutes.set('/Page404', Page404);
nonroutes.set('*', Page404);
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
import Profile from './lib/profiles/Profile.svelte';
import Page from './lib/pages/Page.svelte';
import AddFriends from './lib/accounts/AddFriends.svelte';
import CreateEvent from './lib/events/CreateEvent.svelte';
import PostTag from './lib/posts/PostTag.svelte';
import PagesCategorie from './lib/accounts/PagesCategorie.svelte';
import HomeEvents from './lib/events/HomeEvents.svelte';
import HomeSettings from './lib/profiles/HomeSettings.svelte';
import PostSaved from './lib/posts/PostSaved.svelte';

export const routes = new Map();
routes.set('/', PostList);
routes.set('/chat', HomeChat);
routes.set('/events', HomeEvents);
routes.set('/notifications', RootNotification);
routes.set('/chat/:username', ChatRoom);
routes.set('/post/add', AddPost);
routes.set('/post/:id/edit', AddPost);
routes.set('/post/:id', Post);

routes.set('/posts/tag/:tag', PostTag);
routes.set('/friends', AddFriends)
routes.set('/page/categorie/:categorie', PagesCategorie)
routes.set('/event/:id/edit', CreateEvent)
routes.set('/event/add', CreateEvent)
routes.set('/page/:username/settings', HomeSettings)
routes.set('/page/:username/saved', PostSaved)
routes.set('/page/:username/settings/change', ChangePassword)

routes.set('/profile/:username/settings', HomeSettings)
routes.set('/profile/:username/saved', PostSaved)
routes.set('/profile/:username/settings/change', ChangePassword)

routes.set('/profile/:username', Profile)
routes.set('/page/:username', Page)
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
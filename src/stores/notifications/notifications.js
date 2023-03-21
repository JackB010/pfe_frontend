import { writable } from "svelte/store";

export let notificationsLoaded = writable(false);
export let unread_notifications = writable(0);
export let notificationsList = writable([{}]);

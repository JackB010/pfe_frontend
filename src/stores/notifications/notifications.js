import { writable } from "svelte/store";

export let notificationsLoaded = writable(false);
export let notificationsList = writable([{}]);

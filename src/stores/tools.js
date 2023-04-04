import { writable } from "svelte/store";

export let backurls = writable([undefined])
export let nexturl = writable("");
export let nextUrlFriends = writable("");
export let showRecommended = writable(true);
export let recommended = writable([{}]);
export let showEventList = writable(true);
export let eventsLoaded = writable(true);
export let eventList = writable([undefined]);
export let nexturlNotifications = writable("");

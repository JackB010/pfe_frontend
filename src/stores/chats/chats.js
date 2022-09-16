import { writable } from "svelte/store";

export let unread_messages = writable(0)
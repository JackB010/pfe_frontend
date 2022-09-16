import { writable } from "svelte/store";

export let postItems = writable([{}])
export let postsLoaded = writable(false)
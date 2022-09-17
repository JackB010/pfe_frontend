
import { writable } from "svelte/store";

export let postItems = writable([{}])
export let postcomments = writable([{}])
export let postItem = writable({})
export let postsLoaded = writable(false)
export let postLoaded = writable(false)
export let commentsLoaded = writable(false)

<script type="ts">
    import { afterUpdate, onMount } from 'svelte';
    import { push } from 'svelte-spa-router';
    import moment from 'moment';
    import { config, usershortinfo } from './../../stores/accounts/auth';

    import {
        chating_with,
        fetched_messages,
        loadMessages,
        addMessage,
        deleteMessage,
        nexturl,
    } from './../../stores/chats/chat';
    import axios from 'axios';

    onMount(async () => {
        let username = params['username'];
        loadMessages(username);
    });

    let messages;
    $: fetched_messages.subscribe((data) => {
        messages = data;
    });

    let message, username, element;
    chating_with.subscribe((data) => {
        username = data;
    });
    const sendMessage = async () => {
        if (message) {
            await addMessage(message, username);
        }
        message = '';
    };

    const deleteMessageHandler = async (e) => {
        let id = e.target.value;
        await deleteMessage(id);
        for (let i = 0; i < messages.lenght; i++) {
            if (messages[i].id === id) {
                messages[i].content = 'Message deleted';
            }
        }
    };

    const scrollToBottom = async (node) => {
        node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
    };

    $: if (element) {
        scrollToBottom(element);
    }

    afterUpdate(() => {
        scrollToBottom(element);
    });
    const getOldMessages = async () => {
        await axios($nexturl, config).then((res) => {
            messages = [...res.data['results'], ...messages];
            fetched_messages.set(messages);
            nexturl.set(res.data['next']);
        });
        messages = messages;
    };
    export let params = {};
</script>

<h1>hello from {$usershortinfo['username']} to {$chating_with}</h1>
<div
    bind:this="{element}"
    class="text-black dark:text-white "
    style="height:500px; overflow:auto;"
>
    <button class="readMore" on:click="{getOldMessages}">read more</button>
    {#if $fetched_messages === null}
        {push('/chat')}
    {:else}
        {#each messages as msg}
            {#if msg.sender === $usershortinfo['username']}
                <div
                    style="width: 40%;margin: 0 0 0 50%; border:2px; padding: 3px;"
                >
                    <h3>{msg.sender}</h3>
                    <p>{msg.content}</p>
                    <sub> {msg.seen} </sub>
                    <button
                        style="float: right;"
                        value="{msg.id}"
                        on:click="{deleteMessageHandler}">del</button
                    >
                    <span>{moment(msg.timestamp).fromNow()}</span>
                </div>
            {:else}
                <div
                    style="background-color:blue; color:white; width: 40%; margin: 0 0 0 5%;"
                >
                    <h3>{msg.sender}</h3>
                    <p>{msg.content}</p>
                    <span>{moment(msg.timestamp).fromNow()}</span>
                </div>
            {/if}
        {/each}
    {/if}
</div>
<form on:submit|preventDefault="{sendMessage}">
    <input bind:value="{message}" />
    <input type="submit" value="Send" />
</form>

<style>
    /* div {
        border: 2px; */
    /* } */
    .readMore {
        /* margin: 0 auto; */
        transform: translate(300%, 10%);
    }
</style>

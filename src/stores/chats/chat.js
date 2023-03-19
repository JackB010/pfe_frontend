import { writable } from "svelte/store";
import { userToken, usershortinfo, config, getProfileShortInfo } from "./../accounts/auth"
import ReconnectingWebSocket from 'reconnecting-websocket';
import { push } from "svelte-spa-router";
import axios from "axios";
import { baseurl } from "../../lib/functions";
import { nexturl } from "../tools";


// imgs.forEach((image) => {
//     let data = new FormData();
//     data.append('photo', image, image.name);
//     data.append('user', id);
//     axios
//         .post(`${baseurl}/chats/images/`, data, config)
//         .then((res) => {
//             fetched_messages.update((messages) => {
//                 let msgs = messages.map((msg) => {
//                     if (msg.id === id) {
//                         msg.photos.push({
//                             photo: res.data['photo'],
//                         });
//                     }
//                     return msg;
//                 });
//                 return msgs;
//             });
//         });
// });

export let contact_list = writable([{}]);
export let images_chat = writable([{}]);
export let fetched_messages = writable([]);
export let chating_with = writable({});
export let unread_num = writable(0);
export let messagesLoaded = writable(false);
export let chatIntervalID = undefined
export let rws;

export const getChatContacts = async () => {
    await axios(`${baseurl}/chats/`, config).then((res) => {
        contact_list.set(res.data);
    });
}
export const loadMessages = async (username) => {
    nexturl.set(`${baseurl}/chats/${username}/?page=2`)
    let token, data;
    userToken.subscribe(data => { token = data.access })
    const path = `ws://127.0.0.1:8000/ws/chat/room/${username}/?token=${token}`
    // rws = new ReconnectingWebSocket(path);
    rws = new WebSocket(path);

    rws.onopen = () => {
        rws.send(JSON.stringify({ 'command': 'fetch_messages', 'to': username }))
        rws.send(JSON.stringify({ 'command': 'make_messages_seen', "to": username }))
    }

    rws.onclose = (e) => {
        push('/chat')
    }

    rws.onmessage = (e) => {
        data = JSON.parse(e.data)
        if (data["type"] == "fetch_messages") {
            axios(`${baseurl}/chats/${username}/`, config).then(async res => {
                let data = res.data["results"].reverse()
                await fetched_messages.set(data)
            })
            // fetched_messages.set(data["message"])
        }
        if (data["type"] === "send_message") {

            data = data["message"]

            if (data["type"] === "new_message") {
                fetched_messages.update((messages) => {
                    return [...messages, data["message"]]
                })
                let imgs = [], id = data["message"]["id"];
                images_chat.subscribe(data => { imgs = data })
                console.log(imgs)
                if (imgs.length > 0) {
                    imgs.forEach((image) => {
                        let data = new FormData();
                        data.append('photo', image, image.name);
                        data.append('user', id);
                        axios
                            .post(`${baseurl}/chats/images/`, data, config)
                            .then((res) => {
                                fetched_messages.update((messages) => {
                                    let msgs = messages.map((msg) => {
                                        if (msg.id === id) {
                                            msg.photos.push({
                                                photo: res.data['photo'],
                                            });
                                        }
                                        return msg;
                                    });
                                    return msgs;
                                });
                            });
                    });
                }
                let user = {};
                usershortinfo.subscribe(data => {
                    user = data
                })
                const hash = window.location.hash;

                if (data["message"]["sender"] !== user.username && hash.startsWith(`#/chat/${data["message"]["sender"]}`)) {
                    rws.send(JSON.stringify({
                        'command': 'make_message_seen',
                        "id": data["message"]["id"]
                    }))
                }
                images_chat.set([])
                rws.send(JSON.stringify({
                    'command': 'fetch_messages',
                    "to": username
                }))
                // rws.send(JSON.stringify({
                //     'command': 'fetch_messages',
                //     "to": user.username
                // }))
            }
            if (data["type"] === "delete_message") {
                fetched_messages.update((messages) => {
                    for (let i = 0; i < messages.length; i++) {
                        if (messages[i].id == data["message"].id) {
                            messages[i] = data["message"];
                        }
                    }
                    return messages
                })
            }
            if (data['type'] === "make_message_seen") {
                let id = data["message"]["id"];
                console.log(id)
                fetched_messages.update((messages) => {
                    for (let i = 0; i < messages.length; i++) {
                        if (messages[i].id == id) {
                            messages[i].seen = true;
                        }
                    }
                    return messages
                })
            }
            if ((data['type'] === "make_messages_seen")) {
                let messages = [{}];
                fetched_messages.subscribe(data => { messages = data })
                let user;
                usershortinfo.subscribe(data => {
                    user = data
                })

                messages.forEach(element => {
                    if (user === data["message"])
                        element.seen = true;
                });
                fetched_messages.set(messages)
            }
        }

    }

}
export const closeSocket = () => {
    if (rws instanceof WebSocket)
        rws.close()
}


export const addMessage = async (message, username) => {
    await rws.send(JSON.stringify({
        'message': message,
        'command': 'new_message',
        "to": username
    }))
}

export const deleteMessage = async (id) => {
    await rws.send(JSON.stringify({
        'command': 'delete_message',
        "mid": id
    }))
}
import axios from "axios";
import jwt_decode from "jwt-decode";
import { baseurl } from "./../../lib/functions";
import { push } from "svelte-spa-router";
import { writable } from "svelte/store";


export let profileId = writable('');
export let usershortinfo = writable({ username: null, photo_icon: null });
export let userinfo = writable({
    bio: null,
    birth_day: null,
    count_followed_by: null,
    count_following: null,
    id: null,
    is_following: null,
    photo: null,
    photo_icon: null,
    user: {
        date_joined: null,
        email: null,
        first_name: null,
        id: null,
        is_active: null,
        last_login: null,
        last_name: null,
        username: null,
    }
});
export let usersettingss = writable({});
export let userToken = writable({ refresh: undefined, access: undefined });
export let isLoggin = writable(false);
export let loaded = writable(false);
export const config = { headers: { "Content-Type": "application/json", Authorization: "" } }


export const setLogedIn = async () => {
    const access = JSON.parse(localStorage.getItem("authTokens"))['access']
    const token = jwt_decode(access)
    isLoggin.set(true);
    userToken.set(JSON.parse(localStorage.getItem("authTokens")))
    profileId.set(token['pid'])
    localStorage.setItem("pid", token['pid'])
    config.headers.Authorization = `Bearer ${access}`
    await axios(`${baseurl}/accounts/settings/`, config).then(async (res) => {
        usersettingss.set(res.data)
        await localStorage.setItem('color-theme', res.data['theme'])
    })
    await axios(`${baseurl}/accounts/search/?search=${token['pid']}`).then(res => {
        usershortinfo.set(res.data['results'][0])
    })
    axios(`${baseurl}/accounts/profile/`, config).then(res => {
        userinfo.set(res.data)
    })
}

export const setLogedOut = async () => {
    await localStorage.removeItem("authTokens");
    await localStorage.removeItem("pid");
    await isLoggin.set(false);
    await userToken.set(null);
    await usershortinfo.set(null)
    await usersettingss.set({})
    // userinfo.set(null)
    push("/");
}



export const updateToken = async (refresh) => {
    await axios.post(`${baseurl}/accounts/token/refresh/`, { 'refresh': refresh }).then(res => {
        userToken.set({ ...res.data })
        localStorage.setItem("authTokens", JSON.stringify(res.data))
        isLoggin.set(true)
        userToken.subscribe(data => {
            if (data) {
                config.headers.Authorization = `Bearer ${data["access"]}`
            }
        })
    }).catch(err => {
        setLogedOut();
    })
}

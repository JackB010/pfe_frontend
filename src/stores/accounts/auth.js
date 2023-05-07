import axios from "axios";
import jwt_decode from "jwt-decode";
import { baseurl } from "./../../lib/functions";
import { push } from "svelte-spa-router";
import { writable } from "svelte/store";


export let profileId = writable('');
export let usershortinfo = writable({
    id: null,
    username: null,
    photo_icon: null,
    ftype: null,
    count_followed_by: 0,
});
export let userinfo = writable({});
export let usersettingss = writable({});
export let userUrl = writable('');
export let userToken = writable({ refresh: undefined, access: undefined });
export let isLoggin = writable(false);
export let loaded = writable(false);
export let selectedByNav = writable(false);
export let num_total_pages = writable(0);
export const config = { headers: { "Content-Type": "application/json", Authorization: "" } }

export const getProfileShortInfo = async (username, ftype) => {
    let data = {
        id: null,
        username: null,
        photo_icon: null,
        ftype: null,
        count_followed_by: 0,
    }
    await axios(`${baseurl}/${ftype === "profile" ? 'accounts' : 'pages'}/search/?search=${username}`).then(res => {
        data = res.data['results'][0];

    })
    return data;
}

export const setLogedIn = async () => {
    const access = JSON.parse(localStorage.getItem("authTokens"))['access']
    const token = jwt_decode(access)
    isLoggin.set(true);
    userToken.set(JSON.parse(localStorage.getItem("authTokens")))
    profileId.set(token['pid'])
    localStorage.setItem("pid", token['pid'])
    config.headers.Authorization = `Bearer ${access}`
    let settingsUrl = '';
    if (token['ftype'] === 'profile') {
        settingsUrl = '/accounts/settings/';
        userUrl.set('/accounts/profile/');
    }
    else {
        settingsUrl = '/pages/settings/';
        userUrl.set('/pages/page/');
    }

    await axios(`${baseurl}${settingsUrl}`, config).then(async (res) => {
        usersettingss.set(res.data)
        await localStorage.setItem('color-theme', res.data['theme'])
    })
    let url = '';
    userUrl.subscribe(data => { url = data })
    await axios(`${baseurl}${url}`, config).then(res => {
        userinfo.set(res.data)
        num_total_pages.set(res.data["num_total_pages"])
    })
    usershortinfo.set(await getProfileShortInfo(token['pid'], token['ftype']));


}

export const setLogedOut = async () => {
    await localStorage.removeItem("authTokens");
    await localStorage.removeItem("pid");
    await isLoggin.set(false);
    await userToken.set(null);
    await usershortinfo.set(null)
    await usersettingss.set({})
    // userinfo.set(null)
    // push("/");
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

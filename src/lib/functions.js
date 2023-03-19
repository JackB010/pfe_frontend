import { writable } from "svelte/store";
export const baseurl = "http://127.0.0.1:8000/api"

export let theme = writable('light');

if (
    localStorage.getItem('color-theme') === 'dark' ||
    (!('color-theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
) {
    theme.set('dark');
    document.documentElement.classList.add('dark');
} else {
    theme.set('light');
    document.documentElement.classList.remove('dark');
}

export const themeToggleBtn = () => {
    let themeToggleDarkIcon = document.querySelector(
        '#theme-toggle-dark-icon'
    );
    let themeToggleLightIcon = document.querySelector(
        '#theme-toggle-light-icon'
    );
    let th;
    theme.subscribe(data => { th = data })
    if (th === 'light') theme.set('dark');
    else theme.set('light');

    if (localStorage.getItem('color-theme')) {
        if (localStorage.getItem('color-theme') === 'light') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        }
    } else {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
    }
};




export const dynamicSort = (property) => {
    let sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return (a, b) => {
        /* next line works with strings and numbers, 
         * and you may want to customize it to your needs
         */
        let result = (a[property].length < b[property].length) ? -1 : (a[property].length > b[property].length) ? 1 : 0;
        return result * sortOrder;
    }
}
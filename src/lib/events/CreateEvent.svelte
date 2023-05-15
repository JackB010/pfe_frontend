<script>
    import { baseurl } from '../functions';
    import {
        config,
        userinfo,
        usershortinfo,
    } from './../../stores/accounts/auth';
    import axios from 'axios';
    import { push } from 'svelte-spa-router';
    import { eventList } from './../../stores/tools';
    import Wapper from '../Wapper.svelte';
    import { onMount } from 'svelte';
    import AddByOwner from '../posts/AddByOwner.svelte';
    import moment from 'moment';
    import BackSection from '../ui/BackSection.svelte';

    const show_error = (msg) => {
        let error = document.querySelector('#error');
        error.innerHTML = msg;
        error.classList.remove('hidden');
    };
    let user = {
        id: '',
        photo_icon: '',
        username: '',
        ftype: '',
        count_followed_by: 0,
    };
    let content = '',
        action_date;
    onMount(() => {
        if (
            $usershortinfo.ftype === 'profile' &&
            userinfo['num_total_pages'] === 0
        ) {
            push('/page404');
        }
        if (params.id) {
            axios(`${baseurl}/events/${params.id}/`, config).then((res) => {
                content = res.data['content'];
                action_date = moment(res.data['action_date']).format(
                    'YYYY-MM-DDThh:mm'
                );
                user = res.data['page'];
            });
        }
    });

    const createEvent = async () => {
        if ($usershortinfo.ftype === 'profile' && user.id === '') {
            show_error('this field most be selected !');
            return;
        }

        let data = {
            user: $usershortinfo.id === user.id ? '' : user.id,
            content,
            deleted: false,
            action_date,
        };
        await axios.post(`${baseurl}/events/`, data, config).then((res) => {
            eventList.update((data) => [res.data, ...data]);
            push('/');
        });
    };
    const updateEvent = () => {
        let data = {
            user: $usershortinfo.id === user.id ? '' : user.id,
            content,
            deleted: false,
            action_date,
        };
        axios
            .patch(`${baseurl}/events/${params.id}/`, data, config)
            .then((res) => {
                eventList.update((data) => {
                    return data.map((data) => {
                        if (data.id === res.data.id) return res.data;
                        return data;
                    });
                });
                push('/');
            });
    };
    document.title = 'Créer un évènement';
    export let params = {};
</script>

<BackSection name="Créer un évènement" />
<Wapper>
    <div class="border rounded shadow">
        <div class=" mx-auto mt-4 flex-auto w-full">
            <div
                class="tab-content tab-space l
                "
            >
                <form
                    class="w-11/12 flex flex-col mx-auto"
                    on:submit|preventDefault="{params.id
                        ? updateEvent
                        : createEvent}"
                >
                    <div class="mb-2">
                        <label
                            class="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
                            for="content"
                        >
                            Content
                        </label>
                        <textarea
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none
                            focus:outline-none border-rose-600 focus:border-rose-600"
                            id="content"
                            placeholder="Write what your event about ..."
                            autocomplete="content"
                            bind:value="{content}"
                            required></textarea>
                    </div>
                    <div class="mb-4">
                        <label
                            class="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
                            for="content"
                        >
                            Date
                        </label>
                        <input
                            type="datetime-local"
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none
                            focus:outline-none border-rose-600 focus:border-rose-600"
                            id="content"
                            placeholder="Write what your event about ..."
                            autocomplete="content"
                            bind:value="{action_date}"
                            required
                        />
                    </div>
                    {#if $usershortinfo.ftype === 'profile'}
                        <AddByOwner bind:user="{user}" add_user="{false}" />
                        <p
                            class="text-red-500 text-xs italic hidden mb-2 -mt-2"
                            id="error"
                        ></p>
                    {/if}

                    <div class="bg-rose-600 object-cover rounded-lg mb-6">
                        <input
                            type="submit"
                            value="Créer"
                            class="text-white w-full px-2 h-10 rounded shadow bg-rose-600 dark:border-rose-600
     outline-none focus:outline-none cursor-pointer"
                        />
                    </div>
                </form>
            </div>
        </div>
    </div>
</Wapper>

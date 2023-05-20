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
        setTimeout(() => {
            error.classList.add('hidden');
        }, 2500);
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
        document.title = `${params.id ? 'Mise à jour' : 'Créer'} évènement`;

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
        // if(action_date<=)
        if (moment(Date.now()).format('YYYY-MM-DDThh:mm') > action_date) {
            let error = document.querySelector('#error_date');
            error.innerHTML = 'invalid date';
            error.classList.remove('hidden');
            setTimeout(() => {
                error.classList.add('hidden');
            }, 2500);

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
        if (moment(Date.now()).format('YYYY-MM-DDThh:mm') > action_date) {
            let error = document.querySelector('#error_date');
            error.innerHTML = 'invalid date';
            error.classList.remove('hidden');
            setTimeout(() => {
                error.classList.add('hidden');
            }, 2500);

            return;
        }
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

    export let params = {};
</script>

<BackSection name="{params.id ? 'Mise à jour' : 'Créer'} évènement" />
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
                            Contenu
                        </label>
                        <textarea
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none
                            focus:outline-none border-rose-600 focus:border-rose-600"
                            id="content"
                            placeholder="Écrivez sur quoi porte votre événement..."
                            autocomplete="content"
                            bind:value="{content}"
                            required></textarea>
                    </div>
                    <div class="mb-4">
                        <label
                            class="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
                            for="content"
                        >
                            Date de l'évènement
                        </label>
                        <input
                            type="datetime-local"
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none
                            focus:outline-none border-rose-600 focus:border-rose-600"
                            id="content"
                            placeholder="Date de l'évènement"
                            autocomplete="content"
                            bind:value="{action_date}"
                            required
                        />
                        <p
                            class="text-red-500 pt-3 text-sm italic hidden mb-2 -mt-2"
                            id="error_date"
                        ></p>
                    </div>
                    {#if $usershortinfo.ftype === 'profile'}
                        <AddByOwner bind:user="{user}" add_user="{false}" />
                        <p
                            class="text-red-500 pt-1 text-sm italic hidden mb-2 -mt-2"
                            id="error"
                        ></p>
                    {/if}

                    <div class="bg-rose-600 object-cover rounded-lg mb-6">
                        <input
                            type="submit"
                            value="{params.id
                                ? 'Mise à jour'
                                : 'Créer'} évènement"
                            class="text-white w-full px-2 h-10 rounded shadow bg-rose-600 dark:border-rose-600
     outline-none focus:outline-none cursor-pointer"
                        />
                    </div>
                </form>
            </div>
        </div>
    </div>
</Wapper>

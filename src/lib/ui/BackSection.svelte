<script>
    import { push } from 'svelte-spa-router';
    import { backurls } from '../../stores/tools';
    import Wapper from '../Wapper.svelte';
    export let name = 'Home';
    // const back = () => {};
</script>

<Wapper>
    <div class="flex items-center   ">
        <div
            class="my-2 ml-6 cursor-pointer  flex items-center bg-white rounded-full text-rose-600 p-1 font-bold "
            on:click="{() => {
                $backurls.pop();
                let path = $backurls.pop();
                if (path === undefined) {
                    push('/');
                } else {
                    push(path);
                }
            }}"
            on:keypress="{(e) => {}}"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path
                    fill-rule="evenodd"
                    d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                    clip-rule="evenodd"></path>
            </svg>
        </div>
        <div class="flex-1">
            <h2 class="text-xl float-right mr-4">{name}</h2>
        </div>
    </div>
</Wapper>

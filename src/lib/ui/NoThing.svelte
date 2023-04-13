<script>
    import Wapper from '../Wapper.svelte';

    export let message;
    export let dSVG;
</script>

<div class="w-full mb-2  border">
    <Wapper>
        <div class="  h-[30rem] flex flex-row items-center w-full ">
            <div
                class=" mx-auto flex flex-col items-center text-gray-300 w-full"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-28 h-28 text-gray-400 mx-auto mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="{dSVG}"></path>
                </svg>
                <div class="">
                    <p class="mx-auto text-gray-400">{message}</p>
                </div>
            </div>
        </div>
    </Wapper>
</div>

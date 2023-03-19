<script>
    export let message;
    export let dSVG;
</script>

<div class="h-[30rem] border-gray-300 shadow shadow-gray-400 border ">
    <div class="h-10/12 mt-36 ">
        <div class="w-56 mx-auto text-gray-300">
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
            <div class="w-fit mx-auto">
                <p class="mx-auto text-gray-400">{message}</p>
            </div>
        </div>
    </div>
</div>

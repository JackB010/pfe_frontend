<script>
    export let searchFunc;
    let search = '';
</script>

<div class="flex ">
    <div class="flex w-full flex-1 mt-2 px-1 justify-center items-center  ">
        <div class=" flex-1 items-center">
            <form
                class="w-full h-12 flex  "
                on:submit|preventDefault="{() => {
                    searchFunc(search);
                }}"
            >
                <input
                    bind:value="{search}"
                    class="h-12 flex-1 border-2 rounded-l-lg border-rose-600 text-rose-700
                                     text-lg pl-4 outline-none focus:outline-none"
                />

                <button
                    class=" text-white border-y-2 border-rose-600  border-r-2  bg-rose-600 active:bg-rose-600  px-2 h-12  rounded-r-lg shadow 
                                    outline-none focus:outline-none  ease-linear transition-all duration-100"
                >
                    <svg
                        class="w-7 h-7"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        ></path>
                    </svg>
                </button>
            </form>
        </div>
    </div>
</div>

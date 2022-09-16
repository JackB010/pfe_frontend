<script>
    import axios from 'axios';

    let code;
    const loginFunc = async () => {
        await axios
            .post('/api/accounts/token/', { code })
            .then((res) => {})
            .catch((err) => {});
    };

    export const params = {};
</script>

<div class="w-full max-w-xl mx-auto mt-32 ">
    <form
        class="bg-white dark:text-white dark:bg-slate-800 border-2 shadow-gray-500 mx-3 shadow-md rounded px-8 pt-6 pb-8 mb-4"
        on:submit="{loginFunc}"
    >
        <div class="mb-8">
            <label
                class="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
                for="code"
            >
                Code Reset
            </label>
            <input
                class="shadow appearance-none border placeholder:justify-center  placeholder:text-xl rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="code"
                max="9999999"
                min="1000000"
                type="number"
                bind:value="{code}"
                placeholder="#######"
                required
            />
        </div>
        <div class="flex items-center justify-between flex-col ">
            <input
                class="bg-rose-500 text-rose-500 text-lg dark:text-white active:text-white border-2 border-rose-600  w-full active:bg-rose-600  px-2 h-10 
                rounded-lg shadow outline-none focus:outline-none mr-1 mb-2 ease-linear transition-all duration-100"
                type="submit"
                value="Send"
            />
        </div>
    </form>
    <p class="text-center text-gray-500 text-xs dark:text-white">
        &copy;{new Date().getUTCFullYear()} Acme Corp. All rights reserved.
    </p>
</div>

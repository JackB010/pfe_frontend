<script>
    export let src;
    export let username;
    export let type;
</script>

<div
    class="w-full px-4 py-2 border-b flex items-start hover:bg-rose-50 cursor-pointer"
>
    <img
        src="{src}"
        class="h-10 w-10 border {type === 'profile'
            ? 'rounded-full'
            : 'rounded-lg'}"
        alt=""
    />
    <div class="ml-4">
        <p class="text-md font-semibold text-slate-600 m-0 p-0">{username}</p>
        <p class="text-xs text-slate-400 -mt-0.5">atuny0@sohu.com</p>
    </div>
</div>

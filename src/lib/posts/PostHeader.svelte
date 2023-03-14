<script>
    import aza from './../../aza.jpg';
    import moment from 'moment';
    export let photo_icon = undefined,
        username = undefined,
        created = undefined;
</script>

<div class="flex p-0.5 space-x-2 w-full mb-2">
    <div>
        <img
            src="{`http://127.0.0.1:1111${photo_icon}`}"
            alt="aza"
            class="w-12 h-12 mt-1 ml-2 object-fit rounded-full"
        />
    </div>
    <div
        class="flex flex-col w-10/12 space-x-4 -space-y-2 mt-1.5  text-black dark:text-white"
    >
        <div class="ml-4"><p>{username}</p></div>
        <div>
            <sub class="text-gray-500 dark:text-slate-200"
                >{moment(created).fromNow()}</sub
            >
        </div>
    </div>
    <div class="mt-2 px-4">
        <span class="font-bold cursor-pointer">...</span>
    </div>
</div>

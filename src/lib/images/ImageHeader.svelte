<script>
    import aza from './../../aza.jpg';
    import moment from 'moment';
</script>

<div class="flex p-1  w-full mb-2">
    <div>
        <img src="{aza}" alt="aza" class="w-12 h-12 mt-1 ml-2  rounded-full " />
    </div>
    <div
        class="flex flex-col w-10/12 space-x-4 -space-y-2 mt-1.5  text-black dark:text-white "
    >
        <div class="ml-4"><p>aza</p></div>
        <div>
            <sub class="text-gray-500 dark:text-slate-200"
                >{moment([2007, 0, 29]).fromNow()}</sub
            >
        </div>
    </div>
    <div class="mt-2 px-4">
        <span class="font-bold cursor-pointer">...</span>
    </div>
</div>
